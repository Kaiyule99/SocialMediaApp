import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon } from './Icons';
import { useAuth } from '../../context/AuthContext';

export const BottomNav = () => {
    const { user } = useAuth();
    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around p-2">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-800"><HomeIcon className="w-7 h-7 text-white" /></Link>
            {user && <Link to={`/profile/${user.id}`} className="p-2 rounded-full hover:bg-gray-800"><UserIcon className="w-7 h-7 text-white" /></Link>}
        </footer>
    )
}
