/**
 * SplitPane Component Code Snippets
 */

export const splitPaneSnippets = {
  imports: `import { SplitPane } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<SplitPane
  first={<div>Left Panel</div>}
  second={<div>Right Panel</div>}
/>`,

    vertical: `<SplitPane
  first={<div>Top Panel</div>}
  second={<div>Bottom Panel</div>}
  direction="vertical"
/>`,

    customSplit: `<SplitPane
  first={<div>Left Panel (30%)</div>}
  second={<div>Right Panel (70%)</div>}
  defaultSplit={30}
/>`,

    controlled: `const [split, setSplit] = createSignal(50)

<SplitPane
  first={<div>Left Panel</div>}
  second={<div>Right Panel</div>}
  split={split()}
  onSplitChange={setSplit}
/>`,

    constraints: `<SplitPane
  first={<div>Left Panel</div>}
  second={<div>Right Panel</div>}
  minFirst={20}
  maxFirst={80}
/>`,
  },

  customization: `@layer base {
  :root {
    --split-pane-handle-size: 4px;
  }

  .dark,
  [data-theme="dark"] {
    --split-pane-handle-size: 4px;
  }
}`,
} as const;
