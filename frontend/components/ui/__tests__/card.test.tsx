import { render, screen } from "@testing-library/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

describe("Card", () => {
  it("renders card with default props", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
    expect(screen.getByText("Card Footer")).toBeInTheDocument();
  });

  it("renders card with custom className", () => {
    render(<Card className="custom-class" />);
    const card = screen.getByRole("region");
    expect(card).toHaveClass("custom-class");
  });

  it("renders card header with custom className", () => {
    render(
      <Card>
        <CardHeader className="custom-header" />
      </Card>
    );
    const header = screen.getByRole("region").firstChild;
    expect(header).toHaveClass("custom-header");
  });

  it("renders card title with custom className", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle className="custom-title">Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Title")).toHaveClass("custom-title");
  });

  it("renders card description with custom className", () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription className="custom-description">
            Description
          </CardDescription>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText("Description")).toHaveClass("custom-description");
  });

  it("renders card content with custom className", () => {
    render(
      <Card>
        <CardContent className="custom-content">Content</CardContent>
      </Card>
    );
    expect(screen.getByText("Content")).toHaveClass("custom-content");
  });

  it("renders card footer with custom className", () => {
    render(
      <Card>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Footer")).toHaveClass("custom-footer");
  });

  it("forwards ref to card component", () => {
    const ref = jest.fn();
    render(<Card ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
