import { describe, expect, it } from "vitest";
import { buttonVariants } from "../lib/button-variants";

describe("buttonVariants", () => {
  it("returns default control-btn class", () => {
    const result = buttonVariants();
    expect(result).toContain("control-btn");
  });

  it("returns play-pause-btn for play-pause variant", () => {
    const result = buttonVariants({ variant: "play-pause" });
    expect(result).toContain("play-pause-btn");
    expect(result).not.toContain("control-btn");
  });

  it("returns small-btn for small variant", () => {
    const result = buttonVariants({ variant: "small" });
    expect(result).toContain("control-btn");
    expect(result).toContain("small-btn");
  });

  it("returns close-btn for close variant", () => {
    const result = buttonVariants({ variant: "close" });
    expect(result).toContain("control-btn");
    expect(result).toContain("close-btn");
  });

  it("adds active class when active is true", () => {
    const result = buttonVariants({ active: true });
    expect(result).toContain("active");
  });

  it("adds pinned class when pinned is true", () => {
    const result = buttonVariants({ pinned: true });
    expect(result).toContain("pinned");
  });

  it("adds maximized class when maximized is true", () => {
    const result = buttonVariants({ maximized: true });
    expect(result).toContain("maximized");
  });

  it("adds disabled class when disabled is true", () => {
    const result = buttonVariants({ disabled: true });
    expect(result).toContain("disabled");
  });

  it("adds disabled class when loading is true", () => {
    const result = buttonVariants({ loading: true });
    expect(result).toContain("disabled");
  });

  it("adds size classes", () => {
    const smResult = buttonVariants({ size: "sm" });
    expect(smResult).toContain("btn-sm");

    const lgResult = buttonVariants({ size: "lg" });
    expect(lgResult).toContain("btn-lg");
  });

  it("includes custom class names", () => {
    const result = buttonVariants({ class: "custom-class" });
    expect(result).toContain("custom-class");
  });

  it("combines multiple options", () => {
    const result = buttonVariants({
      variant: "primary",
      size: "lg",
      active: true,
      class: "custom",
    });
    expect(result).toContain("control-btn");
    expect(result).toContain("btn-lg");
    expect(result).toContain("active");
    expect(result).toContain("custom");
  });

  it("handles all variants correctly", () => {
    const variants = [
      "primary",
      "secondary",
      "ghost",
      "danger",
      "success",
      "warning",
      "control",
      "play-pause",
      "small",
      "close",
      "minimize",
      "maximize",
      "pin",
      "expand",
      "copy",
      "attach",
      "back",
      "forward",
      "refresh",
      "home",
      "save",
      "download",
      "upload",
      "edit",
      "delete",
      "cancel",
      "stop",
      "skip-next",
      "skip-previous",
      "fullscreen",
      "view-list",
      "view-grid",
      "search",
      "filter",
      "share",
      "favorite",
      "trigger",
    ] as const;

    variants.forEach((variant) => {
      const result = buttonVariants({ variant });
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });
  });
});

