import { render, screen } from "@testing-library/react";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "../chart";

// Mock recharts
jest.mock("recharts", () => ({
  ResponsiveContainer: jest.fn(({ children }) => (
    <div data-testid="chart-container">{children}</div>
  )),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

describe("Chart Components", () => {
  const mockConfig = {
    revenue: {
      label: "Revenue",
      theme: {
        light: "#00ff00",
        dark: "#008000",
      },
    },
  };

  describe("ChartContainer", () => {
    it("renders with custom id and className", () => {
      render(
        <ChartContainer
          id="test-chart"
          className="custom-chart"
          config={mockConfig}
        >
          <div data-testid="chart-content">Chart content</div>
        </ChartContainer>
      );

      const container = screen.getByTestId("chart-container");
      expect(container.parentElement).toHaveClass("custom-chart");
    });

    it("generates styles for theme-based colors", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <div>Chart content</div>
        </ChartContainer>
      );

      const style = container.querySelector("style");
      expect(style?.innerHTML).toContain("--color-revenue");
      expect(style?.innerHTML).toContain("#00ff00"); // Light theme color
    });
  });

  describe("ChartTooltipContent", () => {
    const mockPayload = [
      {
        name: "revenue",
        value: 1000,
        color: "#00ff00",
        dataKey: "revenue",
        payload: {
          revenue: 1000,
          fill: "#00ff00",
        },
      },
    ];

    it("renders nothing when not active", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent active={false} payload={mockPayload} />
        </ChartContainer>
      );

      expect(
        container.querySelector('[class*="min-w-[8rem]"]')
      ).not.toBeInTheDocument();
    });

    it("renders with custom formatter", () => {
      const formatter = jest.fn(() => (
        <div data-testid="formatted">Formatted Value</div>
      ));

      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            formatter={formatter}
            nameKey="revenue"
          />
        </ChartContainer>
      );

      expect(screen.getByTestId("formatted")).toBeInTheDocument();
      expect(formatter).toHaveBeenCalledWith(
        1000,
        "revenue",
        mockPayload[0],
        0,
        mockPayload[0].payload
      );
    });

    it("handles different indicator types", () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            indicator="line"
            nameKey="revenue"
            className="test-tooltip"
          />
        </ChartContainer>
      );

      // Look for the indicator by its specific classes that are always present
      const tooltipContent = document.querySelector(".test-tooltip");
      const indicator = tooltipContent?.querySelector(".w-1.shrink-0");
      expect(indicator).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="Test Label"
            nameKey="revenue"
          />
        </ChartContainer>
      );

      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("handles custom label formatter", () => {
      const labelFormatter = jest.fn((value) => `Formatted: ${value}`);

      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={mockPayload}
            label="Test"
            labelFormatter={labelFormatter}
            nameKey="revenue"
          />
        </ChartContainer>
      );

      expect(screen.getByText("Formatted: Test")).toBeInTheDocument();
      expect(labelFormatter).toHaveBeenCalledWith("Test", mockPayload);
    });

    it("handles empty payload", () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent active={true} payload={[]} nameKey="revenue" />
        </ChartContainer>
      );

      // Should render empty or with minimal content
      const tooltipContent = document.querySelector(".min-w-\\[8rem\\]");
      expect(tooltipContent).not.toBeInTheDocument();
    });
  });

  describe("ChartLegendContent", () => {
    const mockLegendPayload = [
      {
        value: "revenue",
        color: "#00ff00",
        dataKey: "revenue",
      },
    ];

    it("renders with vertical alignment", () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent
            payload={mockLegendPayload}
            verticalAlign="top"
            className="pb-3"
          />
        </ChartContainer>
      );

      const legendContainer = screen.getByText("Revenue").closest("div");
      expect(legendContainer?.parentElement).toHaveClass("pb-3");
    });
  });
});
