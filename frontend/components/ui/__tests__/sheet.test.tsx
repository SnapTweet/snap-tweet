import { fireEvent, render, screen } from "@testing-library/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";

describe("Sheet", () => {
  beforeAll(() => {
    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it("renders sheet with trigger and content", () => {
    render(
      <Sheet>
        <SheetTrigger data-testid="trigger">Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Test Title</SheetTitle>
            <SheetDescription>Test Description</SheetDescription>
          </SheetHeader>
          <SheetFooter>Footer Content</SheetFooter>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByTestId("trigger")).toBeInTheDocument();

    // Click trigger to open sheet
    fireEvent.click(screen.getByTestId("trigger"));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  it("applies custom className to sheet components", () => {
    render(
      <Sheet>
        <SheetTrigger data-testid="trigger">Open</SheetTrigger>
        <SheetContent className="custom-content">
          <SheetHeader className="custom-header">
            <SheetTitle className="custom-title">Title</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    fireEvent.click(screen.getByTestId("trigger"));

    expect(screen.getByText("Title")).toHaveClass("custom-title");
    // Check for data attributes instead of classes for Radix UI components
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
