/**
 * FileManager Component Code Snippets
 */

export const fileManagerSnippets = {
	imports: `import { FileManager } from '@sapphiresolid/ui'
import type { FileItem } from '@sapphiresolid/ui'`,

	usage: {
		basicUsage: `const [files, setFiles] = createSignal<FileItem[]>([
  { name: 'Documents', path: '/Documents', isFolder: true },
  { name: 'file.txt', path: '/Documents/file.txt', isFolder: false, size: 1024 }
])

const [currentPath, setCurrentPath] = createSignal('/')

const handleLoadFolder = async (path: string): Promise<FileItem[]> => {
  // Load folder contents from your data source
  return []
}

<FileManager
  files={files()}
  currentPath={currentPath()}
  onPathChange={setCurrentPath}
  onLoadFolder={handleLoadFolder}
  onFileSelect={(selected) => console.log('Selected:', selected)}
  isDark={true}
/>`,

		withDrives: `const handleLoadDrives = async (): Promise<string[]> => {
  return ['C:\\', 'D:\\', 'F:\\']
}

<FileManager
  files={files()}
  currentPath={currentPath()}
  onPathChange={setCurrentPath}
  onLoadFolder={handleLoadFolder}
  onLoadDrives={handleLoadDrives}
  isDark={true}
/>`,

		withFilters: `<FileManager
  files={files()}
  currentPath={currentPath()}
  onPathChange={setCurrentPath}
  onLoadFolder={handleLoadFolder}
  allowedExtensions={['txt', 'pdf', 'doc']}
  isDark={true}
/>`
	},

	customization: `@layer base {
  :root {
    --file-manager-border-radius: 8px;
    --file-manager-header-padding: 8px 12px;
    --file-manager-header-font-size: 12px;
    --file-manager-toolbar-padding: 8px 12px;
    --file-manager-toolbar-gap: 8px;
    --file-manager-drive-button-padding: 4px 8px;
    --file-manager-drive-button-font-size: 12px;
    --file-manager-breadcrumb-gap: 4px;
    --file-manager-breadcrumb-padding: 4px 8px;
    --file-manager-breadcrumb-font-size: 14px;
    --file-manager-search-padding: 8px 12px;
    --file-manager-search-font-size: 12px;
    --file-manager-table-font-size: 12px;
    --file-manager-th-padding: 6px 8px;
    --file-manager-td-padding: 4px 8px;
    --file-manager-footer-padding: 8px 12px;
    --file-manager-footer-font-size: 12px;
    --file-manager-footer-button-gap: 6px;
    --file-manager-footer-button-padding: 4px 10px;
    --file-manager-footer-button-font-size: 12px;
  }

  .dark,
  [data-theme="dark"] {
    /* Same variables apply for dark theme */
  }
}`
} as const
