import { fireEvent, render, screen } from "@testing-library/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";

describe("AlertDialog", () => {
  const renderAlertDialog = () => {
    return render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  it("renders trigger button", () => {
    renderAlertDialog();
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("opens dialog when trigger is clicked", () => {
    renderAlertDialog();
    const trigger = screen.getByText("Open Dialog");
    fireEvent.click(trigger);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("This action cannot be undone.")
    ).toBeInTheDocument();
  });

  it("renders footer buttons with correct styles", () => {
    renderAlertDialog();
    const trigger = screen.getByText("Open Dialog");
    fireEvent.click(trigger);

    const cancelButton = screen.getByText("Cancel");
    const continueButton = screen.getByText("Continue");

    expect(cancelButton).toHaveClass("mt-2", "sm:mt-0");
    expect(continueButton).toBeInTheDocument();
  });

  it("closes dialog when cancel button is clicked", () => {
    renderAlertDialog();
    const trigger = screen.getByText("Open Dialog");
    fireEvent.click(trigger);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Check if the dialog content is removed from the document
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("applies custom className to dialog content", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent className="custom-class">
          <AlertDialogHeader>
            <AlertDialogTitle>Test</AlertDialogTitle>
            <AlertDialogDescription>Test Description</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );

    const trigger = screen.getByText("Open");
    fireEvent.click(trigger);

    const content = screen.getByRole("alertdialog");
    expect(content).toHaveClass("custom-class");
  });
});
