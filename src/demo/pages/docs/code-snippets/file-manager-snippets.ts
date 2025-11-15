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
/>`,

    withFilters: `<FileManager
  files={files()}
  currentPath={currentPath()}
  onPathChange={setCurrentPath}
  onLoadFolder={handleLoadFolder}
  allowedExtensions={['txt', 'pdf', 'doc']}
/>`,
  },

  customization: `@layer base {
  :root {
    /* FileManager component spacing and sizing */
    --file-manager-border-radius: 8px;
    --file-manager-header-padding: 8px 12px;
    --file-manager-toolbar-padding: 8px 12px;
    --file-manager-toolbar-gap: 8px;
  }

  [data-theme="dark"] {
    /* FileManager uses same sizing in dark theme */
    --file-manager-border-radius: 8px;
  }
}`,
} as const;
