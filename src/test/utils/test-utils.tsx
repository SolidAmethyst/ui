import { render as solidRender, RenderOptions } from '@solidjs/testing-library'
import { JSX } from 'solid-js'

// Re-export everything
export * from '@solidjs/testing-library'

// Custom render function with providers
const customRender = (
  ui: () => JSX.Element,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return solidRender(ui, {
    ...options,
    wrapper: ({ children }) => {
      return children as JSX.Element
    }
  })
}

// Re-export custom render as render
export { customRender as render }
