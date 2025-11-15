export const searchSnippets = {
  imports: `import { Search } from '@sapphiresolid/ui'`,

  basic: `<Search
  placeholder="Search..."
  onSearch={(value) => console.log(value)}
/>`,

  withValue: `<Search
  value={searchQuery()}
  placeholder="Search users..."
  onSearch={(value) => setSearchQuery(value)}
/>`,

  withDebounce: `<Search
  placeholder="Search..."
  debounceMs={500}
  onSearch={(value) => handleSearch(value)}
/>`,

  withoutIcon: `<Search
  placeholder="Search..."
  showIcon={false}
  onSearch={(value) => console.log(value)}
/>`,

  withoutClear: `<Search
  placeholder="Search..."
  showClear={false}
  onSearch={(value) => console.log(value)}
/>`,

  disabled: `<Search
  placeholder="Search..."
  disabled
/>`,

  withInputCallback: `<Search
  placeholder="Search..."
  onInput={(value) => console.log('Immediate:', value)}
  onSearch={(value) => console.log('Debounced:', value)}
/>`,

  autofocus: `<Search
  placeholder="Search..."
  autofocus
  onSearch={(value) => console.log(value)}
/>`,

  customization: `@layer base {
  :root {
    --search-padding: 8px 12px 8px 40px;
    --search-font-size: 14px;
    --search-border-radius: 8px;
    --search-icon-left: 12px;
    --search-icon-size: 20px;
    --search-clear-right: 8px;
    --search-clear-size: 20px;
    --search-clear-icon-size: 16px;
  }

  .dark,
  [data-theme="dark"] {
    /* Override search variables for dark theme if needed */
    --search-padding: 8px 12px 8px 40px;
    --search-font-size: 14px;
    --search-border-radius: 8px;
  }
}`,
};
