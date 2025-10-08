import React, { useState, useEffect } from 'react';
import { Post, User, Language } from '../types.ts';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, DonateIcon, MoreIcon } from './icons/Icons.tsx';
import * as api from '../services/apiService.ts';
import { translateText } from '../services/geminiService.ts';
import AudioPlayer from './AudioPlayer.tsx';

interface PostCardProps {
    post: Post;
    user: User | null;
    requestLogin: () => void;
    language: Language;
    onSelectAuthor?: (author: User) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, user, requestLogin, language, onSelectAuthor }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isShowingTranslation, setIsShowingTranslation] = useState(false);
    // Assuming mock data is in Arabic for this feature
    const originalLanguage: Language = 'ar';

    useEffect(() => {
        // Reset translation state when the post or language changes
        setIsShowingTranslation(false);
        setTranslatedContent(null);
        setIsTranslating(false);

        const getTranslation = async () => {
            if (language !== originalLanguage && post.content) {
                setIsTranslating(true);
                try {
                    const translation = await translateText(post.content, language);
                    // Only store the translation if it's successful and different from the original text.
                    // This prevents showing a do-nothing "Show translation" button if the API fails or returns the same text.
                    if (translation && translation.trim() !== post.content.trim()) {
                        setTranslatedContent(translation);
                    } else {
                        setTranslatedContent(null);
                    }
                } catch (error) {
                    console.error("Translation failed", error);
                    setTranslatedContent(null);
                } finally {
                    setIsTranslating(false);
                }
            }
        };

        if (post.type !== 'VoiceNote') {
            getTranslation();
        }
    }, [language, post]);

    const handleInteraction = (e: React.MouseEvent, action: () => void) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            action();
        }
    };
    
    // TODO: Add UI feedback (e.g., loading spinners, success states) for these actions.
    const handleLike = () => api.likePost(post.id).then(() => console.log('Liked post'));
    const handleComment = () => console.log('Comment action placeholder');
    const handleShare = () => console.log('Share action placeholder');
    const handleDonate = () => console.log('Donate action placeholder');

    const handleReport = () => {
        if (!user) {
            requestLogin();
            return;
        }
        console.log(`Post ${post.id} reported.`);
        setMenuOpen(false);
    };

    const displayedContent = isShowingTranslation && translatedContent ? translatedContent : post.content;
    const canToggleTranslation = translatedContent && language !== originalLanguage;

    return (
        <div className="glass-card rounded-xl shadow-lg mb-6 text-white overflow-hidden">
            <div className="p-4">
                 {post.author.isElected && (
                    <div className="bg-white/20 text-white text-xs font-bold mb-2 p-1 rounded text-center">
                        Elected MP
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <div 
                        className="flex items-center space-x-3 cursor-pointer group"
                        onClick={() => onSelectAuthor && onSelectAuthor(post.author)}
                    >
                        <img className="w-11 h-11 rounded-full ring-2 ring-white/50" src={post.author.avatarUrl} alt={post.author.name} />
                        <div>
                            <p className="text-sm font-semibold text-white flex items-center group-hover:underline">
                                {post.author.name}
                                {post.author.verified && <VerifiedIcon className="w-4 h-4 text-brand-hot-pink ml-1.5" />}
                            </p>
                            <p className="text-xs text-white/80">{post.timestamp}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <button onClick={() => setMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-white/10">
                            <MoreIcon className="w-5 h-5 text-white/80" />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 glass-card rounded-md shadow-lg z-10">
                                <button onClick={handleReport} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
                                    Report Post
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {post.type === 'VoiceNote' ? (
                    <AudioPlayer duration={post.duration || 0} governorate={post.author.governorate} />
                ) : (
                    <div className="my-4 glass-card rounded-lg p-4">
                        <p className="text-white text-sm whitespace-pre-line font-arabic">{displayedContent}</p>
                        {isTranslating && <p className="text-xs text-white/70 animate-pulse mt-2">Translating...</p>}
                        {canToggleTranslation && !isTranslating && (
                             <button
                                onClick={() => setIsShowingTranslation(prev => !prev)}
                                className="text-xs font-semibold text-brand-hot-pink hover:underline mt-2"
                            >
                                {isShowingTranslation ? 'Show original' : 'Show translation'}
                            </button>
                        )}
                    </div>
                )}

                {post.isSponsored && <p className="text-xs font-bold text-white/70">Sponsored</p>}
            </div>

            {post.mediaUrl && post.type !== 'VoiceNote' && (
                <div className="px-2 pb-2">
                     <img className="w-full object-cover max-h-96 rounded-lg ring-1 ring-white/10" src={post.mediaUrl} alt="Post media" />
                </div>
            )}

            <div className="px-4 pb-2">
                <div className="flex justify-between text-white/80">
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-4 h-4 text-white" />
                        <span className="text-xs">{post.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                    </div>
                </div>

                <div className="border-t border-white/20 my-2"></div>

                <div className="flex justify-around items-center text-white">
                    <button onClick={(e) => handleInteraction(e, handleLike)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/10 w-full justify-center">
                        <HeartIcon className="w-6 h-6" />
                        <span className="font-semibold text-xs">Like</span>
                    </button>
                     <button onClick={(e) => handleInteraction(e, handleComment)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/10 w-full justify-center">
                        <CommentIcon className="w-6 h-6" />
                        <span className="font-semibold text-xs">Comment</span>
                    </button>
                     <button onClick={(e) => handleInteraction(e, handleShare)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/10 w-full justify-center">
                        <ShareIcon className="w-6 h-6" />
                        <span className="font-semibold text-xs">Share</span>
                    </button>
                    <button onClick={(e) => handleInteraction(e, handleDonate)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white/10 w-full justify-center">
                        <DonateIcon className="w-6 h-6 text-brand-hot-pink" />
                        <span className="font-semibold text-xs text-brand-hot-pink">Donate</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;