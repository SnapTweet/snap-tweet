import { render } from "@testing-library/react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("renders with default classes", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass("custom-class");
  });

  it("passes through HTML attributes", () => {
    const { container } = render(
      <Skeleton data-testid="test" aria-label="loading" />
    );
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute("data-testid", "test");
    expect(skeleton).toHaveAttribute("aria-label", "loading");
  });
});
