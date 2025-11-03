// FIX: Added 'use client' directive. Components using client-side features like hooks (used internally by framer-motion) must be marked as client components in Next.js App Router.
'use client';
// Fix: Added missing import for React.
import React from 'react';
import { motion } from 'framer-motion';

const GradientCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-1 rounded-2xl bg-gradient-to-br from-iraq-red via-iraq-black to-iraq-green"
        >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default GradientCard;