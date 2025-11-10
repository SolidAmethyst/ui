# 🚀 Миграция на Bun + Astro

Этот документ описывает миграцию проекта на Bun и Astro.

## 📋 Изменения

### 1. Bun как пакетный менеджер и runtime

- **Заменен npm на bun** в скриптах `package.json`
- **Добавлен `bun.lockb`** в `.gitignore`
- **Обновлены CI/CD workflows** для использования Bun

### 2. Astro интеграция

- **Добавлен Astro** с интеграцией Solid.js (`@astrojs/solid-js`)
- **Создан `astro.config.mjs`** с настройками для Solid.js и Tailwind
- **Создана структура Astro**:
  - `src/pages/` - Astro страницы
  - `src/layouts/` - Astro layouts
  - `src/env.d.ts` - TypeScript типы для Astro

### 3. Обновленные скрипты

```json
{
  "dev": "vite",                    // Старый Vite dev сервер
  "dev:astro": "astro dev",          // Новый Astro dev сервер
  "build": "vite build",             // Сборка библиотеки
  "build:astro": "astro build",      // Сборка Astro приложения
  "preview:astro": "astro preview"   // Превью Astro сборки
}
```

## 🔧 Использование

### Разработка с Vite (как раньше)

```bash
bun run dev
```

### Разработка с Astro

```bash
bun run dev:astro
```

### Сборка

```bash
# Сборка библиотеки
bun run build

# Сборка Astro приложения
bun run build:astro
```

## 📁 Структура

```
src/
├── components/     # UI компоненты (как раньше)
├── demo/           # Демо приложение (работает с Vite и Astro)
├── pages/          # Astro страницы (новое)
└── layouts/         # Astro layouts (новое)
```

## ⚠️ Важные замечания

1. **Демо приложение** (`src/demo/index.tsx`) теперь экспортирует компонент для использования в Astro
2. **Vite конфигурация** остается без изменений для обратной совместимости
3. **CI/CD** обновлен для использования Bun, но npm publish остается для совместимости с GitHub Packages

## 🎯 Преимущества

- **Быстрая установка зависимостей** с Bun
- **Статическая генерация** документации с Astro
- **Оптимизация производительности** для production
- **Совместимость** с существующим кодом
