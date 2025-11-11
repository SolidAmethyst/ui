/**
 * Syntax Highlighting Color Profiles
 * Color schemes for different highlight profiles
 */

import type { HighlightProfile } from '../../../composites/settings'

export interface HighlightColors {
	comment: string
	string: string
	keyword: string
	attribute: string
	operator: string
	tag: string
}

export const highlightProfiles: Record<HighlightProfile, HighlightColors> = {
	default: {
		comment: '#6a9955',
		string: '#ce9178',
		keyword: '#569cd6',
		attribute: '#9cdcfe',
		operator: '#d4d4d4',
		tag: '#569cd6'
	},
	monokai: {
		comment: '#75715e',
		string: '#e6db74',
		keyword: '#f92672',
		attribute: '#a6e22e',
		operator: '#f8f8f2',
		tag: '#f92672'
	},
	dracula: {
		comment: '#6272a4',
		string: '#f1fa8c',
		keyword: '#ff79c6',
		attribute: '#50fa7b',
		operator: '#f8f8f2',
		tag: '#ff79c6'
	},
	github: {
		comment: '#6a737d',
		string: '#032f62',
		keyword: '#d73a49',
		attribute: '#005cc5',
		operator: '#d73a49',
		tag: '#22863a'
	},
	'vs-code': {
		comment: '#6a9955',
		string: '#ce9178',
		keyword: '#569cd6',
		attribute: '#9cdcfe',
		operator: '#d4d4d4',
		tag: '#569cd6'
	},
	'one-dark': {
		comment: '#5c6370',
		string: '#98c379',
		keyword: '#c678dd',
		attribute: '#e06c75',
		operator: '#56b6c2',
		tag: '#e06c75'
	}
}

/**
 * Get highlight colors for a profile
 */
export const getHighlightColors = (profile: HighlightProfile): HighlightColors => {
	return highlightProfiles[profile]
}
