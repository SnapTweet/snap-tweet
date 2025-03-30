import { useAuth } from "@/context/auth-context";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../navbar"; // Updated import path to be relative to test location

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock auth context
jest.mock("@/context/auth-context", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar", () => {
  it("renders unauthenticated state", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    render(<Navbar />);

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByText("Snap-Tweet")).toBeInTheDocument();
  });

  it("renders authenticated state", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testuser" },
      logout: jest.fn(),
    });

    render(<Navbar />);

    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
  });

  it("handles logout", () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testuser" },
      logout: mockLogout,
    });

    render(<Navbar />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
