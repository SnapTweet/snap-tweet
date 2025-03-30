import { fireEvent, render, screen } from "@testing-library/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";

describe("Collapsible", () => {
  const CollapsibleTest = () => (
    <Collapsible>
      <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
      <CollapsibleContent data-testid="content">Content</CollapsibleContent>
    </Collapsible>
  );

  it("renders collapsed by default", () => {
    render(<CollapsibleTest />);
    const trigger = screen.getByTestId("trigger");
    const content = screen.getByTestId("content");

    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(content).toHaveAttribute("data-state", "closed");
    expect(content).not.toBeVisible();
  });

  it("expands when trigger is clicked", async () => {
    render(<CollapsibleTest />);
    const trigger = screen.getByTestId("trigger");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getByTestId("content")).toHaveAttribute("data-state", "open");
  });

  it("applies custom className", () => {
    render(
      <Collapsible className="custom-class">
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
