import { useAuth } from "@/context/auth-context";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../../navbar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
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
  });

  it("renders authenticated state", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testuser" },
      logout: jest.fn(),
    });

    render(<Navbar />);

    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
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
