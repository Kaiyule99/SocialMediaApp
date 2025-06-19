import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { likePostApi, unlikePostApi } from '../../api/socialApi.js';

export const PostCard = ({ post }) => {
    const { token } = useAuth();
    const [isLiked, setIsLiked] = useState(false); 
    const [likeCount, setLikeCount] = useState(post.likes.count);

    const handleLike = async () => {
        const originalIsLiked = isLiked;
        const originalLikeCount = likeCount;

        setIsLiked(!originalIsLiked);
        setLikeCount(originalIsLiked ? originalLikeCount - 1 : originalLikeCount + 1);

        try {
            if (originalIsLiked) {
                await unlikePostApi(token, post.id);
            } else {
                await likePostApi(token, post.id);
            }
        } catch (error) {
            console.error("Failed to update like:", error);
            setIsLiked(originalIsLiked);
            setLikeCount(originalLikeCount);
        }
    };
    
    const authorName = post.author?.name || 'Unknown User';
    const authorAvatar = post.author?.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U';

    return (
        <article className="p-4 hover:bg-gray-800/50 transition-colors duration-200">
            <div className="flex space-x-3">
                <img src={authorAvatar} alt={`${authorName}'s avatar`} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <div className="flex items-center space-x-1">
                        <h4 className="font-bold">{authorName}</h4>
                        <span className="text-gray-500">&middot;</span>
                        <span className="text-gray-500">{new Date(post.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap">{post.content}</p>
                    <div className="flex items-center mt-4 text-gray-500">
                        <button onClick={handleLike} className={`flex items-center space-x-2 hover:text-red-500 ${isLiked ? 'text-red-500' : ''}`}>
                            <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <span>{likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};
