/**
 * ProgressBar Component Code Snippets
 */

export const progressBarSnippets = {
  imports: `import { ProgressBar } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `import { createSignal } from 'solid-js'
import { ProgressBar } from '@sapphiresolid/ui'

function MyComponent() {
  const [progress, setProgress] = createSignal(50)

  return <ProgressBar value={progress()} />
}`,

    indeterminate: `import { ProgressBar } from '@sapphiresolid/ui'

<ProgressBar variant="indeterminate" />`,
  },

  customization: `@layer base {
  :root {
    /* ProgressBar component styling */
    --progress-bar-height: 8px;
    --progress-bar-border-radius: 4px;
  }

  [data-theme="dark"] {
    /* ProgressBar uses same sizing in dark theme */
    --progress-bar-height: 8px;
    --progress-bar-border-radius: 4px;
  }
}`,
} as const;
