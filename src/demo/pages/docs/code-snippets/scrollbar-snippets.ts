/**
 * Code examples for Scrollbar component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const scrollbarSnippets = {
	imports: `import { Scrollbar, ScrollbarProvider } from '@sapphiresolid/ui'`,

	usage: {
		verticalScrollbar: `<ScrollbarProvider>
  <Scrollbar direction="vertical" showArrows={true}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    {/* ... more items */}
  </Scrollbar>
</ScrollbarProvider>`,

		horizontalScrollbar: `<ScrollbarProvider>
  <Scrollbar direction="horizontal" showArrows={true}>
    <div style={{ display: 'flex', gap: '16px' }}>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
      {/* ... more cards */}
    </div>
  </Scrollbar>
</ScrollbarProvider>`
	},

	customization: `@layer base {
  :root {
    --scrollbar-thumb: 0 0% 100% / 0.3;
    --scrollbar-thumb-hover: 0 0% 100% / 0.5;
    --scrollbar-thumb-active: 0 0% 100% / 0.7;
    --scrollbar-arrow: 0 0% 100%;
    /* Arrow hover uses primary color */
    --scrollbar-arrow-hover: var(--primary);
    --scrollbar-arrow-active: var(--primary);
    --scrollbar-arrow-disabled: 0 0% 100% / 0.3;
  }

  .dark,
  [data-theme="dark"] {
    --scrollbar-thumb: 0 0% 100% / 0.3;
    --scrollbar-thumb-hover: 0 0% 100% / 0.5;
    --scrollbar-thumb-active: 0 0% 100% / 0.7;
    --scrollbar-arrow: 0 0% 100%;
    /* Arrow hover uses primary color */
    --scrollbar-arrow-hover: var(--primary);
    --scrollbar-arrow-active: var(--primary);
    --scrollbar-arrow-disabled: 0 0% 100% / 0.3;
  }
}`
} as const
