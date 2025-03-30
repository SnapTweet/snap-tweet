import { waitFor } from "@testing-library/dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

describe("DropdownMenu", () => {
  beforeEach(() => {
    // Create a div to mount portals
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up portal root
    const portalRoot = document.getElementById("portal-root");
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it("renders dropdown menu items when triggered", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await act(async () => {
      await user.click(screen.getByTestId("dropdown-trigger"));
    });

    await waitFor(() => {
      expect(screen.getByText("My Account")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  it("handles checkbox items correctly", async () => {
    const onCheckedChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
            data-testid="checkbox-item"
          >
            Show Status
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await act(async () => {
      await user.click(screen.getByTestId("dropdown-trigger"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("checkbox-item")).toBeInTheDocument();
    });

    await act(async () => {
      await user.click(screen.getByTestId("checkbox-item"));
    });

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("handles radio items correctly", async () => {
    const onValueChange = jest.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="dropdown-trigger">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="medium" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="small" data-testid="radio-small">
              Small
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium" data-testid="radio-medium">
              Medium
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="large" data-testid="radio-large">
              Large
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await act(async () => {
      await user.click(screen.getByTestId("dropdown-trigger"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("radio-large")).toBeInTheDocument();
    });

    await act(async () => {
      await user.click(screen.getByTestId("radio-large"));
    });

    expect(onValueChange).toHaveBeenCalledWith("large");
  });
});
