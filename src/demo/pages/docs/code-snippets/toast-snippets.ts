/**
 * Toast Component Code Snippets
 */

export const toastSnippets = {
	imports: `import { ToastProvider, useToast } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `import { ToastProvider, useToast } from '@sapphiresolid/ui'

function MyComponent() {
  const toast = useToast()

  return (
    <ToastProvider>
      <button onClick={() =>
        toast.showToast({
          title: 'Success!',
          description: 'Operation completed.',
          variant: 'success'
        })
      }>
        Show Toast
      </button>
    </ToastProvider>
  )
}`,

		variants: `toast.showToast({
  title: 'Success!',
  description: 'Operation completed.',
  variant: 'success'
})

toast.showToast({
  title: 'Error!',
  description: 'Something went wrong.',
  variant: 'error'
})

toast.showToast({
  title: 'Warning!',
  description: 'Please be careful.',
  variant: 'warning'
})

toast.showToast({
  title: 'Info',
  description: 'Here is some information.',
  variant: 'info'
})`
	},

	customization: `@layer base {
  :root {
    --toast-background-dark: hsla(240, 5.9%, 10%, 0.9);
    --toast-background-light: hsla(0, 0%, 98%, 0.9);
    --toast-backdrop-blur: 10px;
    --toast-border-radius: 8px;
    --toast-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    --toast-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    --toast-success-color: hsl(142, 71%, 45%);
    --toast-error-color: hsl(0, 84%, 60%);
    --toast-warning-color: hsl(38, 92%, 50%);
    --toast-info-color: hsl(217, 91%, 60%);
  }

  .dark,
  [data-theme="dark"] {
    --toast-background-dark: hsla(240, 5.9%, 10%, 0.9);
    --toast-background-light: hsla(0, 0%, 98%, 0.9);
    --toast-backdrop-blur: 10px;
    --toast-border-radius: 8px;
    --toast-shadow-dark: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    --toast-shadow-light: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    --toast-success-color: hsl(142, 71%, 45%);
    --toast-error-color: hsl(0, 84%, 60%);
    --toast-warning-color: hsl(38, 92%, 50%);
    --toast-info-color: hsl(217, 91%, 60%);
  }
}`
} as const
