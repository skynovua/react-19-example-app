export function LoadingFallback() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 animate-pulse transition-colors duration-200">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-3">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse transition-colors duration-200">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
