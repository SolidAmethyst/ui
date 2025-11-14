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
	},

	customization: `@layer base {
  :root {
    --alert-background-dark: hsla(240, 5.9%, 10%, 0.9);
    --alert-background-light: hsla(0, 0%, 98%, 0.9);
    --alert-backdrop-blur: 8px;
    --alert-border-radius: 8px;
    --alert-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    --alert-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
    --alert-success-color: hsl(142, 71%, 45%);
    --alert-error-color: hsl(0, 84%, 60%);
    --alert-warning-color: hsl(38, 92%, 50%);
    --alert-info-color: hsl(217, 91%, 60%);
  }

  .dark,
  [data-theme="dark"] {
    --alert-background-dark: hsla(240, 5.9%, 10%, 0.9);
    --alert-background-light: hsla(0, 0%, 98%, 0.9);
    --alert-backdrop-blur: 8px;
    --alert-border-radius: 8px;
    --alert-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    --alert-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
    --alert-success-color: hsl(142, 71%, 45%);
    --alert-error-color: hsl(0, 84%, 60%);
    --alert-warning-color: hsl(38, 92%, 50%);
    --alert-info-color: hsl(217, 91%, 60%);
  }
}`
} as const
