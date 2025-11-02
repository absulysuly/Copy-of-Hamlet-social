'use client';
import { motion } from 'framer-motion';

const badges = [
  {
    id: 'first-vote',
    name: 'First Vote',
    icon: '🗳️',
    description: 'Cast your first vote',
    unlocksAt: { votes: 1 }
  },
  {
    id: 'engaged-citizen',
    name: 'Engaged Citizen',
    icon: '🌟',
    description: 'Create 5 posts',
    unlocksAt: { posts: 5 }
  },
  {
    id: 'community-leader',
    name: 'Community Leader',
    icon: '👑',
    description: 'Get 100 followers',
    unlocksAt: { followers: 100 }
  }
];

// Mock user badges for demonstration
const userBadges = ['first-vote', 'engaged-citizen'];

export default function BadgeDisplay() {
    return (
        <div className="my-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your Badges</h3>
            <div className="grid grid-cols-3 gap-4">
            {badges.map(badge => (
                <motion.div
                key={badge.id}
                whileHover={{ scale: 1.1 }}
                title={badge.description}
                className={`p-4 rounded-xl text-center cursor-help ${
                    userBadges.includes(badge.id)
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                }`}
                >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-sm font-bold">{badge.name}</p>
                </motion.div>
            ))}
            </div>
        </div>
    );
}
