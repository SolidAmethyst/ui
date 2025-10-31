# 🚀 Настройка GitHub для CI/CD

## 1. 📦 Создание репозитория

### Создайте новый репозиторий на GitHub:

- **Repository name:** `solid-ui-toolkit`
- **Description:** `Beautiful Solid.js components built with Tailwind CSS`
- **Visibility:** Public (для бесплатного GitHub Packages)
- **Initialize:** НЕ ставьте галочки (у вас уже есть код)

## 2. 🔧 Настройка репозитория

### В Settings → General:

- ✅ **Issues** - включить
- ✅ **Projects** - включить
- ✅ **Wiki** - включить (опционально)

### В Settings → Actions → General:

- ✅ **Allow all actions and reusable workflows**
- ✅ **Allow actions created by GitHub**
- ✅ **Allow actions by Marketplace verified creators**

## 3. 📋 Настройка Packages

### В Settings → Actions → General:

- ✅ **Workflow permissions** → **Read and write permissions**
- ✅ **Allow GitHub Actions to create and approve pull requests**

### В Settings → Actions → General → Workflow permissions:

- ✅ **Read and write permissions**
- ✅ **Allow GitHub Actions to create and approve pull requests**

## 4. 🔐 Секреты (уже настроены)

### В Settings → Secrets and variables → Actions:

- ✅ `GITHUB_TOKEN` - уже есть по умолчанию
- ❌ `NPM_TOKEN` - НЕ нужен (используем GitHub Packages)

## 5. 🚀 Запуск CI/CD

### После пуша в main:

```bash
git add .
git commit -m "feat: setup CI/CD for GitHub Packages"
git push origin main
```

### Что произойдет:

1. **Actions** → запустится workflow
2. **Packages** → появится пакет `@solid-ui-toolkit/solid-ui-toolkit`
3. **Dependabot** → начнет проверять зависимости

## 6. 📦 Использование пакета

### Установка:

```bash
npm install @solid-ui-toolkit/solid-ui-toolkit
```

### Использование:

```tsx
import {
  Scrollbar,
  ScrollbarProvider,
} from "@solid-ui-toolkit/solid-ui-toolkit";

function App() {
  return (
    <ScrollbarProvider>
      <Scrollbar direction="horizontal" showArrows={true}>
        <div>Your content</div>
      </Scrollbar>
    </ScrollbarProvider>
  );
}
```

## 7. 🔍 Проверка

### После первого пуша проверьте:

- **Actions** → должен быть зеленый статус
- **Packages** → должен появиться пакет
- **Dependabot** → должен создать PR с обновлениями

## 8. 🎯 Что дальше

### Для разработки:

1. Создайте ветку `develop`
2. Делайте изменения в `develop`
3. Создавайте PR в `main`
4. После мержа в `main` → автоматический релиз

### Для релиза:

1. Пуш в `main` = автоматический релиз
2. Версия обновляется автоматически
3. Пакет публикуется в GitHub Packages

---

**Готово! Теперь у вас профессиональный CI/CD!** 🎉
