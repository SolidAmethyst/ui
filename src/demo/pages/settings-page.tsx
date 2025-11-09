/**
 * Settings Page
 * Full-page settings interface with left sidebar and right content
 */

import { Component, createMemo, createSignal, Show, For } from 'solid-js'
import { Slider } from '../../components/ui/slider'
import type { GlassSettings, MainCategory, AppearanceSubcategory } from '../../composites/settings/model/types'
import { settingsCompositeStyles } from '../../composites/settings/lib/settings-composite.styles'

interface SettingsPageProps {
	isDark: () => boolean
	glassSettings?: GlassSettings
	onGlassSettingsChange?: (settings: GlassSettings) => void
}

export const SettingsPage: Component<SettingsPageProps> = props => {
	const [activeMainCategory, setActiveMainCategory] = createSignal<MainCategory>('appearance')
	const [activeSubcategory, setActiveSubcategory] = createSignal<AppearanceSubcategory>('glass')

	const isDark = createMemo(() => props.isDark())

	const glassSettings = createMemo<GlassSettings>(() => ({
		enabled: props.glassSettings?.enabled ?? false,
		blur: props.glassSettings?.blur ?? 15,
		opacity: props.glassSettings?.opacity ?? 0.9,
		darkness: props.glassSettings?.darkness ?? 0.5,
		saturation: props.glassSettings?.saturation ?? 1.0
	}))

	const handleGlassChange = (key: keyof GlassSettings, value: boolean | number) => {
		if (props.onGlassSettingsChange) {
			props.onGlassSettingsChange({
				...glassSettings(),
				[key]: value
			})
		}
	}

	const mainCategories: Array<{ id: MainCategory; label: string; icon: string }> = [
		{ id: 'appearance', label: 'Appearance', icon: 'palette' },
		{ id: 'fonts', label: 'Fonts', icon: 'text_fields' }
	]

	const appearanceSubcategories: Array<{
		id: AppearanceSubcategory
		label: string
		icon: string
	}> = [
		{ id: 'glass', label: 'Glass', icon: 'blur' },
		{ id: 'theme', label: 'Theme', icon: 'dark_mode' }
	]

	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flex: '1',
				'min-width': '0',
				'box-sizing': 'border-box',
				overflow: 'hidden',
				background: 'transparent'
			}}
		>
			{/* Left Sidebar */}
			<aside style={settingsCompositeStyles.sidebar(isDark())}>
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
			</aside>

			{/* Content Area */}
			<div style={settingsCompositeStyles.content(isDark())}>
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
					<Show when={activeMainCategory() === 'appearance' && activeSubcategory() === 'glass'}>
						<section style={settingsCompositeStyles.section(isDark())}>
							<h4 style={settingsCompositeStyles.sectionTitle(isDark())}>
								Glass Effect
							</h4>
							<p style={settingsCompositeStyles.sectionDescription(isDark())}>
								Customize the glass effect appearance and intensity.
							</p>

							{/* Enable/Disable Checkbox */}
							<div style={settingsCompositeStyles.checkboxContainer(isDark())}>
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

							{/* Blur Slider */}
							<div style={settingsCompositeStyles.controlContainer(isDark())}>
								<Slider
									value={glassSettings().blur}
									min={0}
									max={50}
									step={1}
									label='Blur'
									formatValue={val => `${val}px`}
									isDark={isDark()}
									onChange={val => handleGlassChange('blur', val)}
								/>
							</div>

							{/* Opacity Slider */}
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

							{/* Darkness Slider */}
							<div style={settingsCompositeStyles.controlContainer(isDark())}>
								<Slider
									value={glassSettings().darkness * 100}
									min={0}
									max={100}
									step={1}
									label='Darkness'
									formatValue={val => `${val}%`}
									isDark={isDark()}
									onChange={val => handleGlassChange('darkness', val / 100)}
								/>
							</div>

							{/* Saturation Slider */}
							<div
								style={settingsCompositeStyles.controlContainer(isDark(), true)}
							>
								<Slider
									value={glassSettings().saturation * 100}
									min={0}
									max={200}
									step={1}
									label='Saturation'
									formatValue={val => `${val}%`}
									isDark={isDark()}
									onChange={val =>
										handleGlassChange('saturation', val / 100)
									}
								/>
							</div>
						</section>
					</Show>

					<Show when={activeMainCategory() === 'appearance' && activeSubcategory() === 'theme'}>
						<section style={settingsCompositeStyles.section(isDark(), true)}>
							<h4 style={settingsCompositeStyles.sectionTitle(isDark())}>
								Theme
							</h4>
							<p style={settingsCompositeStyles.sectionDescription(isDark())}>
								Customize theme settings for the application.
							</p>
							<div style={settingsCompositeStyles.placeholder(isDark())}>
								Theme settings coming soon...
							</div>
						</section>
					</Show>

					<Show when={activeMainCategory() === 'fonts'}>
						<section style={settingsCompositeStyles.section(isDark(), true)}>
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
		</div>
	)
}
