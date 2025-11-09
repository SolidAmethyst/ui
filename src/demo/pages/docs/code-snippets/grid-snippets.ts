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
</Grid>`
	}
} as const
