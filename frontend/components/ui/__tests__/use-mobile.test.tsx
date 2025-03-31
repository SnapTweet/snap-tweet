import { renderHook } from "@testing-library/react";
import { useIsMobile } from "../use-mobile";

describe("useIsMobile", () => {
  const mockMatchMedia = (matches: boolean) => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  };

  beforeEach(() => {
    window.innerWidth = 1024;
    mockMatchMedia(false);
  });

  it("returns false for desktop viewport", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true for mobile viewport", () => {
    window.innerWidth = 375;
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });
});
