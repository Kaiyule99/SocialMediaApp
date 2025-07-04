import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, UserIcon, CardinalLogo } from './Icons';

export const LeftSideBar = () => {
    const { user, logout, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/landing');
    }

    return (
        <aside className="w-1/4 h-screen sticky top-0 py-4 pr-6 hidden md:block">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="p-2 mb-4">
                        <Link to="/"><CardinalLogo className="w-8 h-8 text-red-600" /></Link>
                    </div>
                    <nav>
                        <Link to="/" className="flex items-center space-x-4 p-3 text-xl font-bold text-white rounded-full hover:bg-gray-800"><HomeIcon className="w-7 h-7" /><span>Home</span></Link>
                        
                        {!isLoading && user && (
                            <Link to={`/profile/${user.id}`} className="flex items-center space-x-4 p-3 text-xl text-white rounded-full hover:bg-gray-800">
                                <UserIcon className="w-7 h-7" />
                                <span>Profile</span>
                            </Link>
                        )}
                    </nav>
                </div>
                
                {!isLoading && user && (
                    <div className="mt-auto">
                        <div className="flex items-center p-2 rounded-full hover:bg-gray-800 cursor-pointer" onClick={handleLogout}>
                            <img src={user.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U'} alt="User Avatar" className="w-10 h-10 rounded-full" />
                            <div className="ml-3 hidden xl:block">
                                <p className="font-bold text-sm text-white">{`${user.fName} ${user.lName}`}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                           <button className="ml-auto text-white hidden xl:block font-bold">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
