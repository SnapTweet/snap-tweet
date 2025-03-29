import { render, screen } from "@testing-library/react";
import { Alert, AlertDescription, AlertTitle } from "../alert";

describe("Alert", () => {
  it("renders alert with default variant", () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-background");
    expect(alert).toHaveClass("text-foreground");
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders alert with destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("border-destructive/50");
    expect(alert).toHaveClass("text-destructive");
  });

  it("applies custom className to Alert component", () => {
    render(
      <Alert className="custom-class">
        <AlertTitle>Test</AlertTitle>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("custom-class");
  });

  it("applies correct styles to AlertTitle", () => {
    render(
      <Alert>
        <AlertTitle className="custom-title">Test Title</AlertTitle>
      </Alert>
    );

    const title = screen.getByText("Test Title");
    expect(title).toHaveClass(
      "mb-1",
      "font-medium",
      "leading-none",
      "tracking-tight",
      "custom-title"
    );
  });

  it("applies correct styles to AlertDescription", () => {
    render(
      <Alert>
        <AlertDescription className="custom-desc">
          Test Description
        </AlertDescription>
      </Alert>
    );

    const description = screen.getByText("Test Description");
    expect(description).toHaveClass(
      "text-sm",
      "[&_p]:leading-relaxed",
      "custom-desc"
    );
  });

  it("forwards ref to Alert component", () => {
    const ref = jest.fn();
    render(
      <Alert ref={ref}>
        <AlertTitle>Test</AlertTitle>
      </Alert>
    );
    expect(ref).toHaveBeenCalled();
  });
});
