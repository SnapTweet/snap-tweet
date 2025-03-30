import { waitFor } from "@testing-library/dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";

describe("Drawer", () => {
  beforeAll(() => {
    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock matchMedia
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

  it("renders drawer with content when triggered", async () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger">Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Test Title</DrawerTitle>
            <DrawerDescription>Test Description</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose data-testid="drawer-close">Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("drawer-trigger"));
    });

    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });
  });

  it("closes drawer when close button is clicked", async () => {
    render(
      <Drawer>
        <DrawerTrigger data-testid="drawer-trigger">Open</DrawerTrigger>
        <DrawerContent>
          <DrawerClose data-testid="drawer-close">Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("drawer-trigger"));
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toHaveAttribute("data-state", "open");
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("drawer-close"));
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "data-state",
        "closed"
      );
    });
  });
});
