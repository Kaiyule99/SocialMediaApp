import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfilePictureApi } from '../api/socialApi';
import { LeftSideBar } from '../components/layout/LeftSideBar';
import { RightSideBar } from '../components/layout/RightSideBar';

const Loader = () => (<div className="flex justify-center items-center p-4"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

export const ProfilePage = () => {
    const { userId } = useParams();
    const { user: loggedInUser, token, updateUser } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // This useEffect block is for debugging. You can check your browser's console (F12)
    // to see these logs and confirm the data types.
    useEffect(() => {
        console.log("--- Profile Page Debug ---");
        console.log("User ID from URL (string):", userId);
        if (loggedInUser) {
            console.log("Logged-in user ID (check type):", loggedInUser.id);
            // This comparison will now be correct
            console.log("Are IDs equal? (comparison result):", String(loggedInUser.id) === userId);
        }
        console.log("------------------------");
    }, [userId, loggedInUser]);

    // --- FIX ---
    // Convert the logged-in user's ID to a string before comparing it to the
    // userId from the URL, which is always a string.
    const isMyProfile = loggedInUser && String(loggedInUser.id) === userId;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        setError('');
        try {
            const updatedUser = await updateProfilePictureApi(token, selectedFile);
            updateUser(updatedUser);
            setSelectedFile(null);
            setPreview(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Guard against trying to render before the logged-in user's data is available
    if (!loggedInUser) {
        return (
             <div className="flex container mx-auto max-w-7xl">
                <LeftSideBar />
                <main className="w-full md:w-1/2 border-l border-r border-gray-700 min-h-screen">
                    <Loader />
                </main>
                <RightSideBar />
            </div>
        )
    }
    
    const profilePicture = preview || loggedInUser.profile_picture || 'https://placehold.co/150x150/d1d5db/374151?text=U';

    return (
        <div className="flex container mx-auto max-w-7xl">
            <LeftSideBar />
            <main className="w-full md:w-1/2 border-l border-r border-gray-700 min-h-screen">
                <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-700 p-4">
                    <h2 className="text-xl font-bold">{isMyProfile ? 'My Profile' : `Profile: ${userId}`}</h2>
                </header>
                
                <div className="p-4">
                    {isMyProfile ? (
                        <div>
                            <div className="relative w-32 h-32 mb-4">
                                <img 
                                    src={profilePicture}
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full object-cover" 
                                />
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                                    title="Change profile picture"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </button>
                            </div>
                            
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="image/*"
                            />

                            {selectedFile && (
                                <div className="my-4">
                                    <button
                                        onClick={handleUpload}
                                        disabled={loading}
                                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-full"
                                    >
                                        {loading ? 'Uploading...' : 'Save New Picture'}
                                    </button>
                                </div>
                            )}

                            {error && <p className="text-red-400 mt-2">{error}</p>}

                            <h1 className="text-2xl font-bold mt-4">{loggedInUser.name}</h1>
                            <p className="text-gray-400">{loggedInUser.email}</p>
                            <p className="mt-4">This is where the user's posts would be displayed.</p>
                        </div>
                    ) : (
                        <p>This profile does not belong to the currently logged-in user.</p>
                    )}
                </div>
                 <div className="p-4 border-t border-gray-700">
                    <Link to="/" className="text-red-500 hover:underline">&larr; Back to Home</Link>
                </div>
            </main>
            <RightSideBar />
        </div>
    );
};
