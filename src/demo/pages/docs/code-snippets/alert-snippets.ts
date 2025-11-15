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
/>`,
  },

  customization: `/* In your app's CSS file, override these variables */
@layer base {
  :root {
    /* Alert component styling - using library defaults */
    --alert-backdrop-blur: 8px;
    --alert-border-radius: 8px;
  }

  [data-theme="dark"] {
    /* Dark theme overrides (if needed) */
    --alert-backdrop-blur: 8px;
  }

  /* Use component colors from main theme variables */
  :root {
    --alert-success-color: hsl(142, 71%, 45%);
    --alert-error-color: hsl(0, 84%, 60%);
    --alert-warning-color: hsl(38, 92%, 50%);
    --alert-info-color: hsl(217, 91%, 60%);
  }
}`,
} as const;
