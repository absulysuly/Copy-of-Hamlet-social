import React, { useEffect, useState } from 'react';
import { Post, User, Language } from '../types.ts';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, MoreIcon } from './icons/Icons.tsx';
import * as api from '../services/apiService.ts';
import { translateText } from '../services/geminiService.ts';
import AudioPlayer from './AudioPlayer.tsx';

interface PostCardProps {
    post: Post;
    user: User | null;
    requestLogin: () => void;
    language: Language;
    onSelectAuthor?: (author: User) => void;
    onSelectPost: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, user, requestLogin, language, onSelectAuthor, onSelectPost }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isShowingTranslation, setIsShowingTranslation] = useState(false);

    const originalLanguage: Language = 'ar';

    useEffect(() => {
        setIsShowingTranslation(false);
        setTranslatedContent(null);
        setIsTranslating(false);

        const getTranslation = async () => {
            if (language !== originalLanguage && post.content) {
                setIsTranslating(true);
                try {
                    const translation = await translateText(post.content, language);
                    if (translation && translation.trim() !== post.content.trim()) {
                        setTranslatedContent(translation);
                    } else {
                        setTranslatedContent(null);
                    }
                } catch (error) {
                    console.error('Translation failed', error);
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
        e.stopPropagation();
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            action();
        }
    };

    const handleLike = () => api.likePost(post.id).then(() => console.log('Liked post'));
    const handleComment = () => console.log('Comment action placeholder');

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const shareData = {
            title: `Post by ${post.author.name} on Smart Campaign`,
            text: post.content,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Post shared successfully');
            } catch (error) {
                console.error('Error sharing post:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link to post copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy post link:', err);
                alert('Sharing is not supported on this browser.');
            }
        }
    };

    const handleReport = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) {
            requestLogin();
            return;
        }
        console.log(`Post ${post.id} reported.`);
        setMenuOpen(false);
    };

    const handleMoreClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuOpen((prev) => !prev);
    };

    const displayedContent = isShowingTranslation && translatedContent ? translatedContent : post.content;
    const canToggleTranslation = !!translatedContent && language !== originalLanguage;

    return (
        <div onClick={() => onSelectPost(post)} className="glass-card rounded-xl shadow-lg mb-6 overflow-hidden cursor-pointer">
            <div className="p-4">
                {post.author.isElected && (
                    <div className="mb-2 text-center">
                        <span className="elected-tag">Elected MP</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <div
                        className="flex items-center space-x-3 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectAuthor && onSelectAuthor(post.author);
                        }}
                    >
                        <img className="w-11 h-11 rounded-full ring-2 ring-white/50 post-card-author-img" src={post.author.avatarUrl} alt={post.author.name} />
                        <div>
                            <p className="text-sm font-semibold text-theme-text-base flex items-center group-hover:underline">
                                {post.author.name}
                                {post.author.verified && <VerifiedIcon className="w-4 h-4 text-primary ml-1.5" />}
                            </p>
                            <p className="text-xs text-theme-text-muted">{post.timestamp}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <button onClick={handleMoreClick} className="p-2 rounded-full hover:bg-white/10">
                            <MoreIcon className="w-5 h-5 text-theme-text-muted" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-40 glass-card rounded-lg shadow-lg z-10">
                                <div className="py-1">
                                    <button
                                        onClick={handleReport}
                                        className="block w-full text-left px-4 py-2 text-sm text-theme-text-muted hover:text-theme-text-base hover:bg-white/10"
                                    >
                                        Report Post
                                    </button>
                                </div>
                                <div className="py-1 border-t border-white/10">
                                    <button
                                        onClick={(e) => handleInteraction(e, () => console.log('Save post'))}
                                        className="block w-full text-left px-4 py-2 text-sm text-theme-text-muted hover:text-theme-text-base hover:bg-white/10"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {post.type === 'VoiceNote' ? (
                    <AudioPlayer src={post.mediaUrl || ''} governorate={post.author.governorate} />
                ) : (
                    <div className="my-4 glass-card rounded-lg p-4 post-content-wrapper">
                        <p className="text-theme-text-base text-sm whitespace-pre-line font-arabic">{displayedContent}</p>
                        {isTranslating && <p className="text-xs text-theme-text-muted animate-pulse mt-2">Translating...</p>}
                        {canToggleTranslation && !isTranslating && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsShowingTranslation((prev) => !prev);
                                }}
                                className="text-xs font-semibold text-primary hover:underline mt-2"
                            >
                                {isShowingTranslation ? 'Show original' : 'Show translation'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {post.mediaUrl && post.type !== 'VoiceNote' && (
                <div className="px-2 pb-2">
                    <img className="w-full object-cover max-h-96 rounded-lg ring-1 ring-white/10" src={post.mediaUrl} alt="Post media" />
                </div>
            )}

            <div className="px-4 pb-2">
                <div className="flex justify-between text-theme-text-muted">
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-4 h-4 text-theme-text-base" />
                        <span className="text-xs">{post.likes ?? 0} likes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <span>{post.comments ?? 0} comments</span>
                        <span>{post.shares ?? 0} shares</span>
                    </div>
                </div>

                <div className="border-t border-[var(--color-glass-border)] my-2"></div>

                <div className="flex justify-around items-center text-theme-text-base">
                    <button onClick={(e) => handleInteraction(e, handleLike)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center">
                        <HeartIcon className="w-6 h-6" />
                        <span className="font-semibold text-xs">Like</span>
                    </button>
                    <button onClick={(e) => handleInteraction(e, handleComment)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center">
                        <CommentIcon className="w-6 h-6" />
                        <span className="font-semibold text-xs">Comment</span>
                    </button>
                    <button onClick={handleShare} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center">
                        <ShareIcon className="w-6 h-6" />
                        <span className="font-semibold text-xs">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
