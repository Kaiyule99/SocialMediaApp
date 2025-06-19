import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { createPostApi } from '../../api/socialApi.js';

export const CreatePost = ({ onPostCreated }) => {
    const { token, user } = useAuth();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            await createPostApi(token, content);
            const optimisticPost = {
                id: Date.now(),
                content: content,
                created_at: new Date().toISOString(),
                owned_by: user.id,
                author: { name: user.name, profile_picture: user.profile_picture },
                likes: { count: 0 },
                replies: []
            };
            onPostCreated(optimisticPost);
            setContent('');
        } catch (error) {
            console.error("Failed to create post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 border-b border-gray-700 flex space-x-4">
            <img src={user?.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U'} alt="User Avatar" className="w-12 h-12 rounded-full" />
            <form onSubmit={handleSubmit} className="flex-1">
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none" 
                    placeholder="What's happening?"
                    rows="2"
                ></textarea>
                <div className="flex justify-end items-center mt-2">
                     <button type="submit" disabled={isSubmitting || !content.trim()} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-full">
                        {isSubmitting ? 'Chirping...' : 'Chirp'}
                    </button>
                </div>
            </form>
        </div>
    );
};
