# React Hooks

Кастомні хуки для роботи з API та кешуванням даних.

## 📦 Доступні хуки

### useUserData

Хук для роботи з даними користувачів.

```typescript
import { getUserDataPromise, resetUserDataPromise } from '@/hooks';
import { use } from 'react';

function UserProfile() {
  // Отримує дані з кешу або робить новий запит
  const { user, posts } = use(getUserDataPromise());
  
  return <div>{user.name}</div>;
}

function RefreshButton() {
  const handleRefresh = () => {
    // Скидає кеш і змушує компонент перезавантажити дані
    resetUserDataPromise();
  };
  
  return <button onClick={handleRefresh}>Refresh</button>;
}
```

**Функції:**
- `getUserDataPromise()` - Отримує або створює promise для даних користувача
- `resetUserDataPromise()` - Очищає кеш, змушує зробити новий запит

### usePostData

Хук для роботи з даними постів з підтримкою кешування за ID.

```typescript
import { getPostPromise, clearPostCache } from '@/hooks';
import { use } from 'react';

function PostDetail({ postId }: { postId: string }) {
  // Отримує пост з кешу або робить новий запит
  const post = use(getPostPromise(postId));
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

function ClearCacheButton() {
  const handleClear = () => {
    // Очистити конкретний пост
    clearPostCache('1');
    
    // Або очистити весь кеш постів
    clearPostCache();
  };
  
  return <button onClick={handleClear}>Clear Cache</button>;
}
```

**Функції:**
- `getPostPromise(postId)` - Отримує або створює promise для конкретного поста
- `clearPostCache(postId?)` - Очищає кеш для конкретного поста або всіх постів

## 🎯 Переваги

### 1. Автоматичне кешування
Дані зберігаються в пам'яті і не запитуються повторно:

```typescript
// Перший виклик - робить HTTP запит
const data1 = use(getUserDataPromise());

// Другий виклик - використовує кешований результат
const data2 = use(getUserDataPromise());
```

### 2. Простий скид кешу
Легко оновити дані без складної логіки:

```typescript
// Просто викличте reset
resetUserDataPromise();
// Наступний use() зробить новий запит
```

### 3. Працює з React Suspense
Автоматично показує fallback під час завантаження:

```tsx
<Suspense fallback={<Loading />}>
  <UserProfile />
</Suspense>
```

### 4. Type-safe
Повна підтримка TypeScript:

```typescript
const { user, posts }: UserWithPostsResponse = use(getUserDataPromise());
```

## 🔄 Життєвий цикл

```
Component Render
    ↓
use(getUserDataPromise())
    ↓
Promise існує? ─── НІ ──→ Створити новий Promise
    │                       ↓
    │                   userService.getRandomUser()
    │                       ↓
    │                   HTTP запит
    │                       ↓
    │                   Зберегти в кеші
    ↓                       ↓
   ТАК ──────────────────────┘
    ↓
Повернути дані з кешу
    ↓
Component відрендерений
```

## 🧪 Тестування

```typescript
import { getUserDataPromise, resetUserDataPromise } from '@/hooks';

// Mock сервіс
jest.mock('@/api/client', () => ({
  userService: {
    getRandomUser: jest.fn().mockResolvedValue({
      user: { id: 1, name: 'Test' },
      posts: []
    })
  }
}));

test('getUserDataPromise повертає дані', async () => {
  const promise = getUserDataPromise();
  const data = await promise;
  
  expect(data.user.name).toBe('Test');
});

test('resetUserDataPromise очищає кеш', async () => {
  getUserDataPromise(); // Створює кеш
  resetUserDataPromise(); // Очищує
  
  const newPromise = getUserDataPromise(); // Створює новий
  expect(newPromise).not.toBe(oldPromise);
});
```

## 📊 Порівняння з альтернативами

### Без хуків (прямі виклики сервісу)
```typescript
// ❌ Немає кешування
// ❌ Повторні запити при ререндерах
// ❌ Складна інтеграція з Suspense
const [data, setData] = useState(null);
useEffect(() => {
  userService.getRandomUser().then(setData);
}, []);
```

### З нашими хуками
```typescript
// ✅ Автоматичне кешування
// ✅ Один запит для множини рендерів
// ✅ Нативна робота з Suspense
const data = use(getUserDataPromise());
```

### З React Query / SWR
```typescript
// ✅ Більше функцій (revalidation, mutations)
// ❌ Додаткова залежність
// ❌ Більше boilerplate
const { data } = useQuery('user', userService.getRandomUser);
```

## 💡 Коли використовувати

**Використовуйте наші хуки коли:**
- Потрібне просте кешування
- Працюєте з React 19 Suspense
- Хочете мінімум залежностей
- Дані рідко змінюються

**Використовуйте React Query/SWR коли:**
- Потрібна автоматична ревалідація
- Складні мутації з optimistic updates
- Потрібна пагінація/infinite scroll
- Offline support

## 🔧 Внутрішня імплементація

### useUserData.ts
```typescript
let userDataPromise: Promise<UserWithPostsResponse> | null = null;

export function getUserDataPromise() {
  if (!userDataPromise) {
    userDataPromise = userService.getRandomUser();
  }
  return userDataPromise;
}

export function resetUserDataPromise() {
  userDataPromise = null;
}
```

### usePostData.ts
```typescript
const postPromiseCache = new Map<string, Promise<PostResponse>>();

export function getPostPromise(postId: string) {
  let promise = postPromiseCache.get(postId);
  
  if (!promise) {
    promise = postService.getPostById(postId);
    postPromiseCache.set(postId, promise);
  }
  
  return promise;
}
```

Проста, ефективна, type-safe! 🎉
