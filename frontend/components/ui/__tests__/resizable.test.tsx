import { render, screen } from "@testing-library/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";

describe("Resizable", () => {
  it("renders resizable panel group with panels", () => {
    render(
      <ResizablePanelGroup>
        <ResizablePanel>Panel 1</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Panel 2</ResizablePanel>
      </ResizablePanelGroup>
    );

    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.getByText("Panel 2")).toBeInTheDocument();
  });

  it("renders handle with grip", () => {
    render(
      <ResizablePanelGroup>
        <ResizablePanel>Content</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>Content</ResizablePanel>
      </ResizablePanelGroup>
    );

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies custom className to panel group", () => {
    render(
      <ResizablePanelGroup className="custom-class">
        <ResizablePanel>Content</ResizablePanel>
      </ResizablePanelGroup>
    );

    expect(screen.getByText("Content").parentElement).toHaveClass(
      "custom-class"
    );
  });
});
