/**
 * Code examples for TechChip component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const techchipSnippets = {
  imports: `import { TechChip } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<TechChip
  label="TypeScript"
  icon="code"
  status="ready"
  variant="frontend"
/>

<TechChip
  label="Solid.js"
  icon="javascript"
  status="ready"
  variant="frontend"
/>

<TechChip
  label="Rust"
  icon="memory"
  status="ready"
  variant="backend"
/>

<TechChip
  label="Tauri"
  icon="desktop_windows"
  status="ready"
  variant="backend"
/>

<TechChip
  label="Physics Engine"
  icon="science"
  status="ready"
  variant="engine"
/>

<TechChip
  label="WebGL"
  icon="web"
  status="ready"
  variant="engine"
/>`,

    statusStates: `<TechChip
  label="Loading"
  icon="hourglass_empty"
  status="loading"
  variant="frontend"
/>

<TechChip
  label="Ready"
  icon="check_circle"
  status="ready"
  variant="backend"
/>

<TechChip
  label="Error"
  icon="error"
  status="error"
  variant="engine"
/>`,
  },
} as const;
