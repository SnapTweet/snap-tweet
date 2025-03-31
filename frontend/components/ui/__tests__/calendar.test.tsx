import { fireEvent, render, screen } from "@testing-library/react";
import { Calendar } from "../calendar";

describe("Calendar", () => {
  const defaultProps = {
    mode: "single" as const,
    selected: new Date(),
    onSelect: jest.fn(),
  };

  it("handles date selection", () => {
    const onSelect = jest.fn();
    render(<Calendar {...defaultProps} onSelect={onSelect} />);

    const dayButton = screen
      .getAllByRole("button")
      .find(
        (button) =>
          !button.getAttribute("name")?.includes("previous") &&
          !button.getAttribute("name")?.includes("next")
      );

    if (dayButton) {
      fireEvent.click(dayButton);
      expect(onSelect).toHaveBeenCalled();
    }
  });
});
