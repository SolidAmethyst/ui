import { Accessor, Component, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { Slider } from '../../../components/ui/slider'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { sliderSnippets } from './code-snippets/slider-snippets'

interface SliderDocsProps {
	isDark: Accessor<boolean>
}

export const SliderDocs: Component<SliderDocsProps> = props => {
	const [basicValue, setBasicValue] = createSignal(50)
	const [minMaxValue, setMinMaxValue] = createSignal(25)
	const [controlledValue, setControlledValue] = createSignal(50)
	const [formattedValue, setFormattedValue] = createSignal(75)
	const theme = () => ({ isDark: props.isDark() })

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Slider
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Range input slider component for selecting numeric values. Supports
				custom formatting, labels, and theme-aware styling.
			</Typography>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={sliderSnippets.imports} isDark={props.isDark} />
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
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
								<Slider value={50} isDark={props.isDark()} />
							</div>
						</div>
					}
					code={sliderSnippets.usage.basicUsage}
				/>
			</section>

			{/* With Label */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					With Label
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
							<Slider
								value={basicValue()}
								label='Volume'
								isDark={props.isDark()}
								onChange={val => setBasicValue(val)}
							/>
							</div>
						</div>
					}
					code={sliderSnippets.usage.withLabel}
				/>
			</section>

			{/* Min/Max/Step */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Min, Max, and Step
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
							<Slider
								value={minMaxValue()}
								min={0}
								max={100}
								step={5}
								label='Progress'
								isDark={props.isDark()}
								onChange={val => setMinMaxValue(val)}
							/>
							</div>
						</div>
					}
					code={sliderSnippets.usage.withMinMax}
				/>
			</section>

			{/* Custom Formatter */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Custom Value Formatter
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
							<Slider
								value={formattedValue()}
								label='Opacity'
								formatValue={val => `${val}%`}
								isDark={props.isDark()}
								onChange={val => setFormattedValue(val)}
							/>
							</div>
						</div>
					}
					code={sliderSnippets.usage.withFormatter}
				/>
			</section>

			{/* Controlled */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Controlled Component
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
							<Slider
								value={controlledValue()}
								label='Volume'
								isDark={props.isDark()}
								onChange={val => setControlledValue(val)}
							/>
							<Typography
								variant='small'
								isDark={props.isDark()}
								style={{ 'margin-top': '12px' }}
							>
								Current value: {controlledValue()}
							</Typography>
							</div>
						</div>
					}
					code={sliderSnippets.usage.controlled}
				/>
			</section>

			{/* Disabled */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Disabled State
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
							<Slider
								value={50}
								disabled={true}
								label='Volume'
								isDark={props.isDark()}
							/>
							</div>
						</div>
					}
					code={sliderSnippets.usage.disabled}
				/>
			</section>

			{/* Hide Value */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Hide Value
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '400px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
							<Slider
								value={50}
								label='Volume'
								showValue={false}
								isDark={props.isDark()}
							/>
							</div>
						</div>
					}
					code={sliderSnippets.usage.hideValue}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The slider component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={`@layer base {
  :root {
    --slider-thumb: 59 130 246;
    --slider-thumb-hover: 37 99 235;
    --slider-track: 0 0% 0% / 0.1;
    --slider-track-dark: 255 255 255 / 0.1;
  }

  [data-theme="dark"] {
    --slider-thumb: 59 130 246;
    --slider-thumb-hover: 37 99 235;
    --slider-track: 255 255 255 / 0.1;
    --slider-track-dark: 255 255 255 / 0.1;
  }
}`}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The slider component automatically uses these CSS variables. You can
					override them in your application to match your design system. The
					thumb color uses HSL format without the `hsl()` wrapper, allowing for
					easy color adjustments. Track colors use RGBA format for transparency
					control.
				</Typography>
			</section>
		</article>
	)
}
