# Development Scripts

Automation scripts for project maintenance and code quality.

## Available Scripts

### `fix-hardcoded-colors.ts`

**Purpose:** Automatically replaces hardcoded color values with appropriate CSS variables.

**Usage:**

```bash
# Dry run (preview changes without applying)
npm run fix:themes:dry

# Apply fixes
npm run fix:themes
```

**What it does:**

1. 🔍 **Scans** all demo page files for hardcoded colors
2. 🎨 **Identifies** rgba/rgb/hex color values
3. 🗺️ **Maps** colors to appropriate CSS variables
4. 🔧 **Generates** replacements using AST parsing
5. ✅ **Applies** changes (or previews with --dry-run)

**Example transformations:**

```tsx
// Before
style={{
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff'
}}

// After
style={{
  background: 'hsl(var(--muted) / 0.1)',
  color: 'hsl(var(--foreground))'
}}
```

**Technical details:**

- Uses `jscodeshift` for code transformation
- Uses `@babel/parser` for AST parsing
- Uses `colord` for color analysis
- Supports TypeScript/TSX files
- Preserves code formatting

**Output:**

The script provides detailed summary:
```
✅ Fixed 176 hardcoded colors across 15 files
✅ Removed 67 isDark props

Files modified:
  - src/demo/pages/docs/search-docs.tsx (18 colors)
  - src/demo/pages/docs/app-docs.tsx (12 colors)
  ...
```

## Adding New Scripts

When creating new automation scripts:

1. Add TypeScript file to `tooling/scripts/`
2. Document purpose and usage in this README
3. Add npm script to package.json
4. Include error handling and dry-run mode
5. Provide clear output/logging

## Running Scripts

All scripts can be run via npm:

```bash
# List all available scripts
npm run

# Run specific script
npm run <script-name>
```

## Best Practices

- ✅ Always support `--dry-run` for destructive operations
- ✅ Provide clear, detailed output
- ✅ Handle errors gracefully
- ✅ Document expected behavior
- ✅ Include examples
