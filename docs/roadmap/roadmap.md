# Роадмап проекта

План развития Solid UI Toolkit и переноса компонентов из physics-engine-tauri-demo.

## 🎯 Текущий статус

### ✅ Завершено

- [x] Базовая архитектура Solid.js + TypeScript
- [x] Компонент Button (базовые варианты: control, play-pause, small, close, minimize, maximize)
- [x] Компонент Scrollbar (вертикальный и горизонтальный)
- [x] Компонент TechChip
- [x] Система темизации (dark/light)
- [x] Демо приложение с примерами использования
- [x] Система тестирования (Vitest)
- [x] CI/CD pipeline
- [x] Базовая документация

## 🚀 Ближайшие планы - Перенос компонентов из physics-engine-tauri-demo

### 🔴 Высокий приоритет

#### 1. Расширение компонента Button

- [ ] **Добавить вариант Button для pin (скрепка)**

  - Добавить `variant: 'pin'` в типы Button
  - Добавить стили для pin кнопки
  - Поддержка состояния `pinned` (уже есть prop, нужно доработать стили)
  - Иконка `push_pin` из Material Symbols
  - Hover эффекты (синий цвет #3b82f6)
  - Active состояние

- [ ] **Добавить кнопки для debug меню**
  - Кнопка expand (вариант или отдельный компонент)
    - Иконка: `open_in_full` (диагональные стрелки)
    - Стили: `expand-logs-btn` из Tauri проекта
    - Размер: 26x26px
    - Hover: синий цвет #3b82f6
  - Кнопка copy (вариант или отдельный компонент)
    - Иконка: `content_copy` (два квадрата)
    - Стили: `copy-logs-btn` из Tauri проекта
    - Размер: 26x26px
    - Hover: синий цвет #3b82f6
  - Решение: создать общий вариант `variant: 'icon-action'` или отдельные `'expand'`, `'copy'`

#### 2. Компонент Checkbox

- [ ] **Создать компонент Checkbox**
  - Структура по FSD:
    - `src/components/ui/checkbox/`
    - `model/types.ts` - типы и интерфейсы
    - `lib/checkbox.styles.ts` - стили
    - `ui/checkbox.tsx` - основной компонент
    - `__tests__/checkbox.test.tsx` - тесты
    - `index.ts` - экспорты
  - Props:
    - `checked?: boolean`
    - `disabled?: boolean`
    - `onChange?: (checked: boolean) => void`
    - `label?: string`
    - `class?: string`
  - Стили из Tauri проекта:
    - Размер: 18x18px
    - Border: none
    - Background: transparent
    - Checkmark: синий #3b82f6 при checked
    - Плавные переходы
  - Состояния:
    - Default (unchecked): прозрачный фон, тонкая синяя линия
    - Checked: прозрачный фон, синяя галочка (rotate 45deg)
    - Disabled: opacity 0.5
    - Hover: легкий фон rgba(255, 255, 255, 0.15)
  - Тесты:
    - Рендеринг с checked/unchecked
    - Обработка onChange
    - Disabled состояние
    - Keyboard navigation

### 🟡 Средний приоритет

#### 3. Компоненты Debug панели

- [ ] **Создать компонент DebugPanel**

  - Заголовок с FPS counter
  - Секция TechChip статусов
  - Секция Gradient Info
  - Секция Logs с кнопками expand/copy
  - Закрытие панели
  - Позиционирование и стили из Tauri проекта

- [ ] **Создать компонент LogsPanel**

  - Полноэкранная панель логов
  - Заголовок с кнопками copy и collapse
  - Прокручиваемый список логов
  - Стилизация разных типов логов (physics, init, error)
  - Overlay фоновый слой

- [ ] **Создать компонент SettingsMenu**
  - Попап меню настроек
  - Использование Checkbox компонента
  - Настройки: Maximize Button, Window Resize
  - Закрытие меню

#### 4. Компонент TitleBar

- [ ] **Создать компонент TitleBar**
  - Burger menu button
  - Draggable title area
  - Small control buttons (theme, debug, pin, settings)
  - Window controls (minimize, maximize, close)
  - Поддержка Tauri drag region
  - Адаптация под веб (без drag region)
  - Стили из Tauri проекта

### 🟢 Низкий приоритет

#### 5. Дополнительные утилиты

- [ ] **Иконки Material Symbols**

  - Система загрузки иконок
  - Типизация доступных иконок
  - Оптимизация загрузки

- [ ] **Утилиты для темизации**
  - CSS переменные для всех компонентов
  - Автоматическое переключение тем
  - Сохранение предпочтений темы

## 📋 Детальный план реализации

### Этап 1: Button расширение (Текущая задача)

1. **Добавить variant 'pin'**

   ```typescript
   export type ButtonVariant =
   	| 'control'
   	| 'play-pause'
   	| 'small'
   	| 'pin' // Новый
   	| 'close'
   	| 'minimize'
   	| 'maximize'
   ```

2. **Добавить варианты для debug кнопок**

   ```typescript
   export type ButtonVariant =
     | ...
     | 'expand'  // Новый
     | 'copy'    // Новый
   ```

   Или создать отдельный тип `IconButtonVariant`

3. **Обновить стили**

   - Добавить стили для `pin` в `button.styles.ts`
   - Добавить стили для `expand` и `copy`
   - Убедиться, что размеры и hover эффекты соответствуют Tauri проекту

4. **Обновить демо**
   - Добавить примеры новых вариантов в `buttons-section.tsx`

### Этап 2: Checkbox компонент

1. **Создать структуру папок**

   ```
   src/components/ui/checkbox/
   ├── __tests__/
   │   └── checkbox.test.tsx
   ├── lib/
   │   └── checkbox.styles.ts
   ├── model/
   │   └── types.ts
   ├── ui/
   │   └── checkbox.tsx
   └── index.ts
   ```

2. **Реализовать компонент**

   - Типы и интерфейсы
   - Стили (точная копия из Tauri проекта)
   - Логика checked/unchecked
   - Keyboard support (Space, Enter)

3. **Тесты**

   - Все состояния и взаимодействия

4. **Добавить в демо**
   - Примеры использования в новой секции

### Этап 3: Debug панель

1. **Создать компонент DebugPanel**
2. **Создать компонент LogsPanel**
3. **Интегрировать в демо**

### Этап 4: TitleBar

1. **Создать компонент TitleBar**
2. **Интегрировать в демо**

## 🎯 Метрики успеха

### 🎨 UI/UX

- **Соответствие стилям**: 100% соответствие Tauri проекту
- **Темизация**: Полная поддержка dark/light тем
- **Доступность**: Keyboard navigation, ARIA атрибуты

### 🔧 Технические

- **Тесты**: > 80% покрытие
- **TypeScript**: Строгая типизация, нет `any`
- **Производительность**: Рендеринг < 16ms (60 FPS)

### 📚 Документация

- **API документация**: Полное описание всех props
- **Примеры**: Минимум 3 примера на компонент
- **Руководства**: Пошаговые инструкции

## 🗓️ Временные рамки

| Задача                          | Оценка | Приоритет | Статус         |
| ------------------------------- | ------ | --------- | -------------- |
| Button variant 'pin'            | 2ч     | Высокий   | ⏳ Планируется |
| Button variants 'expand'/'copy' | 2ч     | Высокий   | ⏳ Планируется |
| Checkbox компонент              | 4ч     | Высокий   | ⏳ Планируется |
| DebugPanel компонент            | 6ч     | Средний   | ⏳ Планируется |
| LogsPanel компонент             | 4ч     | Средний   | ⏳ Планируется |
| SettingsMenu компонент          | 3ч     | Средний   | ⏳ Планируется |
| TitleBar компонент              | 8ч     | Средний   | ⏳ Планируется |

**Общая оценка**: ~29 часов

## 🎯 Приоритеты

### Критический (делать в первую очередь)

1. ✅ Button variant 'pin'
2. ✅ Button variants 'expand'/'copy'
3. ✅ Checkbox компонент

### Важный (следующий этап)

4. DebugPanel компонент
5. LogsPanel компонент
6. SettingsMenu компонент

### Желательный (когда будет время)

7. TitleBar компонент
8. Утилиты для иконок
9. Расширенная темизация

## 📝 Примечания

- Все компоненты должны следовать FSD архитектуре
- Стили должны точно соответствовать Tauri проекту
- Обязательны тесты для всех компонентов
- Документация должна быть актуальной
- Примеры в демо обязательны

---

**Последнее обновление**: Декабрь 2024
**Ответственный**: Development Team
**Следующий обзор**: После завершения текущих задач
