import { render, screen } from "@testing-library/react";
import { Progress } from "../progress";

describe("Progress", () => {
  it("renders with default value", () => {
    render(<Progress value={0} data-testid="progress" />);
    const progress = screen.getByTestId("progress");
    const indicator = progress.querySelector('[class*="bg-primary"]');

    expect(progress).toHaveClass("bg-secondary");
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" });
  });

  it("renders with custom value", () => {
    render(<Progress value={50} data-testid="progress" />);
    const progress = screen.getByTestId("progress");
    const indicator = progress.querySelector('[class*="bg-primary"]');

    expect(indicator).toHaveStyle({ transform: "translateX(-50%)" });
  });

  it("applies custom className", () => {
    render(<Progress className="custom-class" data-testid="progress" />);
    const progress = screen.getByTestId("progress");

    expect(progress).toHaveClass("custom-class");
  });
});
