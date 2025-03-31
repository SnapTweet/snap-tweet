import { fireEvent, render, screen } from "@testing-library/react";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

describe("ToggleGroup", () => {
  it("renders toggle group with items", () => {
    render(
      <ToggleGroup type="single" data-testid="group">
        <ToggleGroupItem value="1" data-testid="item-1">
          One
        </ToggleGroupItem>
        <ToggleGroupItem value="2" data-testid="item-2">
          Two
        </ToggleGroupItem>
      </ToggleGroup>
    );

    expect(screen.getByTestId("group")).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toHaveAttribute("data-state", "off");
    expect(screen.getByTestId("item-2")).toHaveAttribute("data-state", "off");
  });

  it("handles item selection in single mode", () => {
    render(
      <ToggleGroup type="single" defaultValue="1">
        <ToggleGroupItem value="1" data-testid="item-1">
          One
        </ToggleGroupItem>
        <ToggleGroupItem value="2" data-testid="item-2">
          Two
        </ToggleGroupItem>
      </ToggleGroup>
    );

    expect(screen.getByTestId("item-1")).toHaveAttribute("data-state", "on");
    expect(screen.getByTestId("item-2")).toHaveAttribute("data-state", "off");
  });

  it("applies variant and size from context", () => {
    render(
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="1" data-testid="item">
          One
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const item = screen.getByTestId("item");
    expect(item).toHaveClass("h-9", "border-input");
  });

  it("allows multiple selection in multiple mode", () => {
    render(
      <ToggleGroup type="multiple" defaultValue={["1"]}>
        <ToggleGroupItem value="1" data-testid="item-1">
          One
        </ToggleGroupItem>
        <ToggleGroupItem value="2" data-testid="item-2">
          Two
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const item1 = screen.getByTestId("item-1");
    const item2 = screen.getByTestId("item-2");

    expect(item1).toHaveAttribute("data-state", "on");
    expect(item2).toHaveAttribute("data-state", "off");

    fireEvent.click(item2);
    expect(item2).toHaveAttribute("data-state", "on");
    expect(item1).toHaveAttribute("data-state", "on");
  });
});
