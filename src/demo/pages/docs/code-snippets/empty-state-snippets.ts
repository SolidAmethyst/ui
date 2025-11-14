/**
 * EmptyState Component Code Snippets
 */

export const emptyStateSnippets = {
	imports: `import { EmptyState } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `<EmptyState
  icon="inbox"
  title="No items"
  description="There are no items to display"
  action={<Button>Add Item</Button>}
/>`
	}
} as const

