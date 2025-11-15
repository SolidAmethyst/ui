/**
 * Tooltip Component Code Snippets
 */

export const tooltipSnippets = {
  imports: `import { Tooltip } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<Tooltip content="Tooltip text" position="top">
  <button>Hover me</button>
</Tooltip>`,

    positions: `<Tooltip content="Top" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Bottom" position="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Left" position="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="Right" position="right">
  <button>Right</button>
</Tooltip>`,
  },

  customization: `@layer base {
  :root {
    --tooltip-background-dark: hsla(240, 5.9%, 10%, 0.9);
    --tooltip-background-light: hsla(0, 0%, 98%, 0.9);
    --tooltip-backdrop-blur: 8px;
    --tooltip-border-radius: 6px;
    --tooltip-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    --tooltip-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    --tooltip-padding: 8px 12px;
    --tooltip-font-size: 13px;
    --tooltip-z-index: 10000;
  }

  .dark,
  [data-theme="dark"] {
    --tooltip-background-dark: hsla(240, 5.9%, 10%, 0.9);
    --tooltip-background-light: hsla(0, 0%, 98%, 0.9);
    --tooltip-backdrop-blur: 8px;
    --tooltip-border-radius: 6px;
    --tooltip-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    --tooltip-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    --tooltip-padding: 8px 12px;
    --tooltip-font-size: 13px;
    --tooltip-z-index: 10000;
  }
}`,
} as const;
