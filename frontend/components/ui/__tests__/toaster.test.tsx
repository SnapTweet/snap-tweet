import { useToast } from "@/hooks/use-toast";
import { render, screen } from "@testing-library/react";
import { Toaster } from "../toaster";

// Mock the useToast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("Toaster", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [],
    });
  });

  it("renders empty toaster", () => {
    render(<Toaster />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders toasts from hook", () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [
        { id: "1", title: "Test Toast", description: "Test Description" },
      ],
    });

    render(<Toaster />);

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders toast with action", () => {
    const action = <button>Action</button>;
    (useToast as jest.Mock).mockReturnValue({
      toasts: [{ id: "1", title: "Test Toast", action }],
    });

    render(<Toaster />);

    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});
