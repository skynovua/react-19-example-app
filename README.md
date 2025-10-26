# React 19 Example App with Prisma & SQLite

A modern React application showcasing the latest technologies and features.

## 🚀 Technologies

- **React 19** - Latest features including `use` hook, `useTransition`, and Suspense
- **TypeScript** - Strong typing and enhanced developer experience
- **Vite 7** (Rolldown) - Fast build tool and development server
- **TanStack Router** - File-based routing system
- **Tailwind CSS v4** - Utility-first CSS framework
- **Prisma** - Next-generation ORM for database management
- **SQLite** - Embedded database for local development
- **React Compiler** - Automatic optimization and memoization
- **Express** - Backend API server with middleware support

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Apply database migrations
npx prisma migrate dev

# Seed database with sample data
pnpm db:seed
```

## 🗄️ Database

### Database Structure

**User Table** - User profiles
- `id`, `name`, `email`, `avatar`, `role`
- `bio`, `location`, `joinedDate`
- `website`, `github`, `twitter`

**Post Table** - Blog posts
- `id`, `title`, `excerpt`, `content`
- `publishedDate`, `readTime`, `tags`
- `authorId` (relation to User)

### Database Commands

```bash
# Apply migrations
npx prisma migrate dev

# Seed database with test data
pnpm db:seed

# Open Prisma Studio (GUI for data viewing)
pnpm db:studio

# Push schema changes without migrations
pnpm db:push

# Generate Prisma Client
pnpm prisma:generate
```

## 🛠️ Available Scripts

### Development
```bash
pnpm dev          # Start Vite development server
pnpm dev:server   # Start API server with hot reload
pnpm dev:all      # Start both frontend and backend concurrently
```

### Production
```bash
pnpm build              # Build frontend for production
pnpm build:server       # Build server for production
pnpm start              # Start production server
pnpm preview            # Preview production build
```

### Database
```bash
pnpm db:seed            # Seed database with Faker data
pnpm db:push            # Push schema changes to database
pnpm db:migrate         # Apply migrations (production)
pnpm db:studio          # Open Prisma Studio
pnpm prisma:generate    # Generate Prisma Client
```

### Code Quality
```bash
pnpm lint         # Run ESLint checks
```

## ⚡ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Apply migrations and seed database
npx prisma migrate dev
pnpm db:seed

# 3. Start development servers (frontend + API)
pnpm dev:all
```

The application will be available at:
- **Frontend**: http://localhost:5173 (or 5174)
- **API**: http://localhost:3001

## 🎯 Key Features

### React 19 Features
- **use hook** - Unwrap promises directly in components
- **useTransition** - Smooth transitions during loading states
- **Suspense** - Declarative loading states
- **Error Boundaries** - Comprehensive error handling
- **React Compiler** - Automatic memoization and optimization

### UI/UX Features
- **Dark Mode** - System theme detection with localStorage persistence
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Loading States** - Smooth transitions and skeleton loaders
- **Error Handling** - User-friendly error messages and fallbacks

### Routing
- `/` - Home page with user profiles
- `/about` - About the application
- `/posts` - Posts listing page
- `/posts/:postId` - Individual post details

## 📁 Project Structure

```
src/
├── api/           # API module
│   ├── client/    # HTTP client and services (browser)
│   │   ├── httpClient.ts
│   │   ├── userService.ts
│   │   └── postService.ts
│   ├── server/    # Controllers and routes (Node.js)
│   │   ├── userController.ts
│   │   ├── postController.ts
│   │   └── routes.ts
│   └── types/     # Shared API types
│       └── index.ts
├── components/    # React components
│   ├── ErrorBoundary.tsx
│   ├── LoadingFallback.tsx
│   └── UserProfile.tsx
├── contexts/      # React contexts
│   ├── ThemeContext.tsx
│   ├── useTheme.ts
│   └── index.ts
├── hooks/         # Custom React hooks
│   ├── useUserData.ts
│   ├── usePostData.ts
│   └── index.ts
├── lib/           # Utilities and configurations
│   └── prisma.ts
├── middleware/    # Server middleware
│   ├── errorHandler.ts
│   └── rateLimiter.ts
├── routes/        # TanStack Router pages
│   ├── __root.tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── posts.tsx
│   └── posts.$postId.tsx
└── types.ts       # TypeScript type definitions

prisma/
├── schema.prisma  # Database schema
├── seed.ts        # Database seeding script
└── migrations/    # Database migrations

server.ts          # Express API server
```

