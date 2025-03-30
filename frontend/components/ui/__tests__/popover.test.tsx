import { fireEvent, render, screen } from "@testing-library/react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

describe("Popover", () => {
  it("renders popover trigger and content", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Open Popover")).toBeInTheDocument();
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();
  });

  it("opens popover content when trigger is clicked", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);

    const content = screen.getByText("Popover Content");
    expect(content).toBeVisible();
  });

  it("applies custom className to popover content", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent className="custom-class">
          Popover Content
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);

    const content = screen.getByText("Popover Content");
    expect(content).toHaveClass("custom-class");
  });

  it("renders with custom align and sideOffset", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent align="start" sideOffset={10}>
          Popover Content
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);

    const content = screen.getByText("Popover Content");
    expect(content).toHaveClass(
      "z-50",
      "w-72",
      "rounded-md",
      "border",
      "bg-popover",
      "p-4",
      "text-popover-foreground",
      "shadow-md"
    );
  });
});
