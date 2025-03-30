import { render, screen } from "@testing-library/react";
import { ScrollArea } from "../scroll-area";

describe("ScrollArea", () => {
  it("renders content within scroll area", () => {
    render(
      <ScrollArea className="h-[200px] w-[350px]">
        <div>Scroll Content</div>
      </ScrollArea>
    );

    expect(screen.getByText("Scroll Content")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <ScrollArea className="custom-class">
        <div>Content</div>
      </ScrollArea>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
