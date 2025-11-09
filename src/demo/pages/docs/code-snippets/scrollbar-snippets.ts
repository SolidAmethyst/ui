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
	}
} as const
