/**
 * Highlight Profile Context
 * Provides highlight profile to CodeHighlight components
 */

import { createContext, useContext, type Accessor } from 'solid-js'
import type { HighlightProfile } from '../../../composites/settings'

interface HighlightContextValue {
	profile: Accessor<HighlightProfile>
}

const HighlightContext = createContext<HighlightContextValue>()

export const useHighlightProfile = (): Accessor<HighlightProfile> => {
	const context = useContext(HighlightContext)
	return context?.profile ?? (() => 'default' as HighlightProfile)
}

export { HighlightContext }
