import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { fetchPostsApi } from '../api/socialApi.js';
import { LeftSideBar } from '../components/layout/LeftSideBar.js';
import { RightSideBar } from '../components/layout/RightSideBar.js';
import { BottomNav } from '../components/layout/BottomNav.js';
import { CreatePost } from '../components/core/CreatePost.js';
import { PostCard } from '../components/core/PostCard.js';

const Loader = () => (<div className="flex justify-center items-center p-4"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

export const HomePage = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPosts = async () => {
            if (!token) return;
            setIsLoading(true);
            try {
                const fetchedPosts = await fetchPostsApi(token);
                setPosts(fetchedPosts);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadPosts();
    }, [token]);
    
    const handlePostCreated = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
        <div className="flex container mx-auto max-w-7xl">
            <LeftSideBar />
            <main className="w-full md:w-1/2 border-l border-r border-gray-700 min-h-screen">
                <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-700 p-4">
                    <h2 className="text-xl font-bold">Home</h2>
                </header>
                
                <CreatePost onPostCreated={handlePostCreated} />
                
                {isLoading && <Loader />}
                {error && <p className="text-center text-red-400 p-4">{error}</p>}
                <div className="divide-y divide-gray-700">
                    {posts.map(post => <PostCard key={post.id} post={post} />)}
                </div>
            </main>
            <RightSideBar />
            <BottomNav />
        </div>
    );
};
