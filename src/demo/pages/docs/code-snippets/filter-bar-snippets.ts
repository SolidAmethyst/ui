/**
 * FilterBar Component Code Snippets
 */

export const filterBarSnippets = {
	imports: `import { FilterBar, FilterPanel } from '@sapphiresolid/ui'
import type { FileTypeFilter } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `const filters = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'checkbox',
    options: [
      { label: 'Tag 1', value: 'tag1' },
      { label: 'Tag 2', value: 'tag2' }
    ]
  }
]

<FilterBar filters={filters} />`,

		allTypes: `const filters = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'checkbox',
    options: [
      { label: 'Tag 1', value: 'tag1' },
      { label: 'Tag 2', value: 'tag2' }
    ]
  },
  {
    id: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Enter text...'
  },
  {
    id: 'date',
    label: 'Date',
    type: 'date'
  },
  {
    id: 'range',
    label: 'Range',
    type: 'range',
    min: 0,
    max: 100,
    step: 1
  }
]

<FilterBar filters={filters} />`,

		filterPanel: `const [filterPanelOpen, setFilterPanelOpen] = createSignal(false)
const [fileTypes, setFileTypes] = createSignal<FileTypeFilter[]>([
  { id: 'sql', label: '.sql', extension: 'sql', checked: true },
  { id: 'txt', label: '.txt', extension: 'txt', checked: true },
  { id: 'bat', label: '.bat', extension: 'bat', checked: true }
])
const [showHiddenFiles, setShowHiddenFiles] = createSignal(false)
const [minFileSize, setMinFileSize] = createSignal(0)
const [maxFileSize, setMaxFileSize] = createSignal(0)

<button onClick={() => setFilterPanelOpen(true)}>
  Open Filters
</button>

<FilterPanel
  isOpen={filterPanelOpen()}
  onClose={() => setFilterPanelOpen(false)}
  fileTypes={fileTypes()}
  onFileTypesChange={setFileTypes}
  showHiddenFiles={showHiddenFiles()}
  onShowHiddenFilesChange={setShowHiddenFiles}
  minFileSize={minFileSize()}
  maxFileSize={maxFileSize()}
  onFileSizeChange={(min, max) => {
    setMinFileSize(min)
    setMaxFileSize(max)
  }}
  isDark={true}
  size="md"
/>`
	},

	customization: `@layer base {
  :root {
    --filter-bar-gap: 12px;
    --filter-bar-padding: 12px 16px;
    --filter-bar-blur: 8px;
    --filter-bar-border-radius: 8px;
    --filter-bar-item-gap: 4px;
    --filter-bar-item-min-width: 120px;
    --filter-bar-label-font-size: 12px;
    --filter-bar-input-padding: 6px 10px;
    --filter-bar-input-font-size: 14px;
    --filter-bar-input-border-radius: 6px;
    --filter-bar-checkbox-gap: 6px;
    --filter-bar-button-padding: 6px 12px;
    --filter-bar-button-font-size: 13px;
    --filter-bar-button-border-radius: 6px;
  }

  .dark,
  [data-theme="dark"] {
    --filter-bar-gap: 12px;
    --filter-bar-padding: 12px 16px;
    --filter-bar-blur: 8px;
    --filter-bar-border-radius: 8px;
    --filter-bar-item-gap: 4px;
    --filter-bar-item-min-width: 120px;
    --filter-bar-label-font-size: 12px;
    --filter-bar-input-padding: 6px 10px;
    --filter-bar-input-font-size: 14px;
    --filter-bar-input-border-radius: 6px;
    --filter-bar-checkbox-gap: 6px;
    --filter-bar-button-padding: 6px 12px;
    --filter-bar-button-font-size: 13px;
    --filter-bar-button-border-radius: 6px;
  }
}`
} as const
