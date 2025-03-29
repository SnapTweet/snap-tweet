import { act, renderHook } from "@testing-library/react";
import { useToast } from "../use-toast";

describe("useToast", () => {
  it("adds toast to state", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: "Test Toast",
        description: "This is a test",
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Test Toast");
  });

  it("dismisses toast", () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      const { id } = result.current.toast({ title: "Test" });
      toastId = id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it("updates existing toast", () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      const { id } = result.current.toast({ title: "Original" });
      toastId = id;
    });

    act(() => {
      result.current.toast({ id: toastId, title: "Updated" });
    });

    expect(result.current.toasts[0].title).toBe("Updated");
  });

  it("respects toast limit", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: "Toast 1" });
      result.current.toast({ title: "Toast 2" });
      result.current.toast({ title: "Toast 3" });
    });

    expect(result.current.toasts).toHaveLength(1);
  });
});
