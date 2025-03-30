import { fireEvent, render, screen } from "@testing-library/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";

describe("Select", () => {
  it("renders select trigger with placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("opens select content when trigger is clicked", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText("Select an option");
    fireEvent.click(trigger);

    expect(screen.getByText("Option 1")).toBeVisible();
  });

  it("renders select with groups and labels", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Group 1</SelectLabel>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText("Select an option");
    fireEvent.click(trigger);

    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("applies custom className to select trigger", () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText("Select an option").parentElement;
    expect(trigger).toHaveClass("custom-class");
  });

  it("renders disabled select", () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText("Select an option").parentElement;
    expect(trigger).toHaveAttribute("data-disabled");
    expect(trigger).toHaveClass(
      "disabled:cursor-not-allowed",
      "disabled:opacity-50"
    );
  });

  it("renders select with custom position", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText("Select an option");
    fireEvent.click(trigger);

    const content = screen.getByText("Option 1").closest('[role="listbox"]');
    expect(content).toHaveClass(
      "relative",
      "z-50",
      "max-h-96",
      "min-w-[8rem]",
      "overflow-hidden",
      "rounded-md",
      "border",
      "bg-popover",
      "text-popover-foreground",
      "shadow-md"
    );
  });
});
