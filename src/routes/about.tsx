import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About This Demo</h2>
        
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p className="text-lg">
            This application demonstrates several cutting-edge React 19 features and modern web development practices:
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                🎣 React 19's <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">use</code> Hook
              </h3>
              <p>
                Unwraps promises directly in components, enabling seamless async data handling without complex state management.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ⚡ useTransition for Non-Blocking Updates
              </h3>
              <p>
                Keeps the UI responsive during data fetching by marking updates as transitions, providing smooth loading states.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                🎨 Tailwind CSS v4 with Vite
              </h3>
              <p>
                Modern styling with Tailwind's latest version, featuring the new Vite plugin for optimal performance and dark mode support.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                🛣️ TanStack Router
              </h3>
              <p>
                Type-safe, file-based routing with powerful features like route preloading, search params, and path parameters.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                🌓 Dark Mode
              </h3>
              <p>
                Persistent theme switching with localStorage and system preference detection for a personalized experience.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                📦 Modern Architecture
              </h3>
              <p>
                Well-organized codebase with TypeScript, proper separation of concerns, and reusable components.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm">
              Built with React 19, TypeScript, Vite, TanStack Router, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
