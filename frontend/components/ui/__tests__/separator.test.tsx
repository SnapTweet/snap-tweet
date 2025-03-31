import { render, screen } from "@testing-library/react";
import { Separator } from "../separator";

describe("Separator", () => {
  it("renders horizontal separator by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveClass("h-[1px]", "w-full");
  });

  it("renders vertical separator", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveClass("h-full", "w-[1px]");
  });

  it("applies custom className", () => {
    render(<Separator className="custom-class" data-testid="separator" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveClass("custom-class");
  });

  it("sets decorative attribute", () => {
    render(<Separator decorative={false} data-testid="separator" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveAttribute("data-orientation", "horizontal");
    expect(separator).toHaveAttribute("role", "separator");
  });
});
