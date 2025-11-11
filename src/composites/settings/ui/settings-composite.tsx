/**
 * Settings Composite Component
 * Full-featured settings panel with sections for Glass, Fonts, and more
 */

import { Component, createMemo, createSignal, For, Show } from 'solid-js'
import { Scrollbar } from '../../../components/ui/scrollbar'
import { Select } from '../../../components/ui/select'
import { Slider } from '../../../components/ui/slider'
import { settingsCompositeStyles } from '../lib/settings-composite.styles'
import type {
	AppearanceSubcategory,
	GlassSettings,
	HighlightProfile,
	HighlightsSettings,
	MainCategory,
	SettingsCompositeProps
} from '../model/types'
import { Settings } from './settings'

export const SettingsComposite: Component<SettingsCompositeProps> = props => {
	const [activeMainCategory, setActiveMainCategory] =
		createSignal<MainCategory>('appearance')
	const [activeSubcategory, setActiveSubcategory] =
		createSignal<AppearanceSubcategory>('glass')

	const isDark = createMemo(() => {
		const dark =
			typeof props.isDark === 'function' ? props.isDark() : props.isDark
		return dark ?? true
	})

	const glassSettings = createMemo<GlassSettings>(() => ({
		enabled: props.glassSettings?.enabled ?? false,
		blur: props.glassSettings?.blur ?? 15,
		opacity: props.glassSettings?.opacity ?? 0.9,
		darkness: props.glassSettings?.darkness ?? 1.0,
		saturation: props.glassSettings?.saturation ?? 1.0
	}))

	const highlightsSettings = createMemo<HighlightsSettings>(() => ({
		profile: props.highlightsSettings?.profile ?? 'default'
	}))

	const handleGlassChange = (
		key: keyof GlassSettings,
		value: boolean | number
	) => {
		if (props.onGlassSettingsChange) {
			props.onGlassSettingsChange({
				...glassSettings(),
				[key]: value
			})
		}
	}

	const handleHighlightsChange = (profile: HighlightProfile) => {
		if (props.onHighlightsSettingsChange) {
			props.onHighlightsSettingsChange({
				profile
			})
		}
	}

	const highlightProfiles: Array<{
		id: HighlightProfile
		label: string
		description: string
	}> = [
		{
			id: 'default',
			label: 'Default',
			description: 'Standard syntax highlighting'
		},
		{
			id: 'monokai',
			label: 'Monokai',
			description: 'Popular dark theme colors'
		},
		{ id: 'dracula', label: 'Dracula', description: 'Dark purple theme' },
		{ id: 'github', label: 'GitHub', description: 'GitHub-style highlighting' },
		{
			id: 'vs-code',
			label: 'VS Code',
			description: 'Visual Studio Code theme'
		},
		{ id: 'one-dark', label: 'One Dark', description: 'Atom One Dark theme' }
	]

	const mainCategories: Array<{
		id: MainCategory
		label: string
		icon: string
	}> = [
		{ id: 'appearance', label: 'Appearance', icon: 'palette' },
		{ id: 'fonts', label: 'Fonts', icon: 'text_fields' }
	]

	const appearanceSubcategories: Array<{
		id: AppearanceSubcategory
		label: string
		icon: string
	}> = [
		{ id: 'glass', label: 'Glass', icon: 'blur' },
		{ id: 'theme', label: 'Theme', icon: 'dark_mode' },
		{ id: 'highlights', label: 'Highlights', icon: 'palette' }
	]

	return (
		<Settings
			isOpen={props.isOpen}
			onClose={props.onClose}
			isDark={isDark()}
			width='600px'
			class={props.class}
			style={props.style}
		>
			<div style={settingsCompositeStyles.container()}>
				{/* Categories Sidebar */}
				<aside style={settingsCompositeStyles.sidebar(isDark())}>
					<Scrollbar direction='vertical' style={{ width: '100%', height: '100%' }}>
						<For each={mainCategories}>
						{category => (
							<button
								type='button'
								onClick={() => {
									setActiveMainCategory(category.id)
									if (category.id === 'appearance') {
										setActiveSubcategory('glass')
									}
								}}
								style={settingsCompositeStyles.categoryButton(
									isDark(),
									activeMainCategory() === category.id
								)}
								onMouseEnter={e => {
									if (activeMainCategory() !== category.id) {
										e.currentTarget.style.backgroundColor = isDark()
											? 'hsla(240, 3.7%, 15.9%, 0.5)'
											: 'hsla(220, 13%, 91%, 0.5)'
									}
								}}
								onMouseLeave={e => {
									if (activeMainCategory() !== category.id) {
										e.currentTarget.style.backgroundColor = 'transparent'
									}
								}}
							>
								<span
									class='material-symbols-rounded'
									style={settingsCompositeStyles.categoryIcon()}
								>
									{category.icon}
								</span>
								<span>{category.label}</span>
							</button>
						)}
					</For>
					</Scrollbar>
				</aside>

				{/* Content Area */}
				<Scrollbar
					direction='vertical'
					style={{
						...settingsCompositeStyles.content(isDark()),
						width: '100%',
						height: '100%'
					}}
				>
					<div style={settingsCompositeStyles.contentArea()}>
					{/* Tabs for Appearance subcategories */}
					<Show when={activeMainCategory() === 'appearance'}>
						<div style={settingsCompositeStyles.tabsContainer(isDark())}>
							<For each={appearanceSubcategories}>
								{subcategory => (
									<button
										type='button'
										onClick={() => setActiveSubcategory(subcategory.id)}
										style={settingsCompositeStyles.tabButton(
											isDark(),
											activeSubcategory() === subcategory.id
										)}
										onMouseEnter={e => {
											if (activeSubcategory() !== subcategory.id) {
												e.currentTarget.style.color = isDark()
													? 'rgba(246, 246, 246, 0.9)'
													: 'rgba(26, 26, 26, 0.9)'
											}
										}}
										onMouseLeave={e => {
											if (activeSubcategory() !== subcategory.id) {
												e.currentTarget.style.color = isDark()
													? 'rgba(246, 246, 246, 0.7)'
													: 'rgba(26, 26, 26, 0.7)'
											}
										}}
									>
										{subcategory.label}
									</button>
								)}
							</For>
						</div>
					</Show>

					{/* Content for selected subcategory */}
					<div style={settingsCompositeStyles.contentArea()}>
						<Show
							when={
								activeMainCategory() === 'appearance' &&
								activeSubcategory() === 'glass'
							}
						>
							<section style={settingsCompositeStyles.section(isDark())}>
								<h4 style={settingsCompositeStyles.sectionTitle(isDark())}>
									Glass Effect
								</h4>
								<p style={settingsCompositeStyles.sectionDescription(isDark())}>
									Customize the glass effect appearance and intensity.
								</p>

								{/* Enable/Disable Checkbox */}
								<div
									style={settingsCompositeStyles.checkboxContainer(isDark())}
								>
									<input
										type='checkbox'
										id='glass-enabled'
										checked={glassSettings().enabled}
										onChange={e =>
											handleGlassChange('enabled', e.currentTarget.checked)
										}
										style={settingsCompositeStyles.checkbox(isDark())}
									/>
									<label
										for='glass-enabled'
										style={settingsCompositeStyles.checkboxLabel(isDark())}
									>
										Enable Glass Effect
									</label>
								</div>

								{/* Opacity Slider - First, always enabled */}
								<div style={settingsCompositeStyles.controlContainer(isDark())}>
									<Slider
										value={glassSettings().opacity * 100}
										min={0}
										max={100}
										step={1}
										label='Opacity'
										formatValue={val => `${val}%`}
										isDark={isDark()}
										onChange={val => handleGlassChange('opacity', val / 100)}
									/>
								</div>

								{/* Blur Slider - Disabled when opacity is 0 */}
								<div style={settingsCompositeStyles.controlContainer(isDark())}>
									<Slider
										value={glassSettings().blur}
										min={0}
										max={50}
										step={1}
										label='Blur'
										formatValue={val => `${val}px`}
										isDark={isDark()}
										disabled={glassSettings().opacity === 0}
										onChange={val => handleGlassChange('blur', val)}
									/>
								</div>

								{/* Saturation Slider - Disabled when opacity is 0 */}
								<div style={settingsCompositeStyles.controlContainer(isDark())}>
									<Slider
										value={glassSettings().saturation * 100}
										min={0}
										max={200}
										step={1}
										label='Saturation'
										formatValue={val => `${val}%`}
										isDark={isDark()}
										disabled={glassSettings().opacity === 0}
										onChange={val => handleGlassChange('saturation', val / 100)}
									/>
								</div>

								{/* Darkness Slider - Disabled when opacity is 0 */}
								<div
									style={settingsCompositeStyles.controlContainer(
										isDark(),
										true
									)}
								>
									<Slider
										value={glassSettings().darkness * 100}
										min={0}
										max={100}
										step={1}
										label='Darkness'
										formatValue={val => `${val}%`}
										isDark={isDark()}
										disabled={glassSettings().opacity === 0}
										onChange={val => handleGlassChange('darkness', val / 100)}
									/>
								</div>
							</section>
						</Show>

						<Show
							when={
								activeMainCategory() === 'appearance' &&
								activeSubcategory() === 'theme'
							}
						>
							<section style={settingsCompositeStyles.section(isDark())}>
								<h4 style={settingsCompositeStyles.sectionTitle(isDark())}>
									Theme
								</h4>
								<p style={settingsCompositeStyles.sectionDescription(isDark())}>
									Choose the application theme.
								</p>

								<div
									style={{
										'margin-top': '24px'
									}}
								>
									<Select
										options={[
											{
												value: 'light',
												label: 'Light',
												description: 'Light theme with bright colors'
											},
											{
												value: 'dark',
												label: 'Dark',
												description: 'Dark theme with dark colors'
											}
										]}
										value={isDark() ? 'dark' : 'light'}
										onChange={value => {
											if (props.onThemeChange) {
												props.onThemeChange(value === 'dark')
											}
										}}
										isDark={isDark()}
									/>
								</div>
							</section>
						</Show>

						<Show
							when={
								activeMainCategory() === 'appearance' &&
								activeSubcategory() === 'highlights'
							}
						>
							<section style={settingsCompositeStyles.section(isDark())}>
								<h4 style={settingsCompositeStyles.sectionTitle(isDark())}>
									Syntax Highlighting
								</h4>
								<p style={settingsCompositeStyles.sectionDescription(isDark())}>
									Choose a color profile for code syntax highlighting.
								</p>

								<div
									style={{
										'margin-top': '24px'
									}}
								>
									<Select
										options={highlightProfiles.map(profile => ({
											value: profile.id,
											label: profile.label,
											description: profile.description
										}))}
										value={highlightsSettings().profile}
										onChange={value => handleHighlightsChange(value)}
										isDark={isDark()}
									/>
								</div>
							</section>
						</Show>

						<Show when={activeMainCategory() === 'fonts'}>
							<section style={settingsCompositeStyles.section(isDark())}>
								<h4 style={settingsCompositeStyles.sectionTitle(isDark())}>
									Fonts
								</h4>
								<p style={settingsCompositeStyles.sectionDescription(isDark())}>
									Customize font settings for the application.
								</p>
								<div style={settingsCompositeStyles.placeholder(isDark())}>
									Font settings coming soon...
								</div>
							</section>
						</Show>
					</div>
					</div>
				</Scrollbar>
			</div>
		</Settings>
	)
}
