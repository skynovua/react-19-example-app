import { createFileRoute } from '@tanstack/react-router';
import { Suspense, useState, useTransition } from 'react';
import { UserProfile } from '../components/UserProfile';
import { LoadingFallback } from '../components/LoadingFallback';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { resetUserDataPromise } from '../hooks';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const [key, setKey] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const handleFetchRandomUser = (): void => {
    startTransition(() => {
      resetUserDataPromise();
      setKey(prev => prev + 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">User Profiles</h2>
        <button
          onClick={handleFetchRandomUser}
          disabled={isPending}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'Fetch Random User'
          )}
        </button>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <UserProfile key={key} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
