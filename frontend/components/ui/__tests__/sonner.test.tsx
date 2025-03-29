import { render } from "@testing-library/react";
import { useTheme } from "next-themes";
import { Toaster } from "../sonner";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

// Mock sonner with proper theme handling
jest.mock("sonner", () => ({
  Toaster: jest.fn().mockImplementation(({ theme, ...props }) => (
    <div data-testid="mock-sonner" data-theme={theme}>
      {JSON.stringify({ theme, ...props })}
    </div>
  )),
}));

describe("Toaster", () => {
  it("uses system theme when no theme is provided", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: undefined });

    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId("mock-sonner");
    expect(toaster).toHaveAttribute("data-theme", "system");
  });

  it("uses custom theme when provided", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "dark" });

    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId("mock-sonner");
    expect(toaster).toHaveAttribute("data-theme", "dark");
  });

  it("passes through custom props", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    const { getByTestId } = render(
      <Toaster expand={true} closeButton={true} />
    );
    const props = JSON.parse(getByTestId("mock-sonner").textContent || "{}");

    expect(props.expand).toBe(true);
    expect(props.closeButton).toBe(true);
  });

  it("applies correct class names in toast options", () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId("mock-sonner");
    const props = JSON.parse(toaster.textContent || "{}");

    expect(props.toastOptions.classNames.toast).toContain("group toast");
    expect(props.toastOptions.classNames.actionButton).toContain(
      "group-[.toast]:bg-primary"
    );
    expect(props.toastOptions.classNames.cancelButton).toContain(
      "group-[.toast]:bg-muted"
    );
  });
});
