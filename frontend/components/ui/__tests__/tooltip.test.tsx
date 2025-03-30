import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

describe("Tooltip", () => {
  beforeAll(() => {
    // Create a portal root
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "radix-portal");
    document.body.appendChild(portalRoot);
  });

  const TooltipTest = () => (
    <TooltipProvider>
      <Tooltip defaultOpen={false}>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  it("renders tooltip trigger", () => {
    render(<TooltipTest />);
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    const user = userEvent.setup();
    render(<TooltipTest />);

    const trigger = screen.getByText("Trigger");
    await act(async () => {
      await user.hover(trigger);
    });

    // Wait for the tooltip to appear in the portal
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Tooltip Content");

    await act(async () => {
      await user.unhover(trigger);
    });
  });
});
