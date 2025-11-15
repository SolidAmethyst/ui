# Development Tooling

This directory contains development tools and utilities for the project.

## Structure

```
tooling/
├── eslint/          # Custom ESLint rules for code quality
│   ├── index.js     # ESLint plugin export
│   └── rules/       # Individual rule implementations
└── scripts/         # Maintenance and automation scripts
```

## Usage

### ESLint Rules
See [tooling/eslint/README.md](./eslint/README.md)

### Scripts
See [tooling/scripts/README.md](./scripts/README.md)

## Adding New Tools

When adding new development tools:

1. Create a new subdirectory in `tooling/`
2. Add a README.md explaining the tool
3. Update this main README to reference it
4. Update package.json if it needs npm scripts

## Philosophy

All development tooling should be:
- **Documented** - Clear README with examples
- **Automated** - Runnable via npm scripts
- **Tested** - Include tests where applicable
- **Maintainable** - Clean, commented code
