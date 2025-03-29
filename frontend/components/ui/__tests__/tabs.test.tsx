import { render, screen } from "@testing-library/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

describe("Tabs", () => {
  it("renders tabs components", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("applies custom className to tabs list", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-class">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tablist")).toHaveClass("custom-class");
  });

  it("applies custom className to tab trigger", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-class">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab")).toHaveClass("custom-class");
  });

  it("applies custom className to tab content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-class">
          Content 1
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tabpanel")).toHaveClass("custom-class");
  });

  it("handles disabled tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" disabled>
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab");
    expect(tab).toBeDisabled();
    expect(tab).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50"
    );
  });
});
