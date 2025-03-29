import { render, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input", () => {
  it("renders input with default props", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "flex",
      "h-10",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "py-2",
      "text-base",
      "ring-offset-background",
      "md:text-sm"
    );
  });

  it("renders input with custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("renders input with different types", () => {
    render(<Input type="password" />);
    const input = screen.getByDisplayValue("", { exact: false });
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders disabled input", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:opacity-50"
    );
  });

  it("forwards ref to input element", () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("renders input with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("renders input with value", () => {
    render(<Input value="Test value" readOnly />);
    const input = screen.getByDisplayValue("Test value");
    expect(input).toBeInTheDocument();
  });
});
