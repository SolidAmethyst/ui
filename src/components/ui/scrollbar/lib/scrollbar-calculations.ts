// Scrollbar calculations and utilities
// Utility functions for scrollbar calculations
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max)
}

export function calculateThumbSize(
  containerSize: number,
  contentSize: number,
  minSize: number = 20
): number {
  if (contentSize <= containerSize) return 0
  
  const ratio = containerSize / contentSize
  const size = Math.max(minSize, containerSize * ratio)
  return Math.min(size, containerSize - 4) // Leave some padding
}

export function calculateThumbPosition(
  scrollPosition: number,
  maxScroll: number,
  thumbSize: number,
  trackSize: number
): number {
  if (maxScroll <= 0) return 0
  
  const maxThumbPos = trackSize - thumbSize
  const ratio = scrollPosition / maxScroll
  return clamp(ratio * maxThumbPos, 0, maxThumbPos)
}

export function calculateScrollPosition(
  thumbPosition: number,
  thumbSize: number,
  trackSize: number,
  maxScroll: number
): number {
  const maxThumbPos = trackSize - thumbSize
  if (maxThumbPos <= 0) return 0
  
  const ratio = thumbPosition / maxThumbPos
  return clamp(ratio * maxScroll, 0, maxScroll)
}

export function getZoomLevel(): number {
  return parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--zoom-level') || '1'
  )
}

export function adjustForZoom(value: number): number {
  return value / getZoomLevel()
}

export function scaleForZoom(value: number): number {
  return value * getZoomLevel()
}