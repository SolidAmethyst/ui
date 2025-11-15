# TODO List

## ⏳ Pending

- [ ] Create README with Scrollbar component usage examples

## 📝 How to Use Scrollbar

### Horizontal Scroll

```tsx
<Scrollbar direction="horizontal" showArrows={true} autoHide={false}>
  <div style="white-space: nowrap;">Long text...</div>
</Scrollbar>
```

### Vertical Scroll

```tsx
<Scrollbar direction="vertical" showArrows={true} autoHide={false}>
  <div>Content with vertical scroll...</div>
</Scrollbar>
```

### Important

- Wrap application in `<ScrollbarProvider>`
- Use `direction='horizontal'` instead of `horizontal={true}`
- Use `direction='vertical'` instead of `vertical={true}`
