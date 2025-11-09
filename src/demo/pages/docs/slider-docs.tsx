import { Accessor, Component, createSignal } from 'solid-js'
import { Slider } from '../../../components/ui/slider'
import { CodeHighlight } from '../../components/common/code-highlight'
import { Tabs } from '../../components/common/tabs'
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
			<h1 style={docsStyles.title(theme())}>Slider</h1>
			<p style={docsStyles.description(theme())}>
				Range input slider component for selecting numeric values. Supports
				custom formatting, labels, and theme-aware styling.
			</p>

			{/* Installation */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Installation</h2>
				<CodeHighlight code={sliderSnippets.imports} isDark={props.isDark} />
			</section>

			{/* Basic Usage */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Basic Usage</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
							}}
						>
							<Slider value={50} isDark={props.isDark()} />
						</div>
					}
					code={sliderSnippets.usage.basicUsage}
				/>
			</section>

			{/* With Label */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>With Label</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
							}}
						>
							<Slider
								value={basicValue()}
								label='Volume'
								isDark={props.isDark()}
								onChange={val => setBasicValue(val)}
							/>
						</div>
					}
					code={sliderSnippets.usage.withLabel}
				/>
			</section>

			{/* Min/Max/Step */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Min, Max, and Step</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
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
					}
					code={sliderSnippets.usage.withMinMax}
				/>
			</section>

			{/* Custom Formatter */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Custom Value Formatter</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
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
					}
					code={sliderSnippets.usage.withFormatter}
				/>
			</section>

			{/* Controlled */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Controlled Component</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
							}}
						>
							<Slider
								value={controlledValue()}
								label='Volume'
								isDark={props.isDark()}
								onChange={val => setControlledValue(val)}
							/>
							<p
								style={{
									'margin-top': '12px',
									'font-size': '14px',
									color: props.isDark()
										? 'rgba(246, 246, 246, 0.7)'
										: 'rgba(26, 26, 26, 0.7)'
								}}
							>
								Current value: {controlledValue()}
							</p>
						</div>
					}
					code={sliderSnippets.usage.controlled}
				/>
			</section>

			{/* Disabled */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Disabled State</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
							}}
						>
							<Slider
								value={50}
								disabled={true}
								label='Volume'
								isDark={props.isDark()}
							/>
						</div>
					}
					code={sliderSnippets.usage.disabled}
				/>
			</section>

			{/* Hide Value */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Hide Value</h2>
				<Tabs
					isDark={props.isDark}
					preview={
						<div
							style={{
								width: '100%',
								'max-width': '400px',
								padding: '20px'
							}}
						>
							<Slider
								value={50}
								label='Volume'
								showValue={false}
								isDark={props.isDark()}
							/>
						</div>
					}
					code={sliderSnippets.usage.hideValue}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<h2 style={docsStyles.sectionTitle(theme())}>Customization</h2>
				<p style={docsStyles.description(theme())}>
					The slider component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</p>
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
				<p style={docsStyles.description(theme())}>
					The slider component automatically uses these CSS variables. You can
					override them in your application to match your design system. The
					thumb color uses HSL format without the `hsl()` wrapper, allowing for
					easy color adjustments. Track colors use RGBA format for transparency
					control.
				</p>
			</section>
		</article>
	)
}
