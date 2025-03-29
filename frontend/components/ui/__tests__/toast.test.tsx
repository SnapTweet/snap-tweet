import { render, screen } from "@testing-library/react";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../toast";

describe("Toast", () => {
  it("applies custom className", () => {
    render(
      <ToastProvider>
        <Toast className="custom-class" data-testid="toast">
          <ToastTitle>Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const toast = screen.getByTestId("toast");
    expect(toast).toHaveClass("custom-class");
  });

  it("renders different variants", () => {
    render(
      <ToastProvider>
        <Toast variant="destructive" data-testid="toast">
          <ToastTitle>Destructive</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const toast = screen.getByTestId("toast");
    expect(toast).toHaveClass("destructive");
  });

  it("renders with default variant", () => {
    render(
      <ToastProvider>
        <Toast data-testid="toast">
          <ToastTitle>Default</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const toast = screen.getByTestId("toast");
    expect(toast).toHaveClass("border", "bg-background", "text-foreground");
  });

  it("handles action clicks", () => {
    const onAction = jest.fn();
    render(
      <ToastProvider>
        <Toast>
          <ToastAction altText="test action" onClick={onAction}>
            Action
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const actionButton = screen.getByRole("button", { name: "Action" });
    actionButton.click();
    expect(onAction).toHaveBeenCalled();
  });

  it("handles close button clicks", () => {
    render(
      <ToastProvider>
        <Toast>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const closeButton = screen.getByRole("button");
    expect(closeButton).toHaveAttribute("toast-close", "");
  });
});
