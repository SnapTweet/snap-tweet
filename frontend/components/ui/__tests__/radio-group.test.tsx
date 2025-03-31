import { render, screen } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "../radio-group";

describe("RadioGroup", () => {
  it("renders radio group with items", () => {
    render(
      <RadioGroup defaultValue="option1">
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupItem value="option2" id="option2" />
      </RadioGroup>
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("applies disabled state correctly", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" disabled />
      </RadioGroup>
    );

    expect(screen.getByRole("radio")).toHaveAttribute("data-disabled");
  });
});
