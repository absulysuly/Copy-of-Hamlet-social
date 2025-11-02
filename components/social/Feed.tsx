'use client';
import { motion, AnimatePresence } from 'framer-motion';
import PostComponent from './Post'; // Renamed to avoid conflict with the type
import { Post } from '@/lib/types';
import SkeletonPostCard from '../SkeletonPostCard';

export default function Feed({ lang, posts }: { lang: string, posts: Post[] }) {
  if (!posts) {
    // This can happen if the parent component is still loading data.
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => <SkeletonPostCard key={i} />)}
        </div>
    );
  }

  if (posts.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">The feed is empty</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Be the first to share something!</p>
        </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Posts Feed */}
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <PostComponent post={post} lang={lang} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}