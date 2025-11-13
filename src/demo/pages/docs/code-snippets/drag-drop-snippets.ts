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
	}
} as const
