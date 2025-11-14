/**
 * Alert Component Code Snippets
 */

export const alertSnippets = {
	imports: `import { Alert } from '@sapphiresolid/ui'`,

	usage: {
		variants: `<Alert
  variant="success"
  title="Success!"
  description="Operation completed successfully."
/>

<Alert
  variant="error"
  title="Error!"
  description="Something went wrong."
/>

<Alert
  variant="warning"
  title="Warning!"
  description="Please be careful."
/>

<Alert
  variant="info"
  title="Info"
  description="Here is some information."
/>`
	}
} as const

