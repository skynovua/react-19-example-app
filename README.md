# React 19 Demo with Prisma & SQLite

Сучасний React додаток з використанням найновіших технологій.

## 🚀 Технології

- **React 19** (Canary) - use hook, useTransition, Suspense
- **TypeScript** - Строга типізація
- **Vite 7** (Rolldown) - Швидкий білдер
- **TanStack Router** - Файлова маршрутизація
- **Tailwind CSS v4** - Утилітарні стилі
- **Prisma** - ORM для роботи з базою даних
- **SQLite** - Локальна база даних
- **React Compiler** - Автоматична оптимізація

## 📦 Встановлення

```bash
pnpm install
```

## 🗄️ База даних

### Ініціалізація та міграції

```bash
# Застосувати міграції
npx prisma migrate dev

# Заповнити базу даних тестовими даними
pnpm db:seed

# Відкрити Prisma Studio (GUI для перегляду даних)
pnpm db:studio
```

### Структура бази даних

**User** - Користувачі
- id, name, email, avatar, role
- bio, location, joinedDate
- website, github, twitter

**Post** - Пости
- id, title, excerpt, content
- publishedDate, readTime, tags
- authorId (зв'язок з User)

## 🛠️ Скрипти

### Development
```bash
pnpm dev          # Запустити Vite dev server
pnpm dev:server   # Запустити API server з hot reload
pnpm dev:all      # Запустити і frontend і backend одночасно
```

### Production
```bash
pnpm build              # Build frontend
pnpm build:server       # Build server
pnpm start              # Start production server
pnpm preview            # Preview production build
```

### Database
```bash
pnpm db:seed            # Заповнити БД даними (Faker)
pnpm db:push            # Синхронізувати схему з БД
pnpm db:migrate         # Застосувати міграції (production)
pnpm db:studio          # Відкрити Prisma Studio
pnpm prisma:generate    # Згенерувати Prisma Client
```

### Code Quality
```bash
pnpm lint         # ESLint перевірка
```

## ⚡ Швидкий старт

1. **Клонувати та встановити**

# Попередній перегляд білду
pnpm preview

# База даних
pnpm db:seed    # Заповнити БД даними
pnpm db:push    # Синхронізувати схему без міграцій
pnpm db:studio  # Відкрити Prisma Studio
```

## ⚡ Швидкий старт

```bash
# 1. Встановити залежності
pnpm install

# 2. Застосувати міграції та заповнити БД
npx prisma migrate dev
pnpm db:seed

# 3. Запустити dev сервери (фронтенд + API)
pnpm dev:all
```

Додаток буде доступний:
- Фронтенд: http://localhost:5173 (або 5174)
- API: http://localhost:3001

## 🎯 Особливості

### React 19 Features
- **use hook** - Розгортання промісів у компонентах
- **useTransition** - Плавні переходи при завантаженні
- **Suspense** - Декларативні стани завантаження
- **Error Boundaries** - Обробка помилок

### Dark Mode
- Автоматичне визначення системної теми
- Збереження у localStorage
- Перемикач у хедері

### Маршрутизація
- `/` - Головна сторінка з профілями користувачів
- `/about` - Про додаток
- `/posts/:postId` - Деталі посту

## 📁 Структура проекту

```
src/
├── api/           # API модуль
│   ├── client/    # HTTP клієнт та сервіси (браузер)
│   │   ├── httpClient.ts
│   │   ├── userService.ts
│   │   └── postService.ts
│   ├── server/    # Контролери та роути (Node.js)
│   │   ├── userController.ts
│   │   ├── postController.ts
│   │   └── routes.ts
│   ├── types/     # Спільні типи API
│   │   └── index.ts
│   └── README.md  # API документація
├── components/    # React компоненти
│   ├── ErrorBoundary.tsx
│   ├── LoadingFallback.tsx
│   └── UserProfile.tsx
├── data/          # Mock дані (для seed)
│   └── mockData.json
├── hooks/         # React хуки
│   ├── useUserData.ts
│   ├── usePostData.ts
│   └── index.ts
├── lib/           # Утиліти
│   └── prisma.ts
├── routes/        # TanStack Router сторінки
│   ├── __root.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── posts.tsx
│   └── posts.$postId.tsx
└── types.ts       # TypeScript типи

prisma/
├── schema.prisma  # Prisma схема
├── seed.ts        # Скрипт для заповнення БД
└── migrations/    # Міграції бази даних

server.ts          # Express API сервер
```

## 🏗️ API Архітектура

Проєкт використовує **Service-Oriented Architecture** з чітким розділенням:

- **Client Services** (`api/client/`) - HTTP запити для браузера
- **Server Controllers** (`api/server/`) - Бізнес-логіка та БД
- **Shared Types** (`api/types/`) - Спільні типи TypeScript

Детальна документація: [`src/api/README.md`](src/api/README.md)

## 🔧 Prisma Commands

```bash
# Створити нову міграцію
npx prisma migrate dev --name migration_name

# Застосувати міграції у продакшн
npx prisma migrate deploy

# Згенерувати Prisma Client
npx prisma generate

# Відкрити Prisma Studio
npx prisma studio

# Синхронізувати схему
npx prisma db push

# Скинути базу даних
npx prisma migrate reset
```

## 📝 Приклади використання

### API Services (прямі виклики)

```typescript
import { userService, postService } from './api/client';

// Отримати випадкового користувача
const userData = await userService.getRandomUser();

// Отримати пост за ID
const post = await postService.getPostById('1');

// Отримати всі пости
const posts = await postService.getAllPosts();
```

### React Hooks з кешуванням

```typescript
import { use } from 'react';
import { getUserDataPromise, getPostPromise, resetUserDataPromise } from './hooks';

// У React компоненті з Suspense
function UserProfile() {
  const { user, posts } = use(getUserDataPromise());
  return <div>{user.name}</div>;
}

// Скинути кеш для нового запиту
function handleRefresh() {
  resetUserDataPromise();
  // компонент автоматично перерендериться
}
```

### API Endpoints

```
GET /api/users/random    - Отримати випадкового користувача з постами
GET /api/posts           - Отримати всі пости
GET /api/posts/:id       - Отримати пост за ID
```

### Отримання даних з API

```typescript
// В браузері (React компоненти)
const response = await fetch('http://localhost:3001/api/users/random');
const data = await response.json();
```

### Робота з Prisma (server.ts)

```typescript
import { prisma } from './src/lib/prisma';

// Отримати пост з автором
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: { author: true },
});

// Отримати користувача з його постами
const user = await prisma.user.findFirst({
  include: {
    posts: {
      orderBy: { publishedDate: 'desc' },
    },
  },
});
```

### Використання use hook

```typescript
import { use } from 'react';

function Component({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.name}</div>;
}
```

## 🎨 Customization

Seed дані генеруються автоматично за допомогою `@faker-js/faker`. Редагуйте `prisma/seed.ts` для налаштування кількості користувачів та постів:

```typescript
const userCount = 10;          // Кількість користувачів
const postsPerUser = 2;        // Постів на користувача
```

Потім запустіть:

```bash
pnpm db:seed
```

---

## 🚀 Production Ready Features

### Безпека
- ✅ Rate limiting (express-rate-limit)
- ✅ CORS configured
- ✅ Error handling middleware
- ✅ Input validation готовність

### Performance
- ✅ Database indexes на часто використовуваних полях
- ✅ Умовне логування (production vs development)
- ✅ Graceful shutdown
- ✅ Connection pooling

### Monitoring
- ✅ Health check endpoint з DB verification
- ✅ Environment-based configuration
- ✅ Structured error responses

Детальніше: [`SCALABILITY.md`](SCALABILITY.md)

---

