# Scrollbar Component Layout Issues

## Overview

This document describes common layout issues encountered when integrating the custom `Scrollbar` component into different container contexts, specifically within modal dialogs and flexbox layouts. Understanding these patterns is crucial for preventing scrollbar functionality failures.

## Problem Statement

The custom `Scrollbar` component may fail to function correctly (wheel events, drag, arrow clicks) when integrated into certain layout contexts, despite working correctly in other parts of the application. This typically manifests as:

- Wheel scrolling not affecting content
- Scrollbar thumb dragging without content movement
- Arrow buttons not scrolling content
- Native browser scrollbar appearing instead of custom scrollbar

## Root Causes

### 1. Native Scrollbar Interference

**Symptom**: Custom scrollbar appears but doesn't respond to wheel events.

**Cause**: Parent containers with `overflow: auto` or `overflow: scroll` create native browser scrollbars that intercept wheel events before they reach the custom scrollbar's event handlers.

**Solution**: Ensure parent containers use `overflow: visible` or `overflow: hidden` instead of `overflow: auto`.

```typescript
// ❌ Incorrect - creates native scrollbar
content: (): JSX.CSSProperties => ({
  flex: '1',
  overflow: 'auto',  // Native scrollbar intercepts events
  display: 'flex',
  'flex-direction': 'column'
})

// ✅ Correct - allows custom scrollbar to handle events
content: (): JSX.CSSProperties => ({
  flex: '1',
  overflow: 'visible',  // No native scrollbar interference
  display: 'flex',
  'flex-direction': 'column'
})
```

### 2. Flexbox Height Constraints

**Symptom**: Content doesn't overflow, scrollbar never appears, or scrollbar appears but doesn't scroll.

**Cause**: Missing explicit height constraints in flexbox layouts prevent proper overflow calculation. The `Scrollbar` component needs:
- A parent with explicit height (not just `max-height`)
- The scrollable content area to have constrained dimensions
- Proper flex properties to allow content to grow beyond container

**Solution Pattern**:

```typescript
// Parent container - explicit height required
<aside style={{ height: 'calc(100vh - 60px)' }}>
  <Scrollbar style={{ height: '100%', flex: '1', 'min-height': '0' }}>
    {/* Content that can overflow */}
  </Scrollbar>
</aside>
```

**Key Points**:
- Parent must have explicit `height` (not just `max-height`)
- `Scrollbar` should have `height: '100%'` to fill parent
- `min-height: 0` on flex children prevents flexbox from preventing overflow
- Inner content wrapper should NOT have `height: '100%'` as it prevents content from growing

### 3. Conflicting Flex Properties

**Symptom**: Scrollbar container has fixed height but also `flex: 1`, causing layout conflicts.

**Cause**: Mixing fixed dimensions (`height: '300px'`) with flex properties (`flex: '1'`) creates conflicting layout constraints.

**Solution**: Use either fixed dimensions OR flex properties, not both.

```typescript
// ❌ Incorrect - conflicting constraints
checkboxListScrollable: (): JSX.CSSProperties => ({
  'max-height': '300px',
  height: '300px',
  'flex': '1',  // Conflicts with fixed height
  'overflow': 'hidden'
})

// ✅ Correct - choose one approach
// Option 1: Fixed dimensions
checkboxListScrollable: (): JSX.CSSProperties => ({
  height: '300px',
  width: '100%',
  'overflow': 'hidden',
  position: 'relative'
})

// Option 2: Flex-based (if parent is flex container)
checkboxListScrollable: (): JSX.CSSProperties => ({
  flex: '1',
  'min-height': '0',
  'overflow': 'hidden',
  position: 'relative'
})
```

## Real-World Examples

### Example 1: FilterPanel in Modal

**Context**: `Scrollbar` used within a modal dialog's content area.

**Problem**: Modal's `content` style had `overflow: 'auto'`, creating native scrollbar that intercepted wheel events.

**Fix**:
```typescript
// src/composites/filter/lib/filter-panel.styles.ts
content: (): JSX.CSSProperties => ({
  flex: '1',
  overflow: 'visible',  // Changed from 'auto'
  display: 'flex',
  'flex-direction': 'column'
})
```

**Additional Fix**: Removed conflicting `flex: '1'` from scrollbar wrapper with fixed height:
```typescript
checkboxListScrollable: (): JSX.CSSProperties => ({
  'max-height': '300px',
  height: '300px',
  // Removed: 'flex': '1',
  'overflow': 'hidden',
  position: 'relative'
})
```

### Example 2: Sidebar Navigation

**Context**: `Scrollbar` used in sidebar navigation with flexbox layout.

**Problem**:
1. Parent `<aside>` had only `max-height` without explicit `height`
2. Inner content wrapper had `height: '100%'` preventing content overflow
3. `Scrollbar` lacked explicit height constraint

**Fix**:
```typescript
// src/demo/components/layout/sidebar.tsx

// 1. Parent with explicit height
<aside style={{ height: 'calc(100vh - 60px)', 'min-height': '0' }}>

  // 2. Scrollbar with height constraint
  <Scrollbar
    style={{
      height: '100%',
      flex: '1',
      'min-height': '0'
    }}
  >
    {/* 3. Inner wrapper WITHOUT height: 100% */}
    <div style={{ padding: '8px 0 0 0' }}>
      {/* Content that can overflow */}
    </div>
  </Scrollbar>
</aside>
```

## Prevention Checklist

When integrating `Scrollbar` component, verify:

- [ ] Parent containers use `overflow: 'visible'` or `overflow: 'hidden'`, NOT `overflow: 'auto'` or `overflow: 'scroll'`
- [ ] If using flexbox, parent has explicit `height` (not just `max-height`)
- [ ] `Scrollbar` component has `height: '100%'` when parent has explicit height
- [ ] `Scrollbar` has `min-height: 0` when used in flex containers
- [ ] Inner content wrappers do NOT have `height: '100%'` (allows content to overflow)
- [ ] Fixed dimensions and flex properties are not mixed on the same element
- [ ] Content actually overflows the container (check `scrollHeight > clientHeight`)

## Debugging Steps

1. **Check for native scrollbars**: Inspect computed styles of parent containers for `overflow: auto` or `overflow: scroll`
2. **Verify height constraints**: Ensure parent has explicit `height`, not just `max-height`
3. **Inspect flex properties**: Check for conflicting `flex` and fixed dimension properties
4. **Test overflow**: Verify content actually overflows by checking `scrollHeight > clientHeight` in DevTools
5. **Check event propagation**: Use browser DevTools to verify wheel events reach the scrollbar's event handlers

## Related Components

- `Scrollbar` component: `src/components/ui/scrollbar/`
- `Modal` component: `src/components/ui/modal/`
- `FilterPanel` composite: `src/composites/filter/`

## References

- [MDN: CSS Overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS-Tricks: min-height on flex items](https://css-tricks.com/preventing-a-grid-blowout/)

---

**Last Updated**: December 2024
**Component Version**: 1.0.0
