import { fireEvent, render, screen } from "@testing-library/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

describe("Accordion", () => {
  const renderAccordion = () => {
    return render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes, it follows WAI-ARIA patterns.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes, it's styled with Tailwind CSS.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  it("renders accordion items correctly", () => {
    renderAccordion();
    expect(screen.getByText("Is it accessible?")).toBeInTheDocument();
    expect(screen.getByText("Is it styled?")).toBeInTheDocument();
  });

  it("expands and collapses on trigger click", () => {
    renderAccordion();
    const trigger = screen.getByText("Is it accessible?").closest("button");
    const contentId = trigger?.getAttribute("aria-controls");

    // Initial state - collapsed
    const contentRegion = document.getElementById(contentId || "");
    expect(contentRegion).toHaveAttribute("data-state", "closed");
    expect(contentRegion).toHaveAttribute("hidden");

    // Click to expand
    fireEvent.click(trigger!);
    expect(contentRegion).toHaveAttribute("data-state", "open");
    expect(contentRegion).not.toHaveAttribute("hidden");
  });

  it("applies custom className to AccordionItem", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="test" className="custom-class">
          <AccordionTrigger>Test</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    // Find the AccordionItem div directly
    const items = document.querySelectorAll('[data-orientation="vertical"]');
    const item = Array.from(items).find((el) =>
      el.classList.contains("border-b")
    );
    expect(item).toHaveClass("custom-class", "border-b");
  });

  it("renders chevron icon in trigger", () => {
    renderAccordion();
    const trigger = screen.getByText("Is it accessible?").closest("button");
    const chevron = trigger?.querySelector("svg");
    expect(chevron).toBeInTheDocument();
    expect(chevron).toHaveClass("h-4", "w-4");
  });
});