## 🏗️ API Architecture

This project uses **Service-Oriented Architecture** with clear separation of concerns:

- **Client Services** (`api/client/`) - HTTP requests for browser environment
- **Server Controllers** (`api/server/`) - Business logic and database operations  
- **Shared Types** (`api/types/`) - Common TypeScript interfaces

### API Endpoints

```
GET /api/users/random    # Get random user with posts
GET /api/posts           # Get all posts
GET /api/posts/:id       # Get post by ID
GET /health              # Health check endpoint
```

## 🔧 Prisma Commands

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Push schema changes
npx prisma db push

# Reset database
npx prisma migrate reset

# View database schema
npx prisma db pull
```

## 📝 Usage Examples

### API Services (Direct Calls)

```typescript
import { userService, postService } from './api/client';

// Get random user with posts
const userData = await userService.getRandomUser();

// Get post by ID
const post = await postService.getPostById('1');

// Get all posts
const posts = await postService.getAllPosts();
```

### React Hooks with Caching

```typescript
import { use } from 'react';
import { getUserDataPromise, getPostPromise, resetUserDataPromise } from './hooks';

// In React component with Suspense
function UserProfile() {
  const { user, posts } = use(getUserDataPromise());
  return <div>{user.name}</div>;
}

// Reset cache for new request
function handleRefresh() {
  resetUserDataPromise();
  // Component will automatically re-render
}
```

### Working with Prisma (server.ts)

```typescript
import { prisma } from './src/lib/prisma';

// Get post with author
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: { author: true },
});

// Get user with their posts
const user = await prisma.user.findFirst({
  include: {
    posts: {
      orderBy: { publishedDate: 'desc' },
    },
  },
});
```

### Using React 19 `use` Hook

```typescript
import { use } from 'react';

function DataComponent({ dataPromise }) {
  const data = use(dataPromise);
  return <div>{data.name}</div>;
}

// With Suspense boundary
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={getUserData()} />
    </Suspense>
  );
}
```

## 🎨 Customization

### Database Seeding

Seed data is automatically generated using `@faker-js/faker`. Edit `prisma/seed.ts` to customize the number of users and posts:

```typescript
const userCount = 10;          // Number of users to generate
const postsPerUser = 2;        // Posts per user
```

Then run:

```bash
pnpm db:seed
```

### Styling and Theming

The application uses **Tailwind CSS v4** with a custom theme configuration. You can customize:

- Colors and design tokens in `tailwind config`
- Dark/light mode preferences in `ThemeContext`
- Component styling in individual `.tsx` files

## 🚀 Production Ready Features

### Security
- ✅ **Rate Limiting** - Express rate limiter middleware
- ✅ **CORS Configuration** - Secure cross-origin requests
- ✅ **Error Handling** - Comprehensive error middleware
- ✅ **Input Validation** - Type-safe API endpoints

### Performance
- ✅ **Database Indexing** - Optimized queries on frequently accessed fields
- ✅ **Environment Logging** - Conditional logging (production vs development)
- ✅ **Graceful Shutdown** - Proper cleanup on server termination
- ✅ **Connection Pooling** - Efficient database connection management

### Monitoring & Observability
- ✅ **Health Check Endpoint** - `/health` with database verification
- ✅ **Environment Configuration** - Flexible deployment settings
- ✅ **Structured Error Responses** - Consistent API error format
- ✅ **Request/Response Logging** - Detailed API interaction logs

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3001
NODE_ENV=development

# Optional: Add other environment-specific variables
```

## 📚 Learn More

- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React 19 and modern web technologies**

