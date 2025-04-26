// src\tests\api\auth\signup\route.test.ts

import { faker } from "@faker-js/faker";
import argon2 from "argon2";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

jest.mock("argon2", () => ({
  hash: jest.fn(async (pwd: string) => `hashed-${pwd}`),
}));

const mPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  avatar: {
    create: jest.fn(),
  },
};
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mPrisma),
}));

import { POST } from "@/app/api/auth/signup/route";

function makeRequest(body: object): Request {
  return { json: async () => body } as unknown as Request;
}

describe("POST /api/auth/signup", () => {
  let validUser: { username: string; email: string; password: string };

  beforeEach(() => {
    jest.clearAllMocks();
    validUser = {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };
  });

  it("returns 400 if required fields are missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Missing required fields" });
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(
      makeRequest({
        username: validUser.username,
        email: "bad-email",
        password: validUser.password,
      }),
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid email address" });
  });

  it("returns 400 for short password", async () => {
    const res = await POST(
      makeRequest({
        username: validUser.username,
        email: validUser.email,
        password: faker.internet.password({ length: 5 }),
      }),
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Password must be at least 8 characters long",
    });
  });

  it("returns 409 if email already in use", async () => {
    mPrisma.user.findUnique.mockResolvedValue({ email: validUser.email });
    const res = await POST(makeRequest(validUser));
    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ error: "Email already in use" });
    expect(mPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: validUser.email },
    });
  });

  it("creates a new user and returns 201 with user data", async () => {
    mPrisma.user.findUnique.mockResolvedValue(null);
    mPrisma.avatar.create.mockResolvedValue({ avatar_id: 42 });
    const createdUser = {
      user_id: 1,
      username: validUser.username,
      email: validUser.email,
      is_admin: false,
      avatar_id: 42,
    };
    mPrisma.user.create.mockResolvedValue(createdUser);

    const res = await POST(makeRequest(validUser));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ user: createdUser });
    expect(mPrisma.avatar.create).toHaveBeenCalledWith({ data: {} });
    expect(argon2.hash).toHaveBeenCalledWith(validUser.password);
  });

  it("handles unexpected errors with 500 status", async () => {
    mPrisma.user.findUnique.mockRejectedValue(new Error("DB Error"));
    const res = await POST(makeRequest(validUser));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Internal server error" });
  });
});
