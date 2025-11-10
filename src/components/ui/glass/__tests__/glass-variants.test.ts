import { describe, expect, it } from 'vitest'
import { glassVariants } from '../lib/glass-variants'

describe('glassVariants', () => {
	it('returns default glass-container class', () => {
		const result = glassVariants()
		expect(result).toContain('glass-container')
	})

	it('returns glass-mica for mica variant', () => {
		const result = glassVariants({ variant: 'mica' })
		expect(result).toContain('glass-container')
		expect(result).toContain('glass-mica')
	})

	it('returns glass-acrylic for acrylic variant', () => {
		const result = glassVariants({ variant: 'acrylic' })
		expect(result).toContain('glass-container')
		expect(result).toContain('glass-acrylic')
	})

	it('returns glass-blur for blur variant', () => {
		const result = glassVariants({ variant: 'blur' })
		expect(result).toContain('glass-container')
		expect(result).toContain('glass-blur')
	})

	it('returns glass-matte for matte variant', () => {
		const result = glassVariants({ variant: 'matte' })
		expect(result).toContain('glass-container')
		expect(result).toContain('glass-matte')
	})

	it('returns glass-auto for auto variant', () => {
		const result = glassVariants({ variant: 'auto' })
		expect(result).toContain('glass-container')
		expect(result).toContain('glass-auto')
	})

	it('adds glass-dark class when isDark is true', () => {
		const result = glassVariants({ isDark: true })
		expect(result).toContain('glass-dark')
		expect(result).not.toContain('glass-light')
	})

	it('adds glass-light class when isDark is false', () => {
		const result = glassVariants({ isDark: false })
		expect(result).toContain('glass-light')
		expect(result).not.toContain('glass-dark')
	})

	it('adds glass-native class when useNative is true', () => {
		const result = glassVariants({ useNative: true })
		expect(result).toContain('glass-native')
		expect(result).not.toContain('glass-css')
	})

	it('adds glass-css class when useNative is false', () => {
		const result = glassVariants({ useNative: false })
		expect(result).toContain('glass-css')
		expect(result).not.toContain('glass-native')
	})

	it('includes custom class names', () => {
		const result = glassVariants({ class: 'custom-class' })
		expect(result).toContain('custom-class')
	})

	it('combines multiple options', () => {
		const result = glassVariants({
			variant: 'mica',
			isDark: true,
			useNative: true,
			class: 'custom'
		})
		expect(result).toContain('glass-container')
		expect(result).toContain('glass-mica')
		expect(result).toContain('glass-dark')
		expect(result).toContain('glass-native')
		expect(result).toContain('custom')
	})

	it('handles all variants correctly', () => {
		const variants = ['mica', 'acrylic', 'blur', 'matte', 'auto'] as const

		variants.forEach(variant => {
			const result = glassVariants({ variant })
			expect(result).toBeTruthy()
			expect(typeof result).toBe('string')
			expect(result).toContain('glass-container')
		})
	})
})
