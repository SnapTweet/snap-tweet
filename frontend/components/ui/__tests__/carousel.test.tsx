import { fireEvent, render, screen } from "@testing-library/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

// Mock useEmblaCarousel with proper API shape
jest.mock("embla-carousel-react", () => ({
  __esModule: true,
  default: () => [
    jest.fn(),
    {
      scrollPrev: jest.fn(),
      scrollNext: jest.fn(),
      canScrollPrev: () => true,
      canScrollNext: () => true,
      scrollTo: jest.fn(),
      scrollOffset: jest.fn(),
      on: (event: string, callback: () => void) => {
        if (event === "select") {
          callback();
        }
      },
      off: jest.fn(),
      reInit: jest.fn(),
    },
  ],
}));

describe("Carousel", () => {
  beforeAll(() => {
    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it("renders carousel with items", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("handles navigation buttons", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    const prevButton = screen.getByText("Previous slide");
    const nextButton = screen.getByText("Next slide");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("handles keyboard navigation", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const carousel = screen.getByRole("region");
    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
  });

  it("applies correct orientation classes", () => {
    const { container } = render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const content = container.querySelector('[role="region"]');
    expect(content).toHaveAttribute("aria-roledescription", "carousel");
  });
});
