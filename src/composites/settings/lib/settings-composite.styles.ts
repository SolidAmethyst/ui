/**
 * Settings Composite Styles
 */

export const settingsCompositeStyles = {
  container: () => ({
    display: "flex",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    "box-sizing": "border-box" as const,
    flex: "1",
  }),

  sidebar: () => ({
    width: "220px",
    "min-width": "220px",
    "flex-shrink": "0",
    "border-right": `1px solid hsl(var(--border))`,
    background: `hsl(var(--card))`,
    overflow: "hidden" as const,
    "box-sizing": "border-box" as const,
    display: "flex",
    "flex-direction": "column" as const,
  }),

  categoryButton: (isActive: boolean) => ({
    width: "100%",
    display: "flex",
    "align-items": "center",
    gap: "12px",
    padding: "12px 16px",
    "border-radius": "0",
    cursor: "pointer",
    "font-size": "var(--settings-label-font-size)",
    color: isActive ? `hsl(var(--foreground))` : `hsl(var(--muted-foreground))`,
    transition:
      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    "background-color": isActive ? `hsl(var(--muted))` : "transparent",
    border: "none",
    outline: "none",
    "text-align": "left" as const,
    "box-sizing": "border-box" as const,
    "font-weight": isActive ? "500" : "400",
    "white-space": "nowrap" as const,
    overflow: "hidden" as const,
    "text-overflow": "ellipsis" as const,
  }),

  categoryIcon: () => ({
    "font-size": "20px",
    width: "20px",
    height: "20px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0",
  }),

  subcategoryContainer: () => ({
    padding: "4px 0",
    "border-top": `1px solid hsl(var(--border) / 0.3)`,
    "margin-top": "4px",
  }),

  subcategoryButton: (isActive: boolean) => ({
    width: "100%",
    display: "flex",
    "align-items": "center",
    gap: "10px",
    padding: "8px 16px 8px 44px", // Indent subcategories
    "border-radius": "0",
    cursor: "pointer",
    "font-size": "var(--settings-description-font-size)",
    color: isActive ? `hsl(var(--foreground))` : `hsl(var(--muted-foreground))`,
    transition:
      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    "background-color": isActive ? `hsl(var(--muted) / 0.6)` : "transparent",
    border: "none",
    "text-align": "left" as const,
    "box-sizing": "border-box" as const,
    "font-weight": isActive ? "500" : "400",
    "white-space": "nowrap" as const,
    overflow: "hidden" as const,
    "text-overflow": "ellipsis" as const,
  }),

  subcategoryIcon: () => ({
    "font-size": "18px",
    width: "18px",
    height: "18px",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0",
  }),

  content: () => ({
    flex: "1",
    overflow: "hidden" as const,
    background: `hsl(var(--card))`,
    "box-sizing": "border-box" as const,
    display: "flex" as const,
    "flex-direction": "column" as const,
  }),

  tabsContainer: () => ({
    display: "flex",
    gap: "0",
    "border-bottom": `1px solid hsl(var(--border))`,
    padding: "0 20px",
    background: `hsl(var(--card))`,
  }),

  tabButton: (isActive: boolean) => ({
    padding: "12px 20px",
    "font-size": "var(--settings-label-font-size)",
    "font-weight": isActive ? "500" : "400",
    color: isActive ? `hsl(var(--foreground))` : `hsl(var(--muted-foreground))`,
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    "border-bottom": isActive
      ? `2px solid hsl(var(--primary))`
      : "2px solid transparent",
    transition:
      "color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), text-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    "box-sizing": "border-box" as const,
    "margin-bottom": "-1px",
  }),
  tabButtonHover: (isActive: boolean) => ({
    color: isActive ? "hsl(var(--hover-color))" : `hsl(var(--foreground))`,
    "border-bottom": isActive
      ? `2px solid color-mix(in hsl, hsl(var(--primary-hover)) var(--hover-color-mix-primary), white var(--hover-color-mix-white))`
      : "2px solid transparent",
    "text-shadow": isActive
      ? `0 0 var(--hover-text-shadow-blur) hsla(var(--primary-hover) / var(--hover-text-shadow-opacity))`
      : "none",
  }),

  contentArea: () => ({
    flex: "1",
    overflow: "visible" as const,
    width: "100%",
  }),
  section: () => ({
    padding: "24px 20px",
    "border-bottom": `1px solid hsl(var(--border))`,
    "&:last-child": {
      "border-bottom": "none",
    },
  }),

  sectionTitle: () => ({
    "font-size": "16px",
    "font-weight": "600",
    color: `hsl(var(--foreground))`,
    margin: "0 0 8px 0",
    "letter-spacing": "-0.01em",
  }),

  sectionDescription: () => ({
    "font-size": "var(--settings-description-font-size)",
    color: `hsl(var(--muted-foreground))`,
    "margin-bottom": "20px",
    "line-height": "1.5",
  }),

  controlContainer: (isLast: boolean = false) => ({
    padding: isLast ? "16px 0 0 0" : "16px 0",
    "border-bottom": isLast ? "none" : `1px solid hsl(var(--border) / 0.5)`,
  }),

  controlLabel: () => ({
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "margin-bottom": "8px",
    "font-size": "var(--settings-label-font-size)",
    color: `hsl(var(--foreground))`,
    "font-weight": "500",
  }),

  controlValue: () => ({
    "font-size": "12px",
    color: `hsl(var(--muted-foreground))`,
    "font-weight": "400",
    "min-width": "40px",
    "text-align": "right" as const,
  }),

  checkboxContainer: () => ({
    display: "flex",
    "align-items": "center",
    gap: "12px",
    padding: "16px 0",
    "margin-bottom": "8px",
    "border-bottom": `1px solid hsl(var(--border) / 0.5)`,
  }),

  checkbox: () => ({
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "hsl(var(--primary))",
  }),

  checkboxLabel: () => ({
    "font-size": "var(--settings-label-font-size)",
    color: `hsl(var(--foreground))`,
    cursor: "pointer",
    "user-select": "none" as const,
  }),

  placeholder: () => ({
    padding: "20px",
    "text-align": "center" as const,
    color: `hsl(var(--muted-foreground) / 0.5)`,
    "font-size": "var(--settings-label-font-size)",
    "font-style": "italic",
  }),
} as const;
