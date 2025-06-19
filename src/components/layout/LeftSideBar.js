import React from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { HomeIcon, UserIcon, CardinalLogo } from './Icons.js';

export const LeftSideBar = () => {
    const { user, logout } = useAuth();
    return (
        <aside className="w-1/4 h-screen sticky top-0 py-4 pr-6 hidden md:block">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="p-2 mb-4"> <CardinalLogo className="w-8 h-8 text-red-600" /> </div>
                    <a href="#" className="flex items-center space-x-4 p-3 text-xl font-bold text-white rounded-full hover:bg-gray-800"><HomeIcon className="w-7 h-7" /><span>Home</span></a>
                    <a href="#" className="flex items-center space-x-4 p-3 text-xl text-white rounded-full hover:bg-gray-800"><UserIcon className="w-7 h-7" /><span>Profile</span></a>
                </div>
                <div className="mt-auto">
                    <div className="flex items-center p-2 rounded-full hover:bg-gray-800 cursor-pointer" onClick={logout}>
                        {user && <img src={user.profile_picture || 'https://placehold.co/100x100/d1d5db/374151?text=U'} alt="User Avatar" className="w-10 h-10 rounded-full" />}
                        <div className="ml-3 hidden xl:block">
                            <p className="font-bold text-sm text-white">{user?.name}</p>
                            <p className="text-gray-400 text-sm">{user?.email}</p>
                        </div>
                       <button className="ml-auto text-white hidden xl:block font-bold">Logout</button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
