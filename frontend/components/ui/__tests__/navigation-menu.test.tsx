import { fireEvent, render, screen } from "@testing-library/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";

describe("NavigationMenu", () => {
  beforeAll(() => {
    // Create portal root for navigation content
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "radix-portal");
    document.body.appendChild(portalRoot);
  });

  it("renders navigation menu", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>Content 1</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("shows content on trigger click", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger data-testid="trigger">
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent>Menu Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const trigger = screen.getByTestId("trigger");
    fireEvent.click(trigger);

    expect(await screen.findByText("Menu Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu className="custom-class">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });
});
