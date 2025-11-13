/**
 * Code examples for NumberInput component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const numberInputSnippets = {
	imports: `import { NumberInput } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `<NumberInput
  value={3}
  step={1}
  enableWheel={true}
  onChange={(val) => setValue(val)}
/>`,

		controlled: `const [value, setValue] = createSignal(3)

<NumberInput
  value={value()}
  onChange={(val) => {
    const num = typeof val === 'number' ? val : parseInt(String(val), 10)
    if (!isNaN(num) && num >= 1 && num <= 6) {
      setValue(num)
    }
  }}
  min={1}
  max={6}
  step={1}
  enableWheel={true}
  showArrows={true}
  themeAware={true}
/>`
	}
} as const
