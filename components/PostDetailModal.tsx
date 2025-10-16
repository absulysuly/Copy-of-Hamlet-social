import React, { useState } from 'react';
import { Post, User, Language } from '../types.ts';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, XMarkIcon } from './icons/Icons.tsx';
import AudioPlayer from './AudioPlayer.tsx';
import * as api from '../services/apiService.ts';
import { UI_TEXT } from '../translations.ts';

interface PostDetailModalProps {
    post: Post;
    user: User | null;
    onClose: () => void;
    requestLogin: () => void;
    language: Language;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, user, onClose, requestLogin, language }) => {
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [shares, setShares] = useState(post.shares);
    const [isLiked, setIsLiked] = useState(false);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [isCommentLoading, setIsCommentLoading] = useState(false);
    const [isShareLoading, setIsShareLoading] = useState(false);
    const texts = UI_TEXT[language];

    const handleInteraction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            action();
        }
    };
    
    const handleLike = async () => {
        // Optimistic update
        const previousLikes = likes;
        const previousIsLiked = isLiked;
        
        setIsLikeLoading(true);
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
        
        try {
            await api.likePost(post.id);
        } catch (error) {
            // Rollback on error
            console.error('Failed to like post:', error);
            setIsLiked(previousIsLiked);
            setLikes(previousLikes);
            alert(texts.errorOccurred || 'An error occurred. Please try again.');
        } finally {
            setIsLikeLoading(false);
        }
    };
    
    const handleComment = async () => {
        const comment = prompt(texts.enterComment || 'Enter your comment:');
        if (!comment || !comment.trim()) return;
        
        // Optimistic update
        const previousComments = comments;
        setIsCommentLoading(true);
        setComments(comments + 1);
        
        try {
            await api.commentPost(post.id, comment);
        } catch (error) {
            // Rollback on error
            console.error('Failed to comment on post:', error);
            setComments(previousComments);
            alert(texts.errorOccurred || 'An error occurred. Please try again.');
        } finally {
            setIsCommentLoading(false);
        }
    };
    
    const handleShare = async () => {
        // Optimistic update
        const previousShares = shares;
        setIsShareLoading(true);
        setShares(shares + 1);
        
        const postUrl = `${window.location.origin}/post/${post.id}`;
        const shareData = {
            title: `Post by ${post.author.name} on Smart Campaign`,
            text: post.content,
            url: postUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log('Post shared successfully');
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert(texts.shareLinkCopied || 'Link copied to clipboard');
            }
            // Track share in backend
            await api.sharePost(post.id);
        } catch (error) {
            // Rollback on error
            console.error('Error sharing post:', error);
            setShares(previousShares);
            if (!(error instanceof Error && error.name === 'AbortError')) {
                alert(texts.shareNotSupported || 'Sharing not supported on this device');
            }
        } finally {
            setIsShareLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="glass-card rounded-xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                 <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-10 bg-white/10 text-white rounded-full p-1 hover:bg-white/30"
                    aria-label="Close post detail"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                
                {/* Modal Content */}
                <div className="p-4">
                    {/* Author Header */}
                    <div className="flex items-center space-x-3">
                        <img className="w-11 h-11 rounded-full ring-2 ring-white/50" src={post.author.avatarUrl} alt={post.author.name} />
                        <div>
                            <p className="text-sm font-semibold text-theme-text-base flex items-center">
                                {post.author.name}
                                {post.author.verified && <VerifiedIcon className="w-4 h-4 text-primary ml-1.5" />}
                            </p>
                            <p className="text-xs text-theme-text-muted">{post.timestamp}</p>
                        </div>
                    </div>
                    
                    {/* Content */}
                    {post.type === 'VoiceNote' ? (
                        <AudioPlayer src={post.mediaUrl || ''} governorate={post.author.governorate} />
                    ) : (
                        <div className="my-4">
                            <p className="text-theme-text-base text-base whitespace-pre-line font-arabic">{post.content}</p>
                        </div>
                    )}
                </div>

                {/* Image */}
                {post.mediaUrl && post.type !== 'VoiceNote' && (
                    <div className="px-2 pb-2">
                        <img
                            onClick={onClose}
                            className="w-full object-contain max-h-[60vh] rounded-lg cursor-pointer"
                            src={post.mediaUrl}
                            alt="Post media"
                        />
                    </div>
                )}
                
                {/* Stats */}
                <div className="px-4 pb-2 border-t border-[var(--color-glass-border)]">
                    <div className="flex justify-between text-theme-text-muted pt-2">
                        <div className="flex items-center space-x-1">
                            <HeartIcon className={`w-4 h-4 ${isLiked ? 'text-red-500' : 'text-theme-text-base'}`} />
                            <span className="text-xs">{likes}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                            <span>{comments} {texts.comment.toLowerCase()}s</span>
                            <span>{shares} {texts.share.toLowerCase()}s</span>
                        </div>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="px-4 pb-2">
                    <div className="flex justify-around items-center text-theme-text-base">
                        <button onClick={(e) => handleInteraction(e, handleLike)} disabled={isLikeLoading} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center disabled:opacity-50">
                            <HeartIcon className={`w-6 h-6 ${isLiked ? 'text-red-500' : ''} ${isLikeLoading ? 'animate-pulse' : ''}`} />
                            <span className="font-semibold text-xs">{texts.like}</span>
                        </button>
                        <button onClick={(e) => handleInteraction(e, handleComment)} disabled={isCommentLoading} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center disabled:opacity-50">
                            <CommentIcon className={`w-6 h-6 ${isCommentLoading ? 'animate-pulse' : ''}`} />
                            <span className="font-semibold text-xs">{texts.comment}</span>
                        </button>
                        <button onClick={(e) => handleInteraction(e, handleShare)} disabled={isShareLoading} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center disabled:opacity-50">
                            <ShareIcon className={`w-6 h-6 ${isShareLoading ? 'animate-pulse' : ''}`} />
                            <span className="font-semibold text-xs">{texts.share}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;