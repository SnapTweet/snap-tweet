import { fireEvent, render, screen } from "@testing-library/react";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders switch with default props", () => {
    render(<Switch />);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute("data-state", "unchecked");
  });

  it("applies custom className", () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole("switch")).toHaveClass("custom-class");
  });

  it("renders checked state", () => {
    render(<Switch checked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("renders disabled state", () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:opacity-50"
    );
  });

  it("handles checked state change", () => {
    const handleCheckedChange = jest.fn();
    render(<Switch onCheckedChange={handleCheckedChange} />);

    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);

    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(switchElement).toHaveAttribute("data-state", "checked");
  });

  it("renders with default checked state", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("renders with required prop", () => {
    render(<Switch required />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-required", "true");
  });
});
