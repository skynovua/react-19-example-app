import { createFileRoute, Link } from '@tanstack/react-router';
import { use, Suspense } from 'react';
import { getPostPromise } from '../hooks';

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
});

function PostContent({ postId }: { postId: string }) {
  const post = use(getPostPromise(postId));

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
      <div className="mb-6">
        <Link 
          to="/"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <header className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={post.authorAvatar} 
            alt={post.author}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} read
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
              👍 Like
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              💬 Comment
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              🔖 Save
            </button>
          </div>
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Share →
          </button>
        </div>
      </footer>
    </article>
  );
}

function PostComponent() {
  const { postId } = Route.useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-pulse">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }>
        <PostContent postId={postId} />
      </Suspense>
    </div>
  );
}
