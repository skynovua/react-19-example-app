import { use } from 'react';
import { Link } from '@tanstack/react-router';
import { getUserDataPromise } from '../hooks';

export function UserProfile() {
  const { user, posts } = use(getUserDataPromise());

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200">
        <div className="flex items-start space-x-6 mb-6">
          <img 
            src={user.avatar || undefined} 
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 dark:border-indigo-900"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
            <p className="text-lg text-indigo-600 dark:text-indigo-400 mb-2">{user.role}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-3">{user.email}</p>
            
            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {user.bio}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {user.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location}
                </span>
              )}
              {user.joinedDate && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>

            {(user.website || user.github || user.twitter) && (
              <div className="flex gap-3 mt-4">
                {user.website && (
                  <a 
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    🌐 Website
                  </a>
                )}
                {user.github && (
                  <a 
                    href={`https://github.com/${user.github.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    💻 {user.github}
                  </a>
                )}
                {user.twitter && (
                  <a 
                    href={`https://twitter.com/${user.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    🐦 {user.twitter}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Posts</h2>
        {posts.map(post => (
          <Link
            key={post.id}
            to="/posts/$postId"
            params={{ postId: post.id.toString() }}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                  {post.content}
                </p>
              </div>
              <svg 
                className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ml-4 shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
