import { Accessor, Component, createSignal, For } from 'solid-js'
import { Checkbox } from '../../../components/ui/checkbox'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Grid } from '../../../components/ui/grid'
import { NumberInput } from '../../../components/ui/number-input'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { gridSnippets } from './code-snippets/grid-snippets'

interface GridDocsProps {
	isDark: Accessor<boolean>
}

export const GridDocs: Component<GridDocsProps> = props => {
	// Auto-fit example signals
	const [columns, setColumns] = createSignal(3)
	const [gap, setGap] = createSignal('16px')
	const [autoFit, setAutoFit] = createSignal(false)

	// Basic Usage signals
	const [basicColumns, setBasicColumns] = createSignal(3)
	const [basicGap, setBasicGap] = createSignal('12px')
	const [basicAutoFit, setBasicAutoFit] = createSignal(false)

	// Responsive Breakpoints signals
	const [responsiveGap, setResponsiveGap] = createSignal('12px')

	// Separate Gap signals
	const [separateGap, setSeparateGap] = createSignal({
		row: '16px',
		column: '12px'
	})
	const [separateColumns, setSeparateColumns] = createSignal(3)
	const [separateAutoFit, setSeparateAutoFit] = createSignal(false)

	// Custom CSS Template signals
	const [customGap, setCustomGap] = createSignal('12px')

	// Preserve Area signals - 0% = full width (sidebar closed), 100% = narrow (sidebar open)
	const [sidebarAmount, setSidebarAmount] = createSignal(0) // Start wide for proper initialization
	const contentWidth = () => 100 - sidebarAmount() * 0.4 // 0% = 100%, 100% = 60%

	// Preserve Area Complex Example signals
	const [sidebarAmount2, setSidebarAmount2] = createSignal(0)
	const contentWidth2 = () => 100 - sidebarAmount2() * 0.4

	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Grid
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Full-featured responsive CSS Grid container component with resize
				observation, breakpoints, and auto-fit/auto-fill support.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={gridSnippets.imports} isDark={props.isDark} />
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
									<Checkbox
										label='Auto-fit'
										checked={basicAutoFit()}
										onChange={setBasicAutoFit}
										isDark={props.isDark()}
									/>
									<label
										style={{
											display: 'flex',
											'align-items': 'center',
											gap: '8px',
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Columns:
										<NumberInput
											value={basicColumns()}
											onChange={val => {
												const num =
													typeof val === 'number'
														? val
														: parseInt(String(val), 10)
												if (!isNaN(num) && num >= 1 && num <= 6) {
													setBasicColumns(num)
												}
											}}
											onInput={e => {
												const target = e.currentTarget as HTMLInputElement
												if (target) {
													const val = parseInt(target.value, 10)
													if (!isNaN(val) && val >= 1 && val <= 6) {
														setBasicColumns(val)
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
												color: 'hsl(var(--foreground))'
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
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Gap:
										<NumberInput
											value={basicGap()}
											onChange={val => setBasicGap(String(val))}
											type='text'
											step={1}
											min={0}
											defaultUnit='px'
											enableWheel={true}
											showArrows={true}
											themeAware={true}
											autoValidate={true}
										/>
									</label>
								</div>
								<Grid
									columns={basicAutoFit() ? undefined : basicColumns()}
									autoFit={basicAutoFit()}
									minColumnWidth={basicAutoFit() ? '150px' : undefined}
									maxColumnWidth={basicAutoFit() ? '1fr' : undefined}
									gap={basicGap()}
									style={{ width: '100%' }}
								>
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
														color: 'hsl(var(--foreground))'
													}}
												>
													KPI {i() + 1}
												</div>
											</div>
										)}
									</For>
								</Grid>
							</div>
						</div>
					}
					code={gridSnippets.usage.basicUsage}
				/>
			</section>

			{/* Responsive Breakpoints */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Responsive Breakpoints
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
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
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Gap:
										<NumberInput
											value={responsiveGap()}
											onChange={val => setResponsiveGap(String(val))}
											type='text'
											step={1}
											min={0}
											defaultUnit='px'
											enableWheel={true}
											showArrows={true}
											themeAware={true}
											autoValidate={true}
										/>
									</label>
								</div>
								<Typography
									variant='small'
									isDark={props.isDark()}
									style={{ 'margin-bottom': '16px' }}
								>
									Resize the window to see the grid adapt. On mobile (≤768px) it
									shows 1 column, on tablet (769-1024px) it shows 2 columns, and
									on desktop ({'>'}1024px) it shows 4 columns.
								</Typography>
								<Grid
									columns={4}
									breakpoints={[
										{ maxWidth: 768, columns: 1 },
										{ minWidth: 769, maxWidth: 1024, columns: 2 },
										{ minWidth: 1025, columns: 4 }
									]}
									gap={responsiveGap()}
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
														color: 'hsl(var(--foreground))'
													}}
												>
													KPI {i() + 1}
												</div>
											</div>
										)}
									</For>
								</Grid>
							</div>
						</div>
					}
					code={gridSnippets.usage.responsiveBreakpoints}
				/>
			</section>

			{/* Auto-fit with Min/Max Width */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Auto-fit with Min/Max Width
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
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
									<Checkbox
										label='Auto-fit'
										checked={autoFit()}
										onChange={setAutoFit}
										isDark={props.isDark()}
									/>
									<label
										style={{
											display: 'flex',
											'align-items': 'center',
											gap: '8px',
											color: 'hsl(var(--foreground))',
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
												color: 'hsl(var(--foreground))'
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
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Gap:
										<NumberInput
											value={gap()}
											onChange={val => setGap(String(val))}
											type='text'
											step={1}
											min={0}
											defaultUnit='px'
											enableWheel={true}
											showArrows={true}
											themeAware={true}
											autoValidate={true}
										/>
									</label>
								</div>
								<Grid
									columns={autoFit() ? undefined : columns()}
									minColumnWidth={autoFit() ? '150px' : undefined}
									maxColumnWidth={autoFit() ? '1fr' : undefined}
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
														color: 'hsl(var(--foreground))'
													}}
												>
													KPI {i() + 1}
												</div>
											</div>
										)}
									</For>
								</Grid>
							</div>
						</div>
					}
					code={gridSnippets.usage.autoFitMinMax}
				/>
			</section>

			{/* Gap as Object */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Separate Row and Column Gap
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
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
									<Checkbox
										label='Auto-fit'
										checked={separateAutoFit()}
										onChange={setSeparateAutoFit}
										isDark={props.isDark()}
									/>
									<label
										style={{
											display: 'flex',
											'align-items': 'center',
											gap: '8px',
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Columns:
										<NumberInput
											value={separateColumns()}
											onChange={val => {
												const num =
													typeof val === 'number'
														? val
														: parseInt(String(val), 10)
												if (!isNaN(num) && num >= 1 && num <= 6) {
													setSeparateColumns(num)
												}
											}}
											onInput={e => {
												const target = e.currentTarget as HTMLInputElement
												if (target) {
													const val = parseInt(target.value, 10)
													if (!isNaN(val) && val >= 1 && val <= 6) {
														setSeparateColumns(val)
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
												color: 'hsl(var(--foreground))'
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
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Row Gap:
										<NumberInput
											value={separateGap().row}
											onChange={val => {
												// Handle changes from arrows and wheel
												if (typeof val === 'string') {
													setSeparateGap({ ...separateGap(), row: val })
												} else {
													// Number from wheel/arrows - preserve unit
													const current = separateGap().row
													const unit = current.replace(/^-?\d+/, '') || 'px'
													setSeparateGap({
														...separateGap(),
														row: `${val}${unit}`
													})
												}
											}}
											type='text'
											step={1}
											min={0}
											defaultUnit='px'
											enableWheel={true}
											showArrows={true}
											themeAware={true}
											autoValidate={true}
										/>
									</label>
									<label
										style={{
											display: 'flex',
											'align-items': 'center',
											gap: '8px',
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Column Gap:
										<NumberInput
											value={separateGap().column}
											onChange={val => {
												// Handle changes from arrows and wheel
												if (typeof val === 'string') {
													setSeparateGap({ ...separateGap(), column: val })
												} else {
													// Number from wheel/arrows - preserve unit
													const current = separateGap().column
													const unit = current.replace(/^-?\d+/, '') || 'px'
													setSeparateGap({
														...separateGap(),
														column: `${val}${unit}`
													})
												}
											}}
											type='text'
											step={1}
											min={0}
											defaultUnit='px'
											enableWheel={true}
											showArrows={true}
											themeAware={true}
											autoValidate={true}
										/>
									</label>
								</div>
								<Grid
									columns={separateAutoFit() ? undefined : separateColumns()}
									autoFit={separateAutoFit()}
									minColumnWidth={separateAutoFit() ? '150px' : undefined}
									maxColumnWidth={separateAutoFit() ? '1fr' : undefined}
									gap={separateGap()}
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
														color: 'hsl(var(--foreground))'
													}}
												>
													KPI {i() + 1}
												</div>
											</div>
										)}
									</For>
								</Grid>
							</div>
						</div>
					}
					code={gridSnippets.usage.separateGap}
				/>
			</section>

			{/* Custom CSS Template */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Custom CSS Template
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
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
											color: 'hsl(var(--foreground))',
											'font-size': '0.875rem'
										}}
									>
										Gap:
										<NumberInput
											value={customGap()}
											onChange={val => setCustomGap(String(val))}
											type='text'
											step={1}
											min={0}
											defaultUnit='px'
											enableWheel={true}
											showArrows={true}
											themeAware={true}
											autoValidate={true}
										/>
									</label>
								</div>
								<Grid
									columns='200px 1fr auto'
									rows='auto 1fr auto'
									gap={customGap()}
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
							</div>
						</div>
					}
					code={gridSnippets.usage.customCSSTemplate}
				/>
			</section>

			{/* Preserve Area Mode */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Preserve Area Mode
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The Grid component can preserve element area when resizing. Mark
					priority elements with `data-preserve-area="true"` - they'll maintain
					constant area by adjusting height when width changes. Perfect for
					dashboards and responsive layouts.
				</Typography>
				<Typography
					variant='small'
					isDark={props.isDark()}
					style={{ 'margin-top': '8px' }}
				>
					Move the slider left to close the sidebar (wider content) and watch
					Card 4 shrink in height while maintaining its total area.
				</Typography>

				<div
					style={{
						margin: '16px 0',
						padding: '16px 20px',
						'border-radius': '8px',
						background: props.isDark()
							? 'rgba(255, 255, 255, 0.05)'
							: 'rgba(0, 0, 0, 0.02)',
						border: `1px solid ${
							props.isDark()
								? 'rgba(255, 255, 255, 0.08)'
								: 'rgba(0, 0, 0, 0.06)'
						}`
					}}
				>
					<div
						style={{
							display: 'flex',
							'align-items': 'center',
							gap: '20px',
							color: 'hsl(var(--foreground))',
							'font-size': '0.875rem'
						}}
					>
						<span
							style={{
								'flex-shrink': '0',
								'min-width': '60px',
								'font-weight': '500',
								opacity: '0.7'
							}}
						>
							Sidebar
						</span>
						<input
							type='range'
							min={0}
							max={100}
							step={1}
							value={sidebarAmount()}
							onInput={e => setSidebarAmount(parseInt(e.currentTarget.value))}
							style={{
								flex: '1',
								cursor: 'pointer'
							}}
						/>
						<div
							style={{
								display: 'flex',
								gap: '16px',
								'flex-shrink': '0',
								'align-items': 'center'
							}}
						>
							<span
								style={{
									'min-width': '42px',
									'text-align': 'right',
									'font-weight': '600',
									'font-size': '0.9375rem',
									'font-family': 'ui-monospace, monospace',
									color: 'hsl(var(--accent))'
								}}
							>
								{sidebarAmount()}%
							</span>
							<span
								style={{
									'min-width': '1px',
									height: '16px',
									background: props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}}
							/>
							<span
								style={{
									'min-width': '90px',
									opacity: '0.6',
									'font-size': '0.8125rem',
									'font-family': 'ui-monospace, monospace'
								}}
							>
								width: {Math.round(contentWidth())}%
							</span>
						</div>
					</div>
				</div>

				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: `${contentWidth()}%`,
									height: '500px',
									display: 'flex',
									'flex-direction': 'column'
								}}
							>
								<Grid
									columns='repeat(3, minmax(0, 1fr))'
									rows='1fr 1fr'
									gap='4px'
									preserveArea={{
										selector: '[data-preserve-area="true"]',
										minHeight: 200,
										constraints: [
											{
												selector: ':not([data-preserve-area="true"])',
												minHeight: 80
											}
										]
									}}
									style={{
										flex: '1 1 0',
										width: '100%',
										height: '100%',
										'box-sizing': 'border-box',
										'min-height': '0',
										'min-width': '0',
										overflow: 'hidden'
									}}
								>
									<For each={Array.from({ length: 4 })}>
										{(_, i) => (
											<div
												data-preserve-area={i() === 3 ? 'true' : undefined}
												style={{
													padding: '16px',
													'border-radius': '6px',
													background:
														i() === 3
															? props.isDark()
																? 'rgba(59, 130, 246, 0.15)'
																: 'rgba(59, 130, 246, 0.1)'
															: props.isDark()
																? 'rgba(255, 255, 255, 0.05)'
																: 'rgba(0, 0, 0, 0.02)',
													border: `1px solid ${
														i() === 3
															? props.isDark()
																? 'rgba(59, 130, 246, 0.3)'
																: 'rgba(59, 130, 246, 0.2)'
															: props.isDark()
																? 'rgba(255, 255, 255, 0.1)'
																: 'rgba(0, 0, 0, 0.1)'
													}`,
													'grid-column': i() === 3 ? '1 / -1' : 'auto',
													'grid-row': i() === 3 ? '2' : '1',
													display: 'flex',
													'flex-direction': 'column',
													'align-items': i() === 3 ? 'flex-start' : 'center',
													'justify-content':
														i() === 3 ? 'flex-start' : 'center',
													'box-sizing': 'border-box'
												}}
											>
												<div
													style={{
														'font-size': '0.875rem',
														'font-weight': '600',
														color: 'hsl(var(--foreground))',
														'margin-bottom': '4px'
													}}
												>
													Card {i() + 1}
													{i() === 3 && ' (Priority)'}
												</div>
												<div
													style={{
														'font-size': '0.75rem',
														color: props.isDark()
															? 'rgba(246, 246, 246, 0.6)'
															: 'rgba(26, 26, 26, 0.6)'
													}}
												>
													{i() === 3
														? 'Preserves area on resize'
														: 'Content area'}
												</div>
											</div>
										)}
									</For>
								</Grid>
							</div>
						</div>
					}
					code={gridSnippets.usage.preserveArea}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					Move the slider to simulate sidebar opening (0% = closed, 100% =
					open). As content area narrows, Card 4 (Priority) grows taller to
					maintain its area, while Cards 1-3 shrink. This demonstrates how
					priority elements preserve screen real estate in responsive layouts.
				</Typography>

				<Typography
					variant='h4'
					as='h3'
					isDark={props.isDark()}
					style={{ 'margin-top': '32px' }}
				>
					Complex Layout Example
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					More complex grid with 6 cards across 4 rows. Card 2 preserves its
					area while other cards adjust.
				</Typography>

				<div
					style={{
						margin: '16px 0',
						padding: '16px 20px',
						'border-radius': '8px',
						background: props.isDark()
							? 'rgba(255, 255, 255, 0.05)'
							: 'rgba(0, 0, 0, 0.02)',
						border: `1px solid ${
							props.isDark()
								? 'rgba(255, 255, 255, 0.08)'
								: 'rgba(0, 0, 0, 0.06)'
						}`
					}}
				>
					<div
						style={{
							display: 'flex',
							'align-items': 'center',
							gap: '20px',
							color: 'hsl(var(--foreground))',
							'font-size': '0.875rem'
						}}
					>
						<span
							style={{
								'flex-shrink': '0',
								'min-width': '60px',
								'font-weight': '500',
								opacity: '0.7'
							}}
						>
							Sidebar
						</span>
						<input
							type='range'
							min={0}
							max={100}
							step={1}
							value={sidebarAmount2()}
							onInput={e => setSidebarAmount2(parseInt(e.currentTarget.value))}
							style={{
								flex: '1',
								cursor: 'pointer'
							}}
						/>
						<div
							style={{
								display: 'flex',
								gap: '16px',
								'flex-shrink': '0',
								'align-items': 'center'
							}}
						>
							<span
								style={{
									'min-width': '42px',
									'text-align': 'right',
									'font-weight': '600',
									'font-size': '0.9375rem',
									'font-family': 'ui-monospace, monospace',
									color: 'hsl(var(--accent))'
								}}
							>
								{sidebarAmount2()}%
							</span>
							<span
								style={{
									'min-width': '1px',
									height: '16px',
									background: props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}}
							/>
							<span
								style={{
									'min-width': '90px',
									opacity: '0.6',
									'font-size': '0.8125rem',
									'font-family': 'ui-monospace, monospace'
								}}
							>
								width: {Math.round(contentWidth2())}%
							</span>
						</div>
					</div>
				</div>

				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: `${contentWidth2()}%`,
									height: '500px',
									display: 'flex',
									'flex-direction': 'column'
								}}
							>
								<Grid
									columns='repeat(2, minmax(0, 1fr))'
									rows='1fr 1fr 1fr 1fr'
									gap='4px'
									preserveArea={{
										selector: '[data-preserve-area="true"]',
										minHeight: 100,
										constraints: [
											{
												selector: ':not([data-preserve-area="true"])',
												minHeight: 60
											}
										]
									}}
									style={{
										flex: '1 1 0',
										width: '100%',
										height: '100%',
										'box-sizing': 'border-box',
										'min-height': '0',
										'min-width': '0',
										overflow: 'hidden'
									}}
								>
									<For each={Array.from({ length: 6 })}>
										{(_, i) => (
											<div
												data-preserve-area={i() === 1 ? 'true' : undefined}
												style={{
													padding: '16px',
													'border-radius': '6px',
													background:
														i() === 1
															? props.isDark()
																? 'rgba(59, 130, 246, 0.15)'
																: 'rgba(59, 130, 246, 0.1)'
															: props.isDark()
																? 'rgba(255, 255, 255, 0.05)'
																: 'rgba(0, 0, 0, 0.02)',
													border: `1px solid ${
														i() === 1
															? props.isDark()
																? 'rgba(59, 130, 246, 0.3)'
																: 'rgba(59, 130, 246, 0.2)'
															: props.isDark()
																? 'rgba(255, 255, 255, 0.1)'
																: 'rgba(0, 0, 0, 0.1)'
													}`,
													'grid-column':
														i() === 0
															? '1 / -1'
															: i() === 1
																? '1 / -1'
																: 'auto',
													'grid-row':
														i() === 0
															? '1'
															: i() === 1
																? '2'
																: i() === 2 || i() === 3
																	? '3'
																	: '4',
													display: 'flex',
													'flex-direction': 'column',
													'align-items': 'center',
													'justify-content': 'center',
													'box-sizing': 'border-box'
												}}
											>
												<div
													style={{
														'font-size': '0.875rem',
														'font-weight': '600',
														color: 'hsl(var(--foreground))',
														'margin-bottom': '4px'
													}}
												>
													Card {i() + 1}
													{i() === 1 && ' (Priority)'}
												</div>
												<div
													style={{
														'font-size': '0.75rem',
														color: props.isDark()
															? 'rgba(246, 246, 246, 0.6)'
															: 'rgba(26, 26, 26, 0.6)'
													}}
												>
													{i() === 1
														? 'Preserves area on resize'
														: 'Content area'}
												</div>
											</div>
										)}
									</For>
								</Grid>
							</div>
						</div>
					}
					code={gridSnippets.usage.preserveArea}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The Grid component uses CSS custom properties for theming and
					customization. These variables are already defined in the library, but
					you can override them in your application's stylesheet to match your
					design system.
				</Typography>
				<CodeHighlight
					code={gridSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The Grid component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					spacing values use standard CSS units (px, rem, em, %).
				</Typography>
				<Typography variant='h4' as='h3' isDark={props.isDark()}>
					Preserve Area CSS Variables
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					When using Preserve Area mode, the Grid component exposes additional
					CSS custom properties that you can override:
				</Typography>
				<CodeHighlight
					code={gridSnippets.customizationPreserveArea}
					isDark={props.isDark}
				/>
			</section>
		</article>
	)
}
