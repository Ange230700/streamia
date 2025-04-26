// src\tests\components\Navbar.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PrimeReactProvider } from "primereact/api";
import Navbar from "@/app/components/Navbar";

jest.mock("next/link", () => {
  const MockLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <PrimeReactProvider>
        <Navbar />
      </PrimeReactProvider>,
    );
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
