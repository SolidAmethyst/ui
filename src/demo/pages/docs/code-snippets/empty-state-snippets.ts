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
/>`,

		variants: `<EmptyState icon="inbox" title="No items" />

<EmptyState icon="search_off" title="No results" description="Try different search terms" />

<EmptyState icon="folder_open" title="Empty folder" action={<Button>Upload</Button>} />`
	},

	customization: `@layer base {
  :root {
    --empty-state-padding: 48px 24px;
    --empty-state-icon-size: 64px;
    --empty-state-icon-color-dark: rgba(255, 255, 255, 0.3);
    --empty-state-icon-color-light: rgba(0, 0, 0, 0.3);
    --empty-state-title-size: 18px;
    --empty-state-title-weight: 600;
    --empty-state-description-size: 14px;
    --empty-state-gap: 16px;
  }

  .dark,
  [data-theme="dark"] {
    --empty-state-padding: 48px 24px;
    --empty-state-icon-size: 64px;
    --empty-state-icon-color-dark: rgba(255, 255, 255, 0.3);
    --empty-state-icon-color-light: rgba(0, 0, 0, 0.3);
    --empty-state-title-size: 18px;
    --empty-state-title-weight: 600;
    --empty-state-description-size: 14px;
    --empty-state-gap: 16px;
  }
}`
} as const
