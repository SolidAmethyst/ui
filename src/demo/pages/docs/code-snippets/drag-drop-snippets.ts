/**
 * Code examples for DragDrop component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const dragDropSnippets = {
	imports: `import { DragDrop, type DragDropItem } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `const items: DragDropItem[] = [
  { id: '1', content: <div>Item 1</div> },
  { id: '2', content: <div>Item 2</div> },
  { id: '3', content: <div>Item 3</div> }
]

<DragDrop items={items} />`,

		withCallbacks: `const items: DragDropItem[] = [
  { id: '1', content: <div>Item 1</div> },
  { id: '2', content: <div>Item 2</div> }
]

<DragDrop
  items={items}
  onDragStart={(item, index) => console.log('Drag started:', item.id)}
  onDrop={(item, fromIndex, toIndex) => {
    console.log(\`Moved from \${fromIndex} to \${toIndex}\`)
  }}
  onDragEnd={(item, index) => console.log('Drag ended')}
/>`,

		horizontal: `const items: DragDropItem[] = [
  { id: '1', content: <div>Item 1</div> },
  { id: '2', content: <div>Item 2</div> },
  { id: '3', content: <div>Item 3</div> }
]

<DragDrop items={items} orientation="horizontal" />`,

		disabled: `const items: DragDropItem[] = [
  { id: '1', content: <div>Item 1</div> },
  { id: '2', content: <div>Item 2</div>, disabled: true },
  { id: '3', content: <div>Item 3</div> }
]

<DragDrop items={items} disabled={false} />`,

		customGap: `const items: DragDropItem[] = [
  { id: '1', content: <div>Item 1</div> },
  { id: '2', content: <div>Item 2</div> }
]

<DragDrop items={items} gap="16px" />`,

		customRender: `const items: DragDropItem[] = [
  { id: '1', content: <div>Item 1</div>, data: { title: 'First' } },
  { id: '2', content: <div>Item 2</div>, data: { title: 'Second' } }
]

<DragDrop
  items={items}
  renderItem={(item, index, isDragging) => (
    <div style={{ opacity: isDragging ? 0.5 : 1 }}>
      <strong>{item.data?.title}</strong>
      {item.content}
    </div>
  )}
/>`
	},

	customization: `@layer base {
  :root {
    --drag-drop-item-padding: 12px 16px;
    --drag-drop-item-border-radius: 8px;
    --drag-drop-item-bg-light: 0 0 0 / 0.02;
    --drag-drop-item-border-light: 0 0 0 / 0.1;
    --drag-drop-item-drag-bg-light: 0 0 0 / 0.05;
    --drag-drop-item-over-bg-light: 0 0 0 / 0.04;
    /* Over border and indicator use primary color */
    --drag-drop-item-over-border-light: var(--primary) / 0.3;
    --drag-drop-indicator-color-light: var(--primary);
    --drag-drop-handle-color-light: var(--primary) / 0.4;
  }

  .dark,
  [data-theme="dark"] {
    --drag-drop-item-bg-dark: 255 255 255 / 0.05;
    --drag-drop-item-border-dark: 255 255 255 / 0.1;
    --drag-drop-item-drag-bg-dark: 255 255 255 / 0.1;
    --drag-drop-item-over-bg-dark: 255 255 255 / 0.08;
    /* Over border and indicator use primary color */
    --drag-drop-item-over-border-dark: var(--primary) / 0.5;
    --drag-drop-indicator-color-dark: var(--primary);
    --drag-drop-handle-color-dark: var(--primary) / 0.4;
  }
}`
} as const
