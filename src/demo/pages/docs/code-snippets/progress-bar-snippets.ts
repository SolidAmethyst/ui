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
	}
} as const

