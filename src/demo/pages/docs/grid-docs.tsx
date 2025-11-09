import type { Accessor, Component } from 'solid-js'
import { createSignal, For } from 'solid-js'
import { Grid } from '../../../components/ui/grid'
import { NumberInput } from '../../../components/ui/number-input'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'

interface GridDocsProps {
	isDark: Accessor<boolean>
}

export const GridDocs: Component<GridDocsProps> = props => {
	const [columns, setColumns] = createSignal(3)
	const [gap, setGap] = createSignal('16px')
	const [autoFit, setAutoFit] = createSignal(false)

	return (
		<article
			style={{
				width: '100%',
				'max-width': '700px',
				'box-sizing': 'border-box',
				margin: '0 auto',
				padding: '24px 0',
				color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
				overflow: 'hidden',
				'overflow-x': 'hidden'
			}}
		>
			<h1
				style={{
					'font-size': '1.75rem',
					'font-weight': '700',
					'margin-bottom': '12px',
					'line-height': '1.2'
				}}
			>
				Grid
			</h1>
			<p
				style={{
					'font-size': '0.95rem',
					color: props.isDark()
						? 'rgba(246, 246, 246, 0.7)'
						: 'rgba(26, 26, 26, 0.7)',
					'margin-bottom': '24px',
					'line-height': '1.6'
				}}
			>
				Full-featured responsive CSS Grid container component with resize
				observation, breakpoints, and auto-fit/auto-fill support.
			</p>

			{/* Installation */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Installation
				</h2>
				<CodeHighlight
					code={`import { Grid } from '@sapphiresolid/ui'`}
					isDark={props.isDark}
				/>
			</section>

			{/* Basic Usage */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Basic Usage
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<Grid columns={3} gap='12px' style={{ width: '100%' }}>
							<For each={Array.from({ length: 5 })}>
								{(_, i) => (
									<div
										style={{
											padding: '12px 16px',
											'border-radius': '6px',
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.05)'
												: 'rgba(0, 0, 0, 0.02)',
											border: `1px solid ${
												props.isDark()
													? 'rgba(255, 255, 255, 0.1)'
													: 'rgba(0, 0, 0, 0.1)'
											}`,
											'box-sizing': 'border-box'
										}}
									>
										<div
											style={{
												'font-size': '0.75rem',
												'font-weight': '500',
												margin: '0 0 4px 0',
												color: props.isDark()
													? 'rgba(246, 246, 246, 0.6)'
													: 'rgba(26, 26, 26, 0.6)'
											}}
										>
											Title
										</div>
										<div
											style={{
												'font-size': '1rem',
												'font-weight': '600',
												color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
											}}
										>
											KPI {i() + 1}
										</div>
									</div>
								)}
							</For>
						</Grid>
					}
					code={`<Grid columns={3} gap="16px">
  <div>
    <h3>Title</h3>
    <div>KPI 1</div>
  </div>
  <div>
    <h3>Title</h3>
    <div>KPI 2</div>
  </div>
  <div>
    <h3>Title</h3>
    <div>KPI 3</div>
  </div>
  <div>
    <h3>Title</h3>
    <div>KPI 4</div>
  </div>
  <div>
    <h3>Title</h3>
    <div>KPI 5</div>
  </div>
</Grid>`}
				/>
			</section>

			{/* Responsive Breakpoints */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Responsive Breakpoints
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ width: '100%' }}>
							<p
								style={{
									'font-size': '0.875rem',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.6)'
										: 'rgba(26, 26, 26, 0.6)',
									'margin-bottom': '16px'
								}}
							>
								Resize the window to see the grid adapt. On mobile (≤768px) it
								shows 1 column, on tablet (769-1024px) it shows 2 columns, and
								on desktop ({'>'}1024px) it shows 4 columns.
							</p>
							<Grid
								columns={4}
								breakpoints={[
									{ maxWidth: 768, columns: 1 },
									{ minWidth: 769, maxWidth: 1024, columns: 2 },
									{ minWidth: 1025, columns: 4 }
								]}
								gap='12px'
								style={{ width: '100%' }}
							>
								<For each={Array.from({ length: 8 })}>
									{(_, i) => (
										<div
											style={{
												padding: '12px 16px',
												'border-radius': '6px',
												background: props.isDark()
													? 'rgba(34, 197, 94, 0.1)'
													: 'rgba(34, 197, 94, 0.05)',
												border: `1px solid ${
													props.isDark()
														? 'rgba(34, 197, 94, 0.2)'
														: 'rgba(34, 197, 94, 0.15)'
												}`,
												'box-sizing': 'border-box'
											}}
										>
											<div
												style={{
													'font-size': '0.75rem',
													'font-weight': '500',
													margin: '0 0 4px 0',
													color: props.isDark()
														? 'rgba(246, 246, 246, 0.6)'
														: 'rgba(26, 26, 26, 0.6)'
												}}
											>
												Title
											</div>
											<div
												style={{
													'font-size': '1rem',
													'font-weight': '600',
													color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
												}}
											>
												KPI {i() + 1}
											</div>
										</div>
									)}
								</For>
							</Grid>
						</div>
					}
					code={`<Grid
  columns={4}
  breakpoints={[
    { maxWidth: 768, columns: 1 },
    { minWidth: 769, maxWidth: 1024, columns: 2 },
    { minWidth: 1025, columns: 4 }
  ]}
  gap="16px"
>
  {/* Grid items */}
</Grid>`}
				/>
			</section>

			{/* Auto-fit with Min/Max Width */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Auto-fit with Min/Max Width
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={{ width: '100%' }}>
							<div
								style={{
									display: 'flex',
									gap: '12px',
									'margin-bottom': '16px',
									'flex-wrap': 'wrap',
									'align-items': 'center'
								}}
							>
								<label
									style={{
										display: 'flex',
										'align-items': 'center',
										gap: '8px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
										'font-size': '0.875rem'
									}}
								>
									<input
										type='checkbox'
										checked={autoFit()}
										onChange={e => setAutoFit(e.currentTarget.checked)}
										style={{ cursor: 'pointer' }}
									/>
									Auto-fit
								</label>
								<label
									style={{
										display: 'flex',
										'align-items': 'center',
										gap: '8px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
										'font-size': '0.875rem'
									}}
								>
									Columns:
									<NumberInput
										value={columns()}
										onChange={val => {
											const num =
												typeof val === 'number'
													? val
													: parseInt(String(val), 10)
											if (!isNaN(num) && num >= 1 && num <= 6) {
												setColumns(num)
											}
										}}
										onInput={e => {
											const target = e.currentTarget as HTMLInputElement
											if (target) {
												const val = parseInt(target.value, 10)
												if (!isNaN(val) && val >= 1 && val <= 6) {
													setColumns(val)
												}
											}
										}}
										min={1}
										max={6}
										step={1}
										enableWheel={true}
										showArrows={true}
										style={{
											border: `1px solid ${
												props.isDark()
													? 'rgba(255, 255, 255, 0.1)'
													: 'rgba(0, 0, 0, 0.1)'
											}`,
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.05)'
												: 'rgba(0, 0, 0, 0.02)',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
										onFocus={e => {
											const target = e.currentTarget as HTMLInputElement
											if (target) {
												target.style.borderColor = props.isDark()
													? 'rgba(59, 130, 246, 0.5)'
													: 'rgba(59, 130, 246, 0.3)'
											}
										}}
										onBlur={e => {
											const target = e.currentTarget as HTMLInputElement
											if (target) {
												target.style.borderColor = props.isDark()
													? 'rgba(255, 255, 255, 0.1)'
													: 'rgba(0, 0, 0, 0.1)'
											}
										}}
									/>
								</label>
								<label
									style={{
										display: 'flex',
										'align-items': 'center',
										gap: '8px',
										color: props.isDark() ? '#f6f6f6' : '#1a1a1a',
										'font-size': '0.875rem'
									}}
								>
									Gap:
									<NumberInput
										value={gap()}
										onChange={val => setGap(String(val))}
										type='text'
										step={1}
										enableWheel={true}
										showArrows={true}
										onInput={e => {
											const target = e.currentTarget as HTMLInputElement
											if (target) {
												setGap(target.value)
											}
										}}
										style={{
											border: `1px solid ${
												props.isDark()
													? 'rgba(255, 255, 255, 0.1)'
													: 'rgba(0, 0, 0, 0.1)'
											}`,
											background: props.isDark()
												? 'rgba(255, 255, 255, 0.05)'
												: 'rgba(0, 0, 0, 0.02)',
											color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
										}}
										onFocus={e => {
											const target = e.currentTarget as HTMLInputElement
											if (target) {
												target.style.borderColor = props.isDark()
													? 'rgba(59, 130, 246, 0.5)'
													: 'rgba(59, 130, 246, 0.3)'
											}
										}}
										onBlur={e => {
											const target = e.currentTarget as HTMLInputElement
											if (target) {
												// Validate gap value
												const val = target.value.trim()
												if (val && /^\d+px$/.test(val)) {
													setGap(val)
												} else if (val && /^\d+$/.test(val)) {
													setGap(`${val}px`)
												} else if (!val) {
													setGap('16px')
												}
												target.style.borderColor = props.isDark()
													? 'rgba(255, 255, 255, 0.1)'
													: 'rgba(0, 0, 0, 0.1)'
											}
										}}
									/>
								</label>
							</div>
							<Grid
								columns={columns()}
								minColumnWidth='150px'
								maxColumnWidth='1fr'
								autoFit={autoFit()}
								gap={gap()}
								style={{ width: '100%' }}
							>
								<For each={Array.from({ length: 6 })}>
									{(_, i) => (
										<div
											style={{
												padding: '12px 16px',
												'border-radius': '6px',
												background: props.isDark()
													? 'rgba(168, 85, 247, 0.1)'
													: 'rgba(168, 85, 247, 0.05)',
												border: `1px solid ${
													props.isDark()
														? 'rgba(168, 85, 247, 0.2)'
														: 'rgba(168, 85, 247, 0.15)'
												}`,
												'box-sizing': 'border-box',
												display: 'flex',
												'flex-direction': 'column',
												'justify-content': 'center'
											}}
										>
											<div
												style={{
													'font-size': '0.75rem',
													'font-weight': '500',
													margin: '0 0 4px 0',
													color: props.isDark()
														? 'rgba(246, 246, 246, 0.6)'
														: 'rgba(26, 26, 26, 0.6)'
												}}
											>
												Title
											</div>
											<div
												style={{
													'font-size': '1rem',
													'font-weight': '600',
													color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
												}}
											>
												KPI {i() + 1}
											</div>
										</div>
									)}
								</For>
							</Grid>
						</div>
					}
					code={`<Grid
  columns={3}
  minColumnWidth="150px"
  maxColumnWidth="1fr"
  autoFit={false}
  gap="16px"
>
  {/* Grid items */}
</Grid>`}
				/>
			</section>

			{/* Gap as Object */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Separate Row and Column Gap
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<Grid
							columns={3}
							gap={{ row: '16px', column: '12px' }}
							style={{ width: '100%' }}
						>
							<For each={Array.from({ length: 6 })}>
								{(_, i) => (
									<div
										style={{
											padding: '12px 16px',
											'border-radius': '6px',
											background: props.isDark()
												? 'rgba(236, 72, 153, 0.1)'
												: 'rgba(236, 72, 153, 0.05)',
											border: `1px solid ${
												props.isDark()
													? 'rgba(236, 72, 153, 0.2)'
													: 'rgba(236, 72, 153, 0.15)'
											}`,
											'box-sizing': 'border-box'
										}}
									>
										<div
											style={{
												'font-size': '0.75rem',
												'font-weight': '500',
												margin: '0 0 4px 0',
												color: props.isDark()
													? 'rgba(246, 246, 246, 0.6)'
													: 'rgba(26, 26, 26, 0.6)'
											}}
										>
											Title
										</div>
										<div
											style={{
												'font-size': '1rem',
												'font-weight': '600',
												color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
											}}
										>
											KPI {i() + 1}
										</div>
									</div>
								)}
							</For>
						</Grid>
					}
					code={`<Grid
  columns={3}
  gap={{ row: "24px", column: "12px" }}
>
  {/* Grid items */}
</Grid>`}
				/>
			</section>

			{/* Custom CSS Template */}
			<section style={{ 'margin-bottom': '32px' }}>
				<h2
					style={{
						'font-size': '1.25rem',
						'font-weight': '600',
						'margin-bottom': '12px',
						'line-height': '1.3',
						color: props.isDark() ? '#f6f6f6' : '#1a1a1a'
					}}
				>
					Custom CSS Template
				</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<Grid
							columns='200px 1fr auto'
							rows='auto 1fr auto'
							gap='12px'
							style={{ width: '100%', 'min-height': '250px' }}
						>
							<div
								style={{
									padding: '12px 16px',
									'border-radius': '6px',
									background: props.isDark()
										? 'rgba(59, 130, 246, 0.1)'
										: 'rgba(59, 130, 246, 0.05)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(59, 130, 246, 0.2)'
											: 'rgba(59, 130, 246, 0.15)'
									}`,
									'grid-column': '1 / -1',
									'box-sizing': 'border-box',
									'font-size': '0.875rem'
								}}
							>
								Header (full width)
							</div>
							<div
								style={{
									padding: '12px 16px',
									'border-radius': '6px',
									background: props.isDark()
										? 'rgba(34, 197, 94, 0.1)'
										: 'rgba(34, 197, 94, 0.05)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(34, 197, 94, 0.2)'
											: 'rgba(34, 197, 94, 0.15)'
									}`,
									'box-sizing': 'border-box',
									'font-size': '0.875rem'
								}}
							>
								Sidebar (200px)
							</div>
							<div
								style={{
									padding: '12px 16px',
									'border-radius': '6px',
									background: props.isDark()
										? 'rgba(168, 85, 247, 0.1)'
										: 'rgba(168, 85, 247, 0.05)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(168, 85, 247, 0.2)'
											: 'rgba(168, 85, 247, 0.15)'
									}`,
									'box-sizing': 'border-box',
									'font-size': '0.875rem'
								}}
							>
								Main Content (flexible)
							</div>
							<div
								style={{
									padding: '12px 16px',
									'border-radius': '6px',
									background: props.isDark()
										? 'rgba(236, 72, 153, 0.1)'
										: 'rgba(236, 72, 153, 0.05)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(236, 72, 153, 0.2)'
											: 'rgba(236, 72, 153, 0.15)'
									}`,
									'box-sizing': 'border-box',
									'font-size': '0.875rem'
								}}
							>
								Actions (auto)
							</div>
							<div
								style={{
									padding: '12px 16px',
									'border-radius': '6px',
									background: props.isDark()
										? 'rgba(251, 146, 60, 0.1)'
										: 'rgba(251, 146, 60, 0.05)',
									border: `1px solid ${
										props.isDark()
											? 'rgba(251, 146, 60, 0.2)'
											: 'rgba(251, 146, 60, 0.15)'
									}`,
									'grid-column': '1 / -1',
									'box-sizing': 'border-box',
									'font-size': '0.875rem'
								}}
							>
								Footer (full width)
							</div>
						</Grid>
					}
					code={`<Grid
  columns="200px 1fr auto"
  rows="auto 1fr auto"
  gap="16px"
>
  <div style={{ gridColumn: "1 / -1" }}>Header</div>
  <div>Sidebar</div>
  <div>Main Content</div>
  <div>Actions</div>
  <div style={{ gridColumn: "1 / -1" }}>Footer</div>
</Grid>`}
				/>
			</section>
		</article>
	)
}
