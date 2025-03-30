import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "../textarea";

describe("Textarea", () => {
  it("renders textarea with default styles", () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");

    expect(textarea).toHaveClass("min-h-[80px]", "rounded-md", "border");
  });

  it("applies custom className", () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");

    expect(textarea).toHaveClass("custom-class");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");

    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("handles disabled state", () => {
    render(<Textarea disabled data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass("disabled:opacity-50");
  });
});
