import { render, screen } from "@testing-library/react";
import { AspectRatio } from "../aspect-ratio";

describe("AspectRatio", () => {
  it("renders with default props", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );

    const container = screen.getByText("Content").parentElement;
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({ position: "absolute" });
  });

  it("applies custom className", () => {
    render(
      <AspectRatio ratio={16 / 9} className="custom-class">
        <div>Content</div>
      </AspectRatio>
    );

    const container = screen.getByText("Content").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  it("maintains aspect ratio with different ratios", () => {
    render(
      <AspectRatio ratio={4 / 3}>
        <div>Content</div>
      </AspectRatio>
    );

    const container = screen.getByText("Content").parentElement;
    expect(container).toBeInTheDocument();
  });
});
