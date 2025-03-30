import { render, screen } from "@testing-library/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";

describe("HoverCard", () => {
  beforeEach(() => {
    // Create portal root for HoverCard
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "hover-card-portal");
    document.body.appendChild(portalRoot);
  });

  const HoverCardTest = () => (
    <HoverCard>
      <HoverCardTrigger data-testid="trigger">Hover me</HoverCardTrigger>
      <HoverCardContent data-testid="content">Card Content</HoverCardContent>
    </HoverCard>
  );

  it("renders trigger", () => {
    render(<HoverCardTest />);
    expect(screen.getByTestId("trigger")).toBeInTheDocument();
  });
});
