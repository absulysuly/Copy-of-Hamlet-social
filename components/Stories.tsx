import React from 'react';
import { User } from '../types.ts';

interface StoriesProps {
    users: User[];
}

const StoryItem: React.FC<{ user: User }> = ({ user }) => (
    <button
        onClick={() => alert(`Viewing stories for ${user.name}`)}
        className="flex flex-col items-center flex-shrink-0 w-24 p-2 focus:outline-none focus:ring-2 focus:ring-brand-hot-pink rounded-lg"
        aria-label={`View stories by ${user.name}`}
    >
        <div className="relative">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 via-flag-red to-purple-600">
                 <img 
                    className="w-full h-full rounded-full object-cover border-2 border-brand-deep-purple"
                    src={user.avatarUrl} 
                    alt="" 
                 />
            </div>
        </div>
        <p className="text-xs text-center text-white/90 truncate w-full mt-2">{user.name}</p>
    </button>
);


const Stories: React.FC<StoriesProps> = ({ users }) => {
    if (!users || users.length === 0) {
        return null;
    }

    // Duplicate users for a seamless loop, ensuring there's enough content to scroll
    const extendedUsers = users.length > 10 ? [...users, ...users] : [...users, ...users, ...users, ...users];

    return (
        <div className="w-full overflow-hidden group relative">
            {/* Left and right fades for a clean look */}
            <div className="absolute top-0 bottom-0 left-0 z-10 w-12 bg-gradient-to-r from-brand-deep-purple to-transparent pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 z-10 w-12 bg-gradient-to-l from-brand-deep-purple to-transparent pointer-events-none"></div>

            <div 
                className="flex group-hover:[animation-play-state:paused]"
                style={{ animation: `scroll-x ${users.length * 5}s linear infinite` }}
            >
                {extendedUsers.map((user, index) => (
                    <StoryItem key={`${user.id}-${index}`} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Stories;