import { fireEvent, render, screen } from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "../sidebar";

// Mock the useIsMobile hook
jest.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("Sidebar", () => {
  beforeAll(() => {
    // Mock window.matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it("renders sidebar with content", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>Header</SidebarHeader>
          <SidebarContent>Content</SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("toggles sidebar state when trigger is clicked", () => {
    render(
      <SidebarProvider>
        <SidebarTrigger data-testid="trigger" />
        <Sidebar>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );

    const trigger = screen.getByTestId("trigger");
    fireEvent.click(trigger);

    // Check if sidebar has data-state attribute
    const sidebar = screen
      .getByText("Content")
      .closest('[data-sidebar="sidebar"]');
    expect(sidebar?.parentElement?.parentElement).toHaveAttribute(
      "data-state",
      "collapsed"
    );
  });

  it("applies custom className and data attributes", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader data-testid="header" className="custom-header">
            Header
          </SidebarHeader>
          <SidebarContent data-testid="content" className="custom-content">
            Content
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );

    // Check for data-testid attributes instead of relying on text content
    expect(screen.getByTestId("header")).toHaveClass("custom-header");
    expect(screen.getByTestId("content")).toHaveClass("custom-content");
  });
});
