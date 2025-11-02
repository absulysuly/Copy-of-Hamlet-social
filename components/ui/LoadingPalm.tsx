'use client';
import { motion } from 'framer-motion';

export default function LoadingPalm() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{
          rotate: [-5, 5, -5],
        }}
        transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut"
        }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" className="text-iraq-green drop-shadow-lg">
          {/* Trunk */}
          <path d="M40 100 C 42 80, 38 60, 40 40" stroke="#a16207" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* Leaves */}
          <path d="M40 45 Q 20 20, 0 15" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M40 45 Q 60 20, 80 15" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M40 45 Q 25 30, 5 30" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M40 45 Q 55 30, 75 30" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M40 45 Q 30 10, 40 0" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
