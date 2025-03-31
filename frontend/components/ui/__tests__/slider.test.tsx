import { render, screen } from "@testing-library/react";
import { Slider } from "../slider";

describe("Slider", () => {
  it("renders slider with default props", () => {
    render(<Slider />);

    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuemin", "0");
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "0");
  });

  it("applies custom className", () => {
    render(<Slider className="custom-class" />);
    const slider = screen.getByRole("slider");
    expect(slider.parentElement?.parentElement).toHaveClass("custom-class");
  });

  it("renders with custom value", () => {
    render(<Slider defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders with custom min and max values", () => {
    render(<Slider min={10} max={90} defaultValue={[50]} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "90");
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("handles disabled state", () => {
    render(<Slider disabled />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("data-disabled", "");
    expect(slider).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50"
    );
  });

  it("renders with custom step", () => {
    render(<Slider step={10} defaultValue={[20]} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "20");
  });

  it("renders with orientation", () => {
    render(<Slider orientation="vertical" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
  });
});
