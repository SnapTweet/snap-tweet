import { render, screen } from "@testing-library/react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../menubar";

describe("Menubar", () => {
  beforeAll(() => {
    // Create portal root for menubar content
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "radix-portal");
    document.body.appendChild(portalRoot);
  });

  it("renders menubar with items", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger data-testid="trigger">File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    expect(screen.getByTestId("trigger")).toHaveAttribute(
      "data-state",
      "closed"
    );
  });
});
