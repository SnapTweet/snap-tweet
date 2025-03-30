import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders checkbox with default props", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass(
      "peer",
      "h-4",
      "w-4",
      "shrink-0",
      "rounded-sm",
      "border",
      "border-primary",
      "ring-offset-background",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "data-[state=checked]:bg-primary",
      "data-[state=checked]:text-primary-foreground"
    );
  });

  it("renders checkbox with custom className", () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom-class");
  });

  it("renders disabled checkbox", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("handles checked state", () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("forwards ref to checkbox element", () => {
    const ref = jest.fn();
    render(<Checkbox ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("renders checkbox with label", () => {
    render(
      <div>
        <Checkbox id="terms" />
        <label htmlFor="terms">Accept terms</label>
      </div>
    );
    const checkbox = screen.getByLabelText("Accept terms");
    expect(checkbox).toBeInTheDocument();
  });

  it("toggles checked state on click", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "checked");

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("data-state", "unchecked");
  });
});
