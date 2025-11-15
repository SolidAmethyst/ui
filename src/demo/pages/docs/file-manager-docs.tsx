import { Accessor, Component, createSignal } from 'solid-js'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import { FileManager } from '../../../composites/file-manager'
import { Tabs } from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'
import { fileManagerSnippets } from './code-snippets/file-manager-snippets'
import type { FileItem } from '../../../composites/file-manager'

interface FileManagerDocsProps {
	isDark: Accessor<boolean>
}

// Mock data for examples
const mockFiles: FileItem[] = [
	{
		name: 'Documents',
		path: '/Documents',
		isFolder: true,
		modified: Date.now().toString()
	},
	{
		name: 'Pictures',
		path: '/Pictures',
		isFolder: true,
		modified: Date.now().toString()
	},
	{
		name: 'readme.txt',
		path: '/Documents/readme.txt',
		isFolder: false,
		size: 2048,
		modified: (Date.now() - 86400000).toString()
	},
	{
		name: 'notes.pdf',
		path: '/Documents/notes.pdf',
		isFolder: false,
		size: 15360,
		modified: (Date.now() - 172800000).toString()
	},
	{
		name: 'image.jpg',
		path: '/Pictures/image.jpg',
		isFolder: false,
		size: 524288,
		modified: (Date.now() - 259200000).toString()
	}
]

export const FileManagerDocs: Component<FileManagerDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })
	const [files, setFiles] = createSignal<FileItem[]>(mockFiles)
	const [currentPath, setCurrentPath] = createSignal('/')

	const handleLoadFolder = async (path: string): Promise<FileItem[]> => {
		// Simulate loading delay
		await new Promise(resolve => setTimeout(resolve, 300))

		// Return files for the path
		let result: FileItem[]
		if (path === '/') {
			result = mockFiles.filter(f => f.path.split('/').length === 2)
		} else {
			// Return files in subfolder
			result = mockFiles.filter(f => {
				const filePath = f.path.split('/').slice(0, -1).join('/')
				return filePath === path || filePath.startsWith(path + '/')
			})
		}

		// Update files state
		setFiles(result)
		return result
	}

	const handleLoadDrives = async (): Promise<string[]> => {
		return ['C:\\', 'D:\\', 'F:\\']
	}

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				FileManager
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				File manager component with navigation, search, filtering, and file
				selection. Supports breadcrumbs, sorting, and multiple selection modes.
			</Typography>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight
					code={fileManagerSnippets.imports}
					isDark={props.isDark}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '800px',
									height: '500px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
								<FileManager
									files={files()}
									currentPath={currentPath()}
									onPathChange={setCurrentPath}
									onLoadFolder={handleLoadFolder}
									onLoadDrives={handleLoadDrives}
									onFileSelect={selected => {
										console.log('Selected files:', selected)
									}}
									isDark={props.isDark()}
									style={{ width: '100%', height: '100%' }}
								/>
							</div>
						</div>
					}
					code={fileManagerSnippets.usage.basicUsage}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					With Drives
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '800px',
									height: '500px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
								<FileManager
									files={files()}
									currentPath={currentPath()}
									onPathChange={setCurrentPath}
									onLoadFolder={handleLoadFolder}
									onLoadDrives={handleLoadDrives}
									isDark={props.isDark()}
									style={{ width: '100%', height: '100%' }}
								/>
							</div>
						</div>
					}
					code={fileManagerSnippets.usage.withDrives}
				/>
			</section>

			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					With File Filters
				</Typography>
				<Tabs
					isDark={props.isDark}
					preview={
						<div style={docsStyles.previewContainer(theme())}>
							<div
								style={{
									width: '100%',
									'max-width': '800px',
									height: '500px',
									margin: '0 auto',
									display: 'flex',
									'justify-content': 'center'
								}}
							>
								<FileManager
									files={files()}
									currentPath={currentPath()}
									onPathChange={setCurrentPath}
									onLoadFolder={handleLoadFolder}
									allowedExtensions={['txt', 'pdf']}
									isDark={props.isDark()}
									style={{ width: '100%', height: '100%' }}
								/>
							</div>
						</div>
					}
					code={fileManagerSnippets.usage.withFilters}
				/>
			</section>

			{/* Customization */}
			<section style={docsStyles.section()}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The FileManager component uses CSS custom properties for theming.
					These variables are already defined in the library, but you can
					override them in your application's stylesheet to match your design
					system.
				</Typography>
				<CodeHighlight
					code={fileManagerSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The FileManager component automatically uses these CSS variables. You
					can override them in your application to match your design system.
				</Typography>
			</section>
		</article>
	)
}
