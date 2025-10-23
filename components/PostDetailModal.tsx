// Fixed PostDetailModal without VoiceNote comparison errors
import React from 'react';
import { Post } from '../types';

interface PostDetailModalProps {
    post: Post;
    onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
    return (
        <div className=\"modal-overlay\" onClick={onClose}>
            <div className=\"modal-content\" onClick={(e) => e.stopPropagation()}>
                <h3>Post Details</h3>
                <p>Content: {post.content}</p>
                {post.mediaUrl && (
                    <img src={post.mediaUrl} alt=\"Post media\" style={{maxWidth: '100%'}} />
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
