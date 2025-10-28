import { JSX } from 'solid-js'

export interface ComponentTestConfig<T> {
  propName: keyof T
  validValues?: any[]
  invalidValues?: any[]
  renderFn: (Component: any, props: T) => any
}

export interface TestScenario<T> {
  description: string
  initialState?: (container: HTMLElement) => void
  stateChange?: (container: HTMLElement) => Promise<void> | void
  initialAssertions?: (container: HTMLElement) => void
  finalAssertions?: (container: HTMLElement) => void
}

export interface MockProps {
  [key: string]: any
}

export interface TestRenderOptions {
  container?: HTMLElement
  wrapper?: (props: { children: JSX.Element }) => JSX.Element
}

export interface ScrollbarTestData {
  content: string
  width: number
  height: number
  direction: 'horizontal' | 'vertical'
  showArrows: boolean
}
