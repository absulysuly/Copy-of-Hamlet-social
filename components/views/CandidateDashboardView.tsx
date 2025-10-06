import React from 'react';
import { User, UserRole } from '../../types.ts';
import { MOCK_POSTS } from '../../constants.ts';
import { VerifiedIcon, WhatsAppIcon, PhoneIcon, EmailIcon, MessageIcon, TikTokIcon, InstagramIcon, FacebookIcon, XIcon, YouTubeIcon, LinkIcon } from '../icons/Icons.tsx';
import PostCard from '../PostCard.tsx';

interface CandidateDashboardViewProps {
    user: User;
}

const CandidateDashboardView: React.FC<CandidateDashboardViewProps> = ({ user }) => {
    // Ensure this view is only for candidates
    if (user.role !== UserRole.Candidate) {
        return <p>Access Denied. This page is for candidates only.</p>;
    }

    const socialPlatforms = [
        { name: 'TikTok', icon: <TikTokIcon className="w-6 h-6" />, linked: true },
        { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, linked: true },
        { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, linked: false },
        { name: 'X', icon: <XIcon className="w-6 h-6" />, linked: true },
        { name: 'YouTube', icon: <YouTubeIcon className="w-6 h-6" />, linked: false },
    ];
    
    const candidatePosts = MOCK_POSTS.filter(post => post.author.id === user.id);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 overflow-hidden mb-6">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <img className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md" src={user.avatarUrl} alt={user.name} />
                        <div>
                            <h2 className="text-2xl font-bold flex items-center">
                                {user.name}
                                {user.verified && <VerifiedIcon className="w-6 h-6 text-action-blue ml-2" />}
                            </h2>
                            <p className="text-md text-neutral-gray-dark dark:text-gray-400">{user.party} - {user.governorate}</p>
                            <div className="flex space-x-2 mt-4">
                                <button className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><WhatsAppIcon className="w-5 h-5" /></button>
                                <button className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><PhoneIcon className="w-5 h-5" /></button>
                                <button className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><EmailIcon className="w-5 h-5" /></button>
                                <button className="p-2 bg-neutral-gray-light dark:bg-gray-700 rounded-full hover:bg-neutral-gray-medium dark:hover:bg-gray-600"><MessageIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-gray-medium dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold">Social Connections</h3>
                    <p className="text-sm text-neutral-gray-dark dark:text-gray-400 mb-4">Link your social accounts to auto-share posts when you create content.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {socialPlatforms.map(platform => (
                            <div key={platform.name} className="flex items-center justify-between p-3 bg-neutral-gray-light dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    {platform.icon}
                                    <span className="font-medium">{platform.name}</span>
                                </div>
                                {platform.linked ? (
                                    <button className="text-xs font-semibold text-flag-red hover:underline">Unlink</button>
                                ) : (
                                    <button className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold text-white bg-action-blue rounded-full hover:bg-blue-700">
                                        <LinkIcon className="w-3 h-3"/>
                                        <span>Link</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">My Posts</h3>
                {candidatePosts.length > 0 ? (
                    candidatePosts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="text-center py-10 text-neutral-gray-dark">This candidate has not posted yet.</p>
                )}
            </div>
        </div>
    );
};

export default CandidateDashboardView;