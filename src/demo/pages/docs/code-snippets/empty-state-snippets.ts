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

<EmptyState icon="folder_open" title="Empty folder" action={<Button>Upload</Button>} />`,
  },

  customization: `@layer base {
  :root {
    /* EmptyState component sizing */
    --empty-state-padding: 48px 24px;
    --empty-state-icon-size: 64px;
    --empty-state-title-size: 18px;
    --empty-state-gap: 16px;
  }

  [data-theme="dark"] {
    /* EmptyState uses same sizing in dark theme */
    --empty-state-padding: 48px 24px;
  }
}`,
} as const;
