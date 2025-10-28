# Scrollbar Component System

Профессиональная система скроллбаров с централизованным управлением движком и гибкой настройкой.

## 🚀 Быстрый старт

### 1. Обернуть приложение в Provider

```tsx
import { ScrollbarProvider } from "@/shared/ui/scrollbar";

function App() {
  return <ScrollbarProvider>{/* Ваше приложение */}</ScrollbarProvider>;
}
```

### 2. Использовать компонент

```tsx
import { Scrollbar } from "@/shared/ui/scrollbar";

<Scrollbar>
  <div>Ваш контент</div>
</Scrollbar>;
```

## ⚙️ Централизованное управление

### Глобальное отключение движка

```tsx
import { scrollbarConfig } from "@/shared/ui/scrollbar";

// Отключить движок для всего приложения
scrollbarConfig.setEngineEnabled(false);

// Включить обратно
scrollbarConfig.setEngineEnabled(true);
```

### Настройка через Provider

```tsx
<ScrollbarProvider
  config={{
    engine: { enabled: false },
    theme: { name: "minimal" },
    performance: { debounceMs: 32 },
  }}
>
  <App />
</ScrollbarProvider>
```

## 🎨 Темы и стили

### Встроенные темы

- `default` - Стандартная тема
- `minimal` - Минималистичная
- `modern` - Современная

### Переключение темы

```tsx
import { useScrollbarSettings } from "@/shared/ui/scrollbar";

const { setTheme } = useScrollbarSettings();
setTheme("minimal");
```

## 🎛️ Панель управления

### Добавить кнопку настроек

```tsx
import { ScrollbarControls } from "@/shared/ui/scrollbar";

<ScrollbarControls class="fixed top-4 right-4" />;
```

## 🔧 Продвинутое использование

### Хуки для управления

```tsx
import { useScrollbarControl, useScrollbarState } from "@/shared/ui/scrollbar";

function MyComponent() {
  let containerRef: HTMLDivElement | undefined;

  const { scrollTo, scrollToTop, scrollToBottom } = useScrollbarControl(
    () => containerRef,
  );
  const { scrollPosition, isAtTop, isAtBottom } = useScrollbarState(
    () => containerRef,
  );

  return (
    <div>
      <button onClick={scrollToTop}>В начало</button>
      <button onClick={scrollToBottom}>В конец</button>
      <div>Позиция: {scrollPosition()}</div>
    </div>
  );
}
```

### Программное управление

```tsx
import { scrollbarConfig } from "@/shared/ui/scrollbar";

// Настройка производительности
scrollbarConfig.updateConfig({
  performance: {
    useRequestAnimationFrame: true,
    debounceMs: 16,
    throttleMs: 8,
  },
});

// Настройка доступности
scrollbarConfig.updateConfig({
  accessibility: {
    keyboardNavigation: true,
    screenReaderSupport: true,
    highContrast: false,
  },
});
```

## 🎯 Приоритет настроек

1. **Локальные props** - `engineIntegration={false}`
2. **Глобальная конфигурация** - `scrollbarConfig.setEngineEnabled(false)`
3. **Значения по умолчанию** - `engineIntegration: true`

## 📁 Структура FSD

```
src/shared/ui/scrollbar/
├── ui/
│   └── scrollbar.tsx          # Основной компонент
├── lib/
│   ├── scrollbar-config.ts    # Центральная конфигурация
│   ├── scrollbar-provider.tsx # Context Provider
│   ├── scrollbar-controls.tsx # Панель управления
│   ├── scrollbar-hooks.ts     # Полезные хуки
│   ├── scrollbar-engine.ts    # Интеграция с движком
│   └── scrollbar-calculations.ts # Утилиты вычислений
├── model/
│   └── types.ts               # Типы и интерфейсы
└── index.ts                   # Экспорты
```

## 🔄 Автоматическое определение

Система автоматически определяет доступность движка и переключается на JavaScript при необходимости.

```tsx
// Автоматическое определение (по умолчанию)
scrollbarConfig.updateConfig({
  engine: {
    enabled: true,
    autoDetect: true, // ← Автоматически определяет движок
    fallbackToJS: true, // ← Fallback на JS если движок недоступен
  },
});
```
