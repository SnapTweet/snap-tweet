import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "whitespace-nowrap",
      "rounded-md",
      "text-sm",
      "font-medium",
      "ring-offset-background",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "[&_svg]:pointer-events-none",
      "[&_svg]:size-4",
      "[&_svg]:shrink-0",
      "bg-primary",
      "text-primary-foreground",
      "hover:bg-primary/90",
      "h-10",
      "px-4",
      "py-2"
    );
  });

  it("renders with different variants", () => {
    const variants = [
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <Button variant={variant}>{variant} Button</Button>
      );
      const button = container.firstChild;
      expect(button).toHaveClass(
        variant === "default" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "destructive" &&
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        variant === "outline" &&
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        variant === "link" && "text-primary underline-offset-4 hover:underline"
      );
    });
  });

  it("renders with different sizes", () => {
    const sizes = ["default", "sm", "lg", "icon"] as const;

    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>{size} Button</Button>);
      const button = container.firstChild;
      expect(button).toHaveClass(
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 rounded-md px-3",
        size === "lg" && "h-11 rounded-md px-8",
        size === "icon" && "h-10 w-10"
      );
    });
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("inline-flex", "items-center", "justify-center");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders with disabled state", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50"
    );
  });
});
