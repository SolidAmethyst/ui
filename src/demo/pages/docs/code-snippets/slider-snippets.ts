/**
 * Code examples for Slider component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const sliderSnippets = {
	imports: `import { Slider } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `<Slider value={50} />`,

		withLabel: `<Slider
  value={50}
  label="Volume"
/>`,

		withMinMax: `<Slider
  value={25}
  min={0}
  max={100}
  step={5}
/>`,

		withFormatter: `<Slider
  value={50}
  label="Opacity"
  formatValue={(val) => \`\${val}%\`}
/>`,

		controlled: `const [value, setValue] = createSignal(50)

<Slider
  value={value()}
  onChange={(val) => setValue(val)}
  label="Volume"
/>`,

		disabled: `<Slider
  value={50}
  disabled={true}
  label="Volume"
/>`,

		hideValue: `<Slider
  value={50}
  label="Volume"
  showValue={false}
/>`
	}
} as const
