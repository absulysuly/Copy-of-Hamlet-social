import React from 'react';
import { User } from '../types.ts';

interface StoriesProps {
    users: User[];
    onSelectProfile: (profile: User) => void;
}

const StoryItem: React.FC<{ user: User; onSelectProfile: (profile: User) => void; }> = ({ user, onSelectProfile }) => (
    <button
        onClick={() => onSelectProfile(user)}
        className="flex flex-col items-center flex-shrink-0 w-24 p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        aria-label={`View stories by ${user.name}`}
    >
        <div className="relative">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-secondary via-primary to-accent">
                 <img 
                    className="w-full h-full rounded-full object-cover border-2 border-[var(--color-background)]"
                    src={user.avatarUrl} 
                    alt={user.name} 
                 />
            </div>
        </div>
        <p className="text-xs text-center text-theme-text-muted group-hover:text-theme-text-base truncate w-full mt-2">{user.name}</p>
    </button>
);


const Stories: React.FC<StoriesProps> = ({ users, onSelectProfile }) => {
    if (!users || users.length === 0) {
        return null;
    }

    // Duplicate users for a seamless loop.
    const extendedUsers = [...users, ...users];

    return (
        <div className="w-full overflow-hidden relative">
            <div 
                className="flex"
                style={{ animation: `scroll-x ${users.length * 1.5}s linear infinite` }}
            >
                {extendedUsers.map((user, index) => (
                    <StoryItem key={`${user.id}-${index}`} user={user} onSelectProfile={onSelectProfile} />
                ))}
            </div>
        </div>
    );
};

export default Stories;