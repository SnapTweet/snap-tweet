import { cn } from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      const result = cn("base-class", "additional-class");
      expect(result).toBe("base-class additional-class");
    });

    it("handles conditional classes", () => {
      const result = cn("base-class", {
        "conditional-class": true,
        "unused-class": false,
      });
      expect(result).toBe("base-class conditional-class");
    });

    it("handles multiple conditional classes", () => {
      const result = cn(
        "base-class",
        {
          "first-conditional": true,
          "second-conditional": true,
        },
        "always-applied"
      );
      expect(result).toBe(
        "base-class first-conditional second-conditional always-applied"
      );
    });

    it("handles empty inputs", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("handles undefined and null values", () => {
      const result = cn("base-class", undefined, null);
      expect(result).toBe("base-class");
    });

    it("handles array of classes", () => {
      const result = cn(["class1", "class2"], "class3");
      expect(result).toBe("class1 class2 class3");
    });

    it("handles nested arrays", () => {
      const result = cn(["class1", ["class2", "class3"]], "class4");
      expect(result).toBe("class1 class2 class3 class4");
    });
  });
});
