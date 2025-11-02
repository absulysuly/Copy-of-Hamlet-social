
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minus } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-r from-iraq-red to-iraq-green text-white rounded-full shadow-2xl flex items-center justify-center z-50 md:bottom-6"
        aria-label="Open chat widget"
      >
        <MessageCircle size={28} />
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 md:bottom-24"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-iraq-red to-iraq-green p-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">Messages</h3>
              <div className="flex gap-2">
                <button className="text-white hover:bg-white/20 rounded p-1">
                  <Minus size={20} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded p-1"
                  aria-label="Close chat widget"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {[
                { name: 'Ahmed', message: 'Did you see the debate?', time: '2m ago', online: true },
                { name: 'Sara', message: 'Thanks for the info!', time: '1h ago', online: false },
                { name: 'Ali', message: 'What do you think about...', time: '3h ago', online: true }
              ].map((chat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition"
                >
                  <div className="relative">
                    <img
                      src={`https://i.pravatar.cc/48?u=user${i+1}`}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      chat.online ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {chat.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
