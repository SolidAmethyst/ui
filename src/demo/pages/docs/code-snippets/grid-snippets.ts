/**
 * Code examples for Grid component documentation
 * Separated from the main docs file for better readability and maintainability
 */

export const gridSnippets = {
  imports: `import { Grid } from '@sapphiresolid/ui'`,

  usage: {
    basicUsage: `<Grid columns={3} gap="16px">
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
</Grid>`,

    responsiveBreakpoints: `<Grid
  columns={4}
  breakpoints={[
    { maxWidth: 768, columns: 1 },
    { minWidth: 769, maxWidth: 1024, columns: 2 },
    { minWidth: 1025, columns: 4 }
  ]}
  gap="16px"
>
  {/* Grid items */}
</Grid>`,

    autoFitMinMax: `<Grid
  columns={3}
  minColumnWidth="150px"
  maxColumnWidth="1fr"
  autoFit={false}
  gap="16px"
>
  {/* Grid items */}
</Grid>`,

    separateGap: `<Grid
  columns={3}
  gap={{ row: "24px", column: "12px" }}
>
  {/* Grid items */}
</Grid>`,

    customCSSTemplate: `<Grid
  columns="200px 1fr auto"
  rows="auto 1fr auto"
  gap="16px"
>
  <div style={{ gridColumn: "1 / -1" }}>Header</div>
  <div>Sidebar</div>
  <div>Main Content</div>
  <div>Actions</div>
  <div style={{ gridColumn: "1 / -1" }}>Footer</div>
</Grid>`,

    preserveArea: `<Grid
  columns="repeat(3, minmax(0, 1fr))"
  rows="auto 1fr"
  gap="8px"
  preserveArea={{
    selector: '[data-preserve-area="true"]',
    minHeight: '150px'
  }}
>
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div
    data-preserve-area="true"
    style={{ gridColumn: '1 / -1', gridRow: '2' }}
  >
    Card 4 (Priority - preserves area on resize)
  </div>
</Grid>

// CSS Variables for advanced customization:
// --grid-row-1-height: Height of first row
// --grid-row-2-height: Height of second row (priority element)`,
  },

  customization: `@layer base {
  :root {
    /* Grid component spacing and sizing */
    --grid-gap: 12px;
    --grid-item-padding: 20px;
    --grid-transition-duration: 250ms;
  }

  [data-theme="dark"] {
    /* Grid uses same values in dark theme */
    --grid-gap: 12px;
  }
}

/* Override for specific grid instance */
.my-custom-grid {
  --grid-gap: 24px;
}`,

  customizationPreserveArea: `/* Override preserve area row heights */
.my-grid {
  --grid-row-1-height: 120px;
  --grid-row-2-height: 400px;
}

/* Override preserve area minimums */
.my-grid {
  --grid-preserve-area-min-row-height: 100px;
  --grid-preserve-area-min-card-height: 300px;
}

/* Override transition timing */
.my-grid {
  --grid-transition-duration: 350ms;
  --grid-transition-timing: ease-in-out;
}

/* Example: Smooth preserve area animation */
.smooth-grid {
  --grid-transition-duration: 400ms;
  --grid-transition-timing: cubic-bezier(0.25, 0.1, 0.25, 1);
}`,
} as const;
