import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

describe("Avatar", () => {
  it("renders Avatar with default props", () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
      </Avatar>
    );

    const avatar = screen.getByTestId("avatar-root");
    expect(avatar).toHaveClass(
      "relative",
      "flex",
      "h-10",
      "w-10",
      "shrink-0",
      "overflow-hidden",
      "rounded-full"
    );
  });

  it("applies custom className to Avatar", () => {
    render(
      <Avatar className="custom-class">
        <AvatarImage src="/test.jpg" alt="Test" />
      </Avatar>
    );

    const avatar = screen.getByTestId("avatar-root");
    expect(avatar).toHaveClass("custom-class");
  });

  it("renders AvatarFallback when image fails to load", () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass(
      "flex",
      "h-full",
      "w-full",
      "items-center",
      "justify-center",
      "rounded-full",
      "bg-muted"
    );
  });

  it("applies custom className to AvatarFallback", () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback className="custom-fallback">JD</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText("JD");
    expect(fallback).toHaveClass("custom-fallback");
  });

  it("forwards ref to Avatar component", () => {
    const ref = jest.fn();
    render(
      <Avatar ref={ref}>
        <AvatarImage src="/test.jpg" alt="Test" />
      </Avatar>
    );
    expect(ref).toHaveBeenCalled();
  });
});
