import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LeftSideBar } from '../components/layout/LeftSideBar';
import { RightSideBar } from '../components/layout/RightSideBar';
import { BottomNav } from '../components/layout/BottomNav';
import { CreatePost } from '../components/core/CreatePost';
import { PostCard } from '../components/core/PostCard';

const Loader = () => (<div className="flex justify-center items-center p-4"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

export const HomePage = () => {
    const { posts, refreshData, isLoading } = useAuth();
    
    return (
        <div className="flex container mx-auto max-w-7xl">
            <LeftSideBar />
            <main className="w-full md:w-1/2 border-l border-r border-gray-700 min-h-screen">
                <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-700 p-4">
                    <h2 className="text-xl font-bold">Home</h2>
                </header>
                
                <CreatePost onPostCreated={refreshData} />
                
                {isLoading && posts.length === 0 && <Loader />}
                
                <div className="divide-y divide-gray-700">
                    {posts.map(post => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            onInteraction={refreshData}
                        />
                    ))}
                </div>
            </main>
            <RightSideBar />
            <BottomNav />
        </div>
    );
};
