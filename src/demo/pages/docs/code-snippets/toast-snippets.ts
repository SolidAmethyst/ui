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
}`
	}
} as const

