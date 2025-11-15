import { Accessor, Component, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { DragDrop, type DragDropItem } from '../../../components/ui/drag-drop'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { dragDropSnippets } from './code-snippets/drag-drop-snippets'

interface DragDropDocsProps {
	isDark: Accessor<boolean>
}

export const DragDropDocs: Component<DragDropDocsProps> = props => {
	const [basicItems, setBasicItems] = createSignal<DragDropItem[]>([
		{ id: '1', content: <div>Item 1</div> },
		{ id: '2', content: <div>Item 2</div> },
		{ id: '3', content: <div>Item 3</div> }
	])

	const [horizontalItems] = createSignal<DragDropItem[]>([
		{ id: '1', content: <div>Item 1</div> },
		{ id: '2', content: <div>Item 2</div> },
		{ id: '3', content: <div>Item 3</div> }
	])

	const [disabledItems] = createSignal<DragDropItem[]>([
		{ id: '1', content: <div>Item 1</div> },
		{ id: '2', content: <div>Item 2 (Disabled)</div>, disabled: true },
		{ id: '3', content: <div>Item 3</div> }
	])

	const [customItems] = createSignal<DragDropItem[]>([
		{ id: '1', content: <div>Item 1</div>, data: { title: 'First Item' } },
		{ id: '2', content: <div>Item 2</div>, data: { title: 'Second Item' } },
		{ id: '3', content: <div>Item 3</div>, data: { title: 'Third Item' } }
	])

	const handleDrop = (
		item: DragDropItem,
		fromIndex: number,
		toIndex: number
	) => {
		const newItems = [...basicItems()]
		const [removed] = newItems.splice(fromIndex, 1)
		newItems.splice(toIndex, 0, removed)
		setBasicItems(newItems)
	}

	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				DragDrop
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Drag and drop component for creating reorderable lists. Supports both
				vertical and horizontal orientations, custom rendering, and full control
				over drag and drop behavior.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={dragDropSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<DragDrop
									items={basicItems()}
									isDark={props.isDark()}
									onDrop={handleDrop}
								/>
							</div>
						</div>
					}
					code={dragDropSnippets.usage.basicUsage}
				/>
			</section>

			{/* With Callbacks */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					With Callbacks
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<DragDrop
									items={basicItems()}
									isDark={props.isDark()}
									onDragStart={(item, index) =>
										console.log('Drag started:', item.id, index)
									}
									onDrop={(item, fromIndex, toIndex) => {
										console.log(`Moved from ${fromIndex} to ${toIndex}`)
										handleDrop(item, fromIndex, toIndex)
									}}
									onDragEnd={(item, index) =>
										console.log('Drag ended:', item.id, index)
									}
								/>
							</div>
						</div>
					}
					code={dragDropSnippets.usage.withCallbacks}
				/>
			</section>

			{/* Horizontal Orientation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Horizontal Orientation
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<DragDrop
									items={horizontalItems()}
									orientation='horizontal'
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={dragDropSnippets.usage.horizontal}
				/>
			</section>

			{/* Disabled Items */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Disabled Items
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<DragDrop items={disabledItems()} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={dragDropSnippets.usage.disabled}
				/>
			</section>

			{/* Custom Gap */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Custom Gap
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<DragDrop
									items={basicItems()}
									gap='16px'
									isDark={props.isDark()}
								/>
							</div>
						</div>
					}
					code={dragDropSnippets.usage.customGap}
				/>
			</section>

			{/* Custom Render */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Custom Render Function
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto'
								}}
							>
								<DragDrop
									items={customItems()}
									isDark={props.isDark()}
									renderItem={(item, index, isDragging) => (
										<div
											style={{
												width: '100%',
												opacity: isDragging ? 0.5 : 1,
												transition: 'opacity 0.2s ease'
											}}
										>
											<strong
												style={{
													display: 'block',
													'margin-bottom': '4px',
													color: 'hsl(var(--foreground))'
												}}
											>
												{(item.data as { title: string })?.title ||
													`Item ${index + 1}`}
											</strong>
											{item.content}
										</div>
									)}
								/>
							</div>
						</div>
					}
					code={dragDropSnippets.usage.customRender}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The DragDrop component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={dragDropSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The DragDrop component automatically uses these CSS variables. You can
					override them in your application to match your design system. The
					component uses primary color for borders, indicators, and drag handles
					when items are being dragged or hovered over.
				</Typography>
			</section>
		</article>
	)
}
