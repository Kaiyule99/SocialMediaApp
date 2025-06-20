import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPostApi } from '../../api/socialApi';

export const CreatePost = ({ onPostCreated }) => {
    const { token, user } = useAuth();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        setError('');
        try {
            await createPostApi(token, content);
          
            onPostCreated(); 
            setContent('');
        } catch (err) {
            console.error("Failed to create post:", err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 border-b border-gray-700">
            <div className="flex space-x-4">
                <img src={user?.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U'} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
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
            {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}
        </div>
    );
};
