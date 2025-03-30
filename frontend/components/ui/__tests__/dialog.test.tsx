import { fireEvent, render, screen } from "@testing-library/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

describe("Dialog", () => {
  it("renders dialog content when triggered", () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>This is a test dialog</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose data-testid="dialog-close">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("This is a test dialog")).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    fireEvent.click(screen.getByTestId("dialog-close"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies custom classes to dialog components", () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByTestId("dialog-trigger"));
    expect(screen.getByRole("dialog")).toHaveClass("custom-content");
  });
});
