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
})`,
  },

  customization: `@layer base {
  :root {
    /* Toast component styling */
    --toast-backdrop-blur: 10px;
    --toast-border-radius: 8px;
  }

  [data-theme="dark"] {
    /* Toast uses same values in dark theme */
    --toast-backdrop-blur: 10px;
  }
}`,
} as const;
