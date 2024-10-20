import { describe, expect, it } from "vitest";
import { classNames } from "./class-name.utilities";

describe("ClassNameUtilities", () => {
  describe("classNames", () => {
    it("should return string when truthy values provided", () => {
      const truthy = true;

      expect(classNames("class-name-1 class-name-2", truthy && "class-name-3")).toBe("class-name-1 class-name-2 class-name-3");
    });

    it("should return undefined when falsy values provided", () => {
      const falsy = false;

      expect(classNames(falsy && "class-name-1")).toBeUndefined();
    });
  });
});
