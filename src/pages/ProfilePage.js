import React, { useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfilePictureApi } from '../api/socialApi';
import { LeftSideBar } from '../components/layout/LeftSideBar';
import { RightSideBar } from '../components/layout/RightSideBar';
import { PostCard } from '../components/core/PostCard';

const Loader = () => (<div className="flex justify-center items-center p-4"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

export const ProfilePage = () => {
    const { userId } = useParams();
    const { user: loggedInUser, posts, token, updateUser, refreshData, isLoading } = useAuth();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const userPosts = useMemo(() => {
        return posts.filter(post => String(post.author?.id) === userId);
    }, [posts, userId]);

    const isMyProfile = loggedInUser && String(loggedInUser.id) === userId;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setPreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        setUploadError('');
        try {
            const updatedUser = await updateProfilePictureApi(token, selectedFile);
            updateUser(updatedUser);
            setSelectedFile(null);
            setPreview(null);
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    };
    
    if (isLoading) {
        return (
             <div className="flex container mx-auto max-w-7xl">
                <LeftSideBar />
                <main className="w-full md:w-1/2 border-l border-r border-gray-700 min-h-screen"><Loader /></main>
                <RightSideBar />
            </div>
        )
    }
    
    const displayUser = isMyProfile ? loggedInUser : userPosts[0]?.author;
    const fullName = displayUser ? `${displayUser.fName || ''} ${displayUser.lName || ''}`.trim() : 'User';
    const profilePicture = isMyProfile ? (preview || loggedInUser?.profile_picture) : displayUser?.profile_picture;
    const email = isMyProfile ? loggedInUser.email : '';

    return (
        <div className="flex container mx-auto max-w-7xl">
            <LeftSideBar />
            <main className="w-full md:w-1/2 border-l border-r border-gray-700 min-h-screen">
                <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-700 p-4">
                    <h2 className="text-xl font-bold">{fullName}'s Profile</h2>
                </header>
                
                <div className="p-4">
                    <div className="flex items-center space-x-4">
                        <img src={profilePicture || 'https://placehold.co/150x150/d1d5db/374151?text=U'} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                        {isMyProfile && <button onClick={() => fileInputRef.current.click()} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">Change</button>}
                    </div>
                    {isMyProfile && <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*"/>}
                    {selectedFile && isMyProfile && (
                        <div className="my-4">
                            <button onClick={handleUpload} disabled={uploading} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-full">
                                {uploading ? 'Uploading...' : 'Save New Picture'}
                            </button>
                        </div>
                    )}
                    {uploadError && <p className="text-red-400 mt-2">{uploadError}</p>}
                    
                    <h1 className="text-2xl font-bold mt-4">{fullName}</h1>
                    {isMyProfile && <p className="text-gray-400">{email}</p>}
                </div>
                
                <div className="border-t border-gray-700">
                    <h3 className="p-4 text-xl font-bold">Chirps</h3>
                    {userPosts.length > 0 ? (
                        <div className="divide-y divide-gray-700">
                            {userPosts.map(post => <PostCard key={post.id} post={post} onInteraction={refreshData} />)}
                        </div>
                    ) : (
                        <p className="p-4 text-gray-500">This user hasn't chirped yet.</p>
                    )}
                </div>

                 <div className="p-4 border-t border-gray-700 mt-4">
                    <Link to="/" className="text-red-500 hover:underline">&larr; Back to Home</Link>
                </div>
            </main>
            <RightSideBar />
        </div>
    );
};
