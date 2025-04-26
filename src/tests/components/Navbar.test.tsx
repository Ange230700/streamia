// src\tests\components\Navbar.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
  MockLink.displayName = "NextLink";
  return MockLink;
});

jest.mock("primereact/api", () => ({
  PrimeReactProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("primereact/menubar", () => ({
  Menubar: ({ start, end }: any) => (
    <div data-testid="menubar">
      {start}
      {end}
    </div>
  ),
}));

jest.mock("primereact/inputtext", () => ({
  InputText: (props: any) => <input data-testid="search-input" {...props} />,
}));

jest.mock("primereact/button", () => ({
  Button: (props: any) => (
    <button
      {...props}
      data-testid={props["aria-label"] ?? props.label ?? props.icon}
    >
      {props.label ?? props.icon}
    </button>
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
