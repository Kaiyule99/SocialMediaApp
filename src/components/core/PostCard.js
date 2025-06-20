import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { likePostApi, unlikePostApi, createReplyApi } from '../../api/socialApi';

const ReplyForm = ({ postId, onReplySubmitted }) => {
    const { token } = useAuth();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        setIsSubmitting(true);
        try {
            await createReplyApi(token, postId, content);
            onReplySubmitted();
        } catch (error) {
            console.error("Failed to submit reply:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex space-x-3">
            <input 
                type="text" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chirp your reply..."
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button type="submit" disabled={isSubmitting || !content.trim()} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-full">
                Reply
            </button>
        </form>
    );
};

export const PostCard = ({ post, onInteraction }) => {
    const { token, user } = useAuth();
    const [showReply, setShowReply] = useState(false);
    
   
    const isLikedByMe = user && post.likes?.some(like => like.user_id === user.id);

    const handleLike = async () => {
        try {
            if (isLikedByMe) {
                await unlikePostApi(token, post.id);
            } else {
                await likePostApi(token, post.id);
            }
            onInteraction(); 
        } catch (error) {
            console.error("Failed to update like:", error);
        }
    };
    
    const authorName = post.author ? `${post.author.fName || ''} ${post.author.lName || ''}`.trim() : 'Unknown User';
    const authorAvatar = post.author?.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U';

    return (
        <article className="p-4 border-b border-gray-700">
            <div className="flex space-x-3">
                <img src={authorAvatar} alt={`${authorName}'s avatar`} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                    <div className="flex items-center space-x-1 text-sm">
                        <h4 className="font-bold">{authorName}</h4>
                        <span className="text-gray-500">&middot;</span>
                        <span className="text-gray-500">{new Date(post.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap">{post.content}</p>
                    <div className="flex items-center mt-4 text-gray-500 space-x-6">
                        <button onClick={handleLike} className={`flex items-center space-x-2 hover:text-red-500 ${isLikedByMe ? 'text-red-500' : ''}`}>
                            <svg className="w-5 h-5" fill={isLikedByMe ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <span>{post.likes?.length || 0}</span>
                        </button>
                        <button onClick={() => setShowReply(!showReply)} className="flex items-center space-x-2 hover:text-blue-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            <span>{post.replies?.length || 0}</span>
                        </button>
                    </div>

                    {showReply && <ReplyForm postId={post.id} onReplySubmitted={onInteraction} />}

                    {post.replies?.length > 0 && (
                        <div className="mt-4 space-y-2 pt-2">
                            {post.replies.map(reply => {
                                const replyAuthorName = (reply.author && reply.author.fName) ? `${reply.author.fName} ${reply.author.lName}`.trim() : 'User';
                                const replyAuthorAvatar = reply.author?.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U';
                                return (
                                    <div key={reply.id} className="flex space-x-3 pt-2 border-t border-gray-800">
                                        <img src={replyAuthorAvatar} alt="reply author avatar" className="w-8 h-8 rounded-full object-cover"/>
                                        <div>
                                            <p className="font-bold text-sm">{replyAuthorName}</p>
                                            <p className="text-gray-300 text-sm">{reply.content}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};
