import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../context-menu";

describe("ContextMenu", () => {
  beforeAll(() => {
    // Mock DOMRect
    class MockDOMRect {
      x = 0;
      y = 0;
      width = 100;
      height = 100;
      top = 0;
      right = 100;
      bottom = 100;
      left = 0;
      static fromRect() {
        return new MockDOMRect();
      }
    }
    global.DOMRect = MockDOMRect as any;

    Element.prototype.getBoundingClientRect = jest.fn(() => new MockDOMRect());
    window.getComputedStyle = jest.fn(() => ({ marginTop: "0px" })) as any;
  });

  it("renders menu items", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent data-testid="menu-content">
          <ContextMenuItem data-testid="item-1">Item 1</ContextMenuItem>
          <ContextMenuItem data-testid="item-2">Item 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const trigger = screen.getByTestId("trigger");
    fireEvent.contextMenu(trigger);

    // Wait for menu content to be visible
    const menuContent = await screen.findByTestId("menu-content");
    expect(menuContent).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
  });

  it("handles checkbox item state", async () => {
    const onCheckedChange = jest.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem
            data-testid="checkbox-item"
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Check me
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByTestId("trigger"));

    // Wait for the checkbox item to be visible
    const checkbox = await screen.findByTestId("checkbox-item");
    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("handles radio group selection", async () => {
    const onValueChange = jest.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup value="medium" onValueChange={onValueChange}>
            <ContextMenuRadioItem data-testid="radio-small" value="small">
              Small
            </ContextMenuRadioItem>
            <ContextMenuRadioItem data-testid="radio-medium" value="medium">
              Medium
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByTestId("trigger"));

    // Wait for radio items to be visible
    const smallRadio = await screen.findByTestId("radio-small");
    fireEvent.click(smallRadio);

    expect(onValueChange).toHaveBeenCalledWith("small");
  });

  it("applies custom classes to menu items", async () => {
    // Setup userEvent
    const user = userEvent.setup();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent
          className="custom-content"
          data-testid="menu-content"
        >
          <ContextMenuItem className="custom-item" data-testid="custom-item">
            Custom Item
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    // Use either fireEvent.contextMenu or userEvent.pointer
    // Option 1: Using fireEvent
    fireEvent.contextMenu(screen.getByTestId("trigger"));

    // Option 2: Using userEvent (more realistic)
    // await user.pointer({
    //   keys: "[MouseRight]",
    //   target: screen.getByTestId("trigger")
    // });

    // Wait for menu content to be visible
    const content = await screen.findByTestId("menu-content");
    const item = await screen.findByTestId("custom-item");

    expect(content).toHaveClass("custom-content");
    expect(item).toHaveClass("custom-item");
  });

  it("renders submenu with trigger and content", async () => {
    const user = userEvent.setup();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="main-trigger">Main</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger data-testid="sub-trigger" inset>
              More Options
            </ContextMenuSubTrigger>
            <ContextMenuSubContent data-testid="sub-content">
              <ContextMenuItem>Sub Item</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByTestId("main-trigger"));
    const subTrigger = await screen.findByTestId("sub-trigger");
    expect(subTrigger).toHaveClass("pl-8"); // Testing inset prop
  });

  it("renders label with inset prop", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel inset data-testid="label">
            Label
          </ContextMenuLabel>
        </ContextMenuContent>
      </ContextMenu>
    );

    // Trigger the context menu
    fireEvent.contextMenu(screen.getByTestId("trigger"));

    // Wait for the label to be visible
    const label = await screen.findByTestId("label");
    expect(label).toHaveClass("pl-8");
  });

  it("renders separator with custom class", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSeparator
            className="custom-separator"
            data-testid="separator"
          />
        </ContextMenuContent>
      </ContextMenu>
    );

    // Trigger the context menu
    fireEvent.contextMenu(screen.getByTestId("trigger"));

    // Wait for the separator to be visible
    const separator = await screen.findByTestId("separator");
    expect(separator).toHaveClass("custom-separator");
  });

  it("renders shortcut with custom class", () => {
    render(
      <ContextMenuShortcut className="custom-shortcut" data-testid="shortcut">
        ⌘+S
      </ContextMenuShortcut>
    );

    expect(screen.getByTestId("shortcut")).toHaveClass("custom-shortcut");
  });
});
