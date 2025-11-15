import { describe, expect, it } from "vitest";
import { techChipVariants } from "../lib/tech-chip-variants";

describe("techChipVariants", () => {
  it("returns default tech-chip class", () => {
    const result = techChipVariants();
    expect(result).toContain("tech-chip");
  });

  it("returns frontend variant class", () => {
    const result = techChipVariants({ variant: "frontend" });
    expect(result).toContain("tech-chip");
    expect(result).toContain("tech-chip-frontend");
  });

  it("returns backend variant class", () => {
    const result = techChipVariants({ variant: "backend" });
    expect(result).toContain("tech-chip");
    expect(result).toContain("tech-chip-backend");
  });

  it("returns engine variant class", () => {
    const result = techChipVariants({ variant: "engine" });
    expect(result).toContain("tech-chip");
    expect(result).toContain("tech-chip-engine");
  });

  it("adds loading status class", () => {
    const result = techChipVariants({ status: "loading" });
    expect(result).toContain("tech-chip-loading");
  });

  it("adds ready status class", () => {
    const result = techChipVariants({ status: "ready" });
    expect(result).toContain("tech-chip-ready");
  });

  it("adds error status class", () => {
    const result = techChipVariants({ status: "error" });
    expect(result).toContain("tech-chip-error");
  });

  it("adds clickable class when clickable is true", () => {
    const result = techChipVariants({ clickable: true });
    expect(result).toContain("tech-chip-clickable");
  });

  it("does not add clickable class when clickable is false", () => {
    const result = techChipVariants({ clickable: false });
    expect(result).not.toContain("tech-chip-clickable");
  });

  it("includes custom class names", () => {
    const result = techChipVariants({ class: "custom-class" });
    expect(result).toContain("custom-class");
  });

  it("combines multiple options", () => {
    const result = techChipVariants({
      variant: "frontend",
      status: "ready",
      clickable: true,
      class: "custom",
    });
    expect(result).toContain("tech-chip");
    expect(result).toContain("tech-chip-frontend");
    expect(result).toContain("tech-chip-ready");
    expect(result).toContain("tech-chip-clickable");
    expect(result).toContain("custom");
  });

  it("handles all variants correctly", () => {
    const variants = ["frontend", "backend", "engine"] as const;

    variants.forEach((variant) => {
      const result = techChipVariants({ variant });
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
      expect(result).toContain("tech-chip");
      expect(result).toContain(`tech-chip-${variant}`);
    });
  });

  it("handles all statuses correctly", () => {
    const statuses = ["loading", "ready", "error"] as const;

    statuses.forEach((status) => {
      const result = techChipVariants({ status });
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
      expect(result).toContain("tech-chip");
      expect(result).toContain(`tech-chip-${status}`);
    });
  });
});
