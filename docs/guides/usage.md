# Как использовать Solid UI Toolkit

## 🚀 Быстрый старт

### 1. Добавить компонент в проект

```bash
# Из папки solid-ui-toolkit
node scripts/add-component.js scrollbar

# Или указать путь к проекту
node scripts/add-component.js scrollbar "F:\Workspace\L2_Dev\Luminary_V2\lineage2-toolkit"
```

### 2. Использовать в коде

```tsx
import { Scrollbar } from "./shared/ui/scrollbar";

function MyComponent() {
  return (
    <Scrollbar direction="horizontal" showArrows={false}>
      <div>Your content here</div>
    </Scrollbar>
  );
}
```

## 📦 Доступные компоненты

- **Scrollbar** - Кастомный скроллбар с Material 3 стилизацией

## 🛠️ Разработка

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать библиотеку
npm run build

# Запустить Storybook
npm run storybook
```

## 📁 Структура после добавления

```
your-project/
├── src/
│   └── shared/
│       └── ui/
│           └── scrollbar/
│               ├── ui/
│               │   └── scrollbar.tsx
│               ├── lib/
│               │   ├── scrollbar-calculations.ts
│               │   ├── scrollbar-engine.ts
│               │   ├── scrollbar.styles.ts
│               │   ├── use-scrollbar-handlers.ts
│               │   ├── use-scrollbar-logic.ts
│               │   ├── use-scrollbar-observers.ts
│               │   └── use-scrollbar-state.ts
│               ├── model/
│               │   └── types.ts
│               └── index.tsx
```

## 🎨 Стилизация

Компоненты используют Tailwind CSS. Убедитесь, что в вашем проекте настроен Tailwind.

## 🔄 Обновление компонентов

Чтобы обновить компонент, просто запустите команду добавления заново - файлы будут перезаписаны.

## 📝 Добавление новых компонентов

1. Создайте папку в `src/components/ui/your-component/`
2. Добавьте экспорт в `src/index.ts`
3. Обновите `scripts/add-component.js` если нужно
4. Создайте Storybook story
