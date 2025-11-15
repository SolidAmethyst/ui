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
/>`,
  },

  customization: `@layer base {
  :root {
    /* NumberInput component uses theme variables for colors */
    /* Focus border uses primary color */
    --number-input-border-focus: hsl(var(--primary) / 0.3);
  }

  [data-theme="dark"] {
    /* NumberInput focus border uses primary color in dark theme */
    --number-input-border-focus: hsl(var(--primary) / 0.5);
  }
}`,
} as const;
