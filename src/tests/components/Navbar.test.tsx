// src\tests\components\Navbar.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/app/components/Navbar";

jest.mock("next/link", () => {
  const MockLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "NextLink";
  return MockLink;
});

jest.mock("primereact/api", () => ({
  PrimeReactProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("primereact/menubar", () => ({
  Menubar: ({
    start,
    end,
  }: {
    start?: React.ReactNode;
    end?: React.ReactNode;
  }) => (
    <div data-testid="menubar">
      {start}
      {end}
    </div>
  ),
}));

jest.mock("primereact/inputtext", () => ({
  InputText: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid="search-input" {...props} />
  ),
}));

jest.mock("primereact/button", () => ({
  Button: ({
    label,
    icon,
    "aria-label": ariaLabel,
  }: {
    label?: string;
    icon?: string;
    "aria-label"?: string;
  }) => (
    <button data-testid={ariaLabel ?? label ?? icon}>{label ?? icon}</button>
  ),
}));

describe("Navbar", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it("renders Streamia as a link to the homepage", () => {
    const homeLink = screen.getByRole("link", { name: /Streamia/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the search input", () => {
    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the user button", () => {
    const userButton = screen.getByRole("button", { name: /User/i });
    expect(userButton).toBeInTheDocument();
  });
});
