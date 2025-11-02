
'use client';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export default function NotificationBell() {
    const [hasNewNotification, setHasNewNotification] = useState(true); // Default to true for demo

    return (
        <motion.div
            animate={hasNewNotification ? {
                rotate: [0, -15, 15, -15, 15, 0],
                scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="relative cursor-pointer"
            onHoverStart={() => setHasNewNotification(false)}
        >
            <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300"/>
            {hasNewNotification && (
                 <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            )}
        </motion.div>
    );
}
