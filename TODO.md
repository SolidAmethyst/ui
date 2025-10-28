# TODO List

## ⏳ Pending

- [ ] Создать README с примерами использования Scrollbar компонента

## 📝 Как использовать Scrollbar

### Горизонтальный скролл

```tsx
<Scrollbar direction="horizontal" showArrows={true} autoHide={false}>
  <div style="white-space: nowrap;">Длинный текст...</div>
</Scrollbar>
```

### Вертикальный скролл

```tsx
<Scrollbar direction="vertical" showArrows={true} autoHide={false}>
  <div>Контент с вертикальным скроллом...</div>
</Scrollbar>
```

### Важно

- Обернуть приложение в `<ScrollbarProvider>`
- Использовать `direction='horizontal'` вместо `horizontal={true}`
- Использовать `direction='vertical'` вместо `vertical={true}`
