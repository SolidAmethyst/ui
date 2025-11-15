# Custom ESLint Rules

Custom ESLint rules for maintaining code consistency and quality.

## Rules

### `no-hardcoded-theme-colors`

**Location:** `rules/no-hardcoded-theme-colors.js`

**Purpose:** Prevents hardcoded color values in theme-related code to ensure all colors use CSS variables for proper theming support.

**Why this matters:**
- ✅ Consistent theming across light/dark modes
- ✅ Centralized color management
- ✅ Easy theme customization
- ✅ Prevents theme inconsistencies

**Examples:**

```tsx
// ❌ Bad - Hardcoded colors
const styles = {
  color: '#ffffff',
  background: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid #333'
}

// ✅ Good - Using CSS variables
const styles = {
  color: 'hsl(var(--foreground))',
  background: 'hsl(var(--muted) / 0.5)',
  border: '1px solid hsl(var(--border))'
}
```

**Configuration:**

In `eslint.config.js`:
```javascript
import customRules from './tooling/eslint/index.js'

export default [
  {
    plugins: {
      'custom': customRules
    },
    rules: {
      'custom/no-hardcoded-theme-colors': 'error'
    }
  }
]
```

**Exceptions:**

The rule is disabled for demo files where decorative colors are acceptable:
```javascript
{
  files: ['**/demo/**/*.{ts,tsx}'],
  rules: {
    'custom/no-hardcoded-theme-colors': 'off'
  }
}
```

## Adding New Rules

1. Create rule file in `rules/` directory
2. Export rule using ESLint rule format
3. Import and add to `index.js`
4. Document in this README
5. Add tests for the rule
6. Update main eslint.config.js

## Testing Rules

```bash
# Lint all files
npm run lint

# Auto-fix issues
npm run lint:fix
```

## Resources

- [ESLint Custom Rules Guide](https://eslint.org/docs/latest/extend/custom-rules)
- [ESLint Rule API](https://eslint.org/docs/latest/extend/custom-rule-tutorial)
