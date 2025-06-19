import React from 'react';
import { HomeIcon, UserIcon } from './Icons.js';

export const BottomNav = () => {
    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around p-2">
            <button className="p-2 rounded-full hover:bg-gray-800"><HomeIcon className="w-7 h-7 text-white" /></button>
            <button className="p-2 rounded-full hover:bg-gray-800"><UserIcon className="w-7 h-7 text-white" /></button>
        </footer>
    )
}
