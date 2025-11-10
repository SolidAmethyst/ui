import { Accessor, Component, createEffect, createSignal } from 'solid-js'
import { Button } from '../../../components/ui/button'
import { CodeHighlight } from '../../../components/ui/code-highlight'
import type { SidebarItem } from '../../../components/ui/sidebar'
import { Sidebar } from '../../../components/ui/sidebar'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsRoot,
	TabsTrigger
} from '../../../components/ui/tabs'
import { Typography } from '../../../components/ui/typography'
import { docsStyles } from '../../lib/docs.styles'

interface TabsDocsProps {
	isDark: Accessor<boolean>
}

const tabsSnippets = {
	imports: `import { Tabs } from '@sapphiresolid/ui'`,
	basicUsage: `import { Tabs } from '@sapphiresolid/ui'

function MyComponent() {
  return (
    <Tabs
      preview={<div>Your preview content here</div>}
      code="const example = 'code'"
      isDark={isDark}
    />
  )
}`,
	universalImports: `import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '@sapphiresolid/ui'`,
	universalUsage: `import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '@sapphiresolid/ui'

<TabsRoot defaultValue="overview" isDark={isDark}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="reports">Reports content</TabsContent>
</TabsRoot>`,
	customization: `@layer base {
  :root {
    --tabs-background: 0 0% 98%;
    --tabs-foreground: 240 5.3% 26.1%;
    --tabs-active: 217 91% 60%;
    --tabs-border: 220 13% 91%;
  }

  .dark,
  [data-theme="dark"] {
    --tabs-background: 240 5.9% 10%;
    --tabs-foreground: 240 4.8% 95.9%;
    --tabs-active: 217 91% 60%;
    --tabs-border: 240 3.7% 15.9%;
  }
}

.custom-tabs {
  /* Your custom styles */
}`
}

