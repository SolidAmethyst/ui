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

<ProgressBar variant="indeterminate" />`
	},

	customization: `@layer base {
  :root {
    --progress-bar-height: 8px;
    --progress-bar-border-radius: 4px;
    --progress-bar-background-light: rgba(0, 0, 0, 0.1);
    --progress-bar-background-dark: rgba(255, 255, 255, 0.1);
    --progress-bar-indicator-gradient: linear-gradient(90deg, hsl(271, 81%, 53%) 0%, hsl(271, 81%, 63%) 100%);
  }

  .dark,
  [data-theme="dark"] {
    --progress-bar-height: 8px;
    --progress-bar-border-radius: 4px;
    --progress-bar-background-light: rgba(0, 0, 0, 0.1);
    --progress-bar-background-dark: rgba(255, 255, 255, 0.1);
    --progress-bar-indicator-gradient: linear-gradient(90deg, hsl(271, 81%, 53%) 0%, hsl(271, 81%, 63%) 100%);
  }
}`
} as const
