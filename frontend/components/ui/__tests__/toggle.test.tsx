import { render, screen } from "@testing-library/react";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  it("renders toggle button with default variant", () => {
    render(<Toggle data-testid="toggle">Toggle</Toggle>);
    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveAttribute("data-state", "off");
    expect(toggle).toHaveClass("bg-transparent");
  });

  it("renders different variants", () => {
    render(
      <Toggle variant="outline" data-testid="toggle">
        Toggle
      </Toggle>
    );
    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveClass("border-input");
  });

  it("renders different sizes", () => {
    render(
      <Toggle size="sm" data-testid="toggle">
        Toggle
      </Toggle>
    );
    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveClass("h-9");
  });

  it("handles pressed state", () => {
    render(
      <Toggle pressed data-testid="toggle">
        Toggle
      </Toggle>
    );
    const toggle = screen.getByTestId("toggle");

    expect(toggle).toHaveAttribute("data-state", "on");
  });

  it("applies custom className", () => {
    render(<Toggle className="custom-class">Toggle</Toggle>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("handles disabled state", () => {
    render(<Toggle disabled>Toggle</Toggle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
