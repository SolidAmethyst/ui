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
    /* Tooltip component styling */
    --tooltip-backdrop-blur: 8px;
    --tooltip-border-radius: 6px;
    --tooltip-padding: 8px 12px;
    --tooltip-font-size: 13px;
    --tooltip-z-index: 10000;
  }

  [data-theme="dark"] {
    /* Tooltip uses same styling in dark theme */
    --tooltip-backdrop-blur: 8px;
  }
}`,
} as const;