export const TabsDocs: Component<TabsDocsProps> = props => {
	const theme = () => ({ isDark: props.isDark() })
	const [appDark, setAppDark] = createSignal(false)
	const [sidebarOpen, setSidebarOpen] = createSignal(false)

	// Sync with global theme
	createEffect(() => {
		setAppDark(props.isDark())
	})

	// Demo sidebar items
	const sidebarItems: SidebarItem[] = [
		{ label: 'Dashboard', icon: 'dashboard', onClick: () => {} },
		{ label: 'Analytics', icon: 'analytics', onClick: () => {} },
		{ label: 'Reports', icon: 'description', onClick: () => {} }
	]

	return (
		<article style={docsStyles.article(theme())}>
			<Typography variant='h1' isDark={props.isDark()}>
				Tabs
			</Typography>
			<Typography variant='body' isDark={props.isDark()}>
				Tabbed interface component for switching between preview and code views.
			</Typography>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Installation
				</Typography>
				<CodeHighlight code={tabsSnippets.imports} isDark={props.isDark} />
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Basic Usage
				</Typography>
				<Tabs
					preview={
						<TabsRoot defaultValue='tab1' isDark={props.isDark()}>
							<TabsList style={{ width: '100%', 'max-width': '100%' }}>
								<TabsTrigger value='tab1'>Overview</TabsTrigger>
								<TabsTrigger value='tab2'>Settings</TabsTrigger>
								<TabsTrigger value='tab3'>Analytics</TabsTrigger>
								<TabsTrigger value='tab4'>Reports</TabsTrigger>
							</TabsList>
						</TabsRoot>
					}
					code={tabsSnippets.basicUsage}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Universal Tabs (for Applications)
				</Typography>
				<CodeHighlight
					code={tabsSnippets.universalImports}
					isDark={props.isDark}
				/>
				<Tabs
					preview={
						<div
							style={{
								width: '100%',
								height: '500px',
								'box-sizing': 'border-box',
								border: `1px solid ${
									props.isDark()
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(0, 0, 0, 0.1)'
								}`,
								'border-radius': '0',
								overflow: 'hidden',
								position: 'relative',
								display: 'flex',
								background: appDark() ? 'hsl(240 20% 8%)' : '#ffffff'
							}}
						>
							<Sidebar
								open={sidebarOpen()}
								items={sidebarItems}
								isDark={appDark()}
								overlayMode={false}
								onItemClick={() => setSidebarOpen(false)}
							/>
							<div
								style={{
									flex: '1',
									display: 'flex',
									'flex-direction': 'column',
									height: '100%',
									overflow: 'hidden'
								}}
							>
								<div
									style={{
										padding: '16px',
										'border-bottom': `1px solid ${
											appDark()
												? 'rgba(255, 255, 255, 0.1)'
												: 'rgba(0, 0, 0, 0.1)'
										}`,
										display: 'flex',
										'align-items': 'center',
										gap: '12px'
									}}
								>
									<Button
										variant='trigger'
										iconPosition='only'
										title={sidebarOpen() ? 'Close Sidebar' : 'Open Sidebar'}
										active={sidebarOpen()}
										onClick={() => setSidebarOpen(!sidebarOpen())}
										style={{
											width: '28px',
											height: '28px'
										}}
									/>
									<Typography variant='h4' as='h2' isDark={appDark()} style={{ margin: '0' }}>
										Dashboard
									</Typography>
								</div>
								<div
									style={{
										flex: '1',
										padding: '32px',
										overflow: 'auto',
										background: appDark()
											? 'hsl(240 20% 10%)'
											: 'rgba(248, 248, 248, 1)',
										'box-sizing': 'border-box'
									}}
								>
									<TabsRoot defaultValue='overview' isDark={appDark()}>
										<TabsList style={{ width: '100%', 'max-width': '100%' }}>
											<TabsTrigger value='overview'>Overview</TabsTrigger>
											<TabsTrigger value='analytics'>Analytics</TabsTrigger>
											<TabsTrigger value='reports'>Reports</TabsTrigger>
										</TabsList>
										<TabsContent value='overview'>
											<div
												style={{
													margin: '20px 0',
													color: appDark() ? '#ffffff' : '#000000'
												}}
											>
												<h3
													style={{
														margin: '0 0 16px 0',
														'font-size': '18px',
														'font-weight': '600',
														color: appDark() ? '#ffffff' : '#000000'
													}}
												>
													Overview
												</h3>
												<p
													style={{
														margin: '0',
														'line-height': '1.6',
														color: appDark()
															? 'rgba(255, 255, 255, 0.9)'
															: 'rgba(0, 0, 0, 0.9)'
													}}
												>
													Dashboard overview with key metrics and statistics.
													Monitor your application performance here.
												</p>
											</div>
										</TabsContent>
										<TabsContent value='analytics'>
											<div
												style={{
													margin: '20px 0',
													color: appDark() ? '#ffffff' : '#000000'
												}}
											>
												<h3
													style={{
														margin: '0 0 16px 0',
														'font-size': '18px',
														'font-weight': '600',
														color: appDark() ? '#ffffff' : '#000000'
													}}
												>
													Analytics
												</h3>
												<p
													style={{
														margin: '0',
														'line-height': '1.6',
														color: appDark()
															? 'rgba(255, 255, 255, 0.9)'
															: 'rgba(0, 0, 0, 0.9)'
													}}
												>
													Detailed analytics and data visualization. Track user
													behavior and engagement metrics.
												</p>
											</div>
										</TabsContent>
										<TabsContent value='reports'>
											<div
												style={{
													margin: '20px 0',
													color: appDark() ? '#ffffff' : '#000000'
												}}
											>
												<h3
													style={{
														margin: '0 0 16px 0',
														'font-size': '18px',
														'font-weight': '600',
														color: appDark() ? '#ffffff' : '#000000'
													}}
												>
													Reports
												</h3>
												<p
													style={{
														margin: '0',
														'line-height': '1.6',
														color: appDark()
															? 'rgba(255, 255, 255, 0.9)'
															: 'rgba(0, 0, 0, 0.9)'
													}}
												>
													Generate and export reports. View historical data and
													performance summaries.
												</p>
											</div>
										</TabsContent>
									</TabsRoot>
								</div>
							</div>
						</div>
					}
					code={tabsSnippets.universalUsage}
					isDark={props.isDark}
				/>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Customization
				</Typography>
				<Typography variant='body' isDark={props.isDark()}>
					The tabs component uses CSS custom properties for theming. These
					variables are already defined in the library, but you can override
					them in your application's stylesheet to match your design system.
				</Typography>
				<CodeHighlight
					code={tabsSnippets.customization}
					isDark={props.isDark}
				/>
				<Typography variant='body' isDark={props.isDark()}>
					The tabs component automatically uses these CSS variables. You can
					override them in your application to match your design system. All
					colors use HSL format without the `hsl()` wrapper, allowing for easy
					opacity adjustments.
				</Typography>
			</section>

			<section style={{ 'margin-bottom': '48px' }}>
				<Typography variant='h3' as='h2' isDark={props.isDark()}>
					Features
				</Typography>
				<ul
					style={{
						'padding-left': '20px',
						margin: '0',
						'list-style': 'disc'
					}}
				>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Switch between preview and code tabs
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Integrated with CodeHighlight component
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Dark and light theme support
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Customizable styles and classes
						</Typography>
					</li>
					<li>
						<Typography variant='body' isDark={props.isDark()}>
							Smooth transitions
						</Typography>
					</li>
				</ul>
			</section>
		</article>
	)
}
