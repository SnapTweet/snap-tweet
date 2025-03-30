import { render, screen } from "@testing-library/react";
import { Label } from "../label";

describe("Label", () => {
  it("renders with default props", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Label className="custom-class">Test Label</Label>);
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(<Label ref={ref}>Test Label</Label>);
    expect(ref).toHaveBeenCalled();
  });

  it("renders with disabled state", () => {
    render(
      <Label htmlFor="test" className="peer-disabled:opacity-70">
        Test Label
      </Label>
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("peer-disabled:opacity-70");
  });
});
