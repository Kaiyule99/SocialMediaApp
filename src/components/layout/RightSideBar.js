import React from 'react';

export const RightSideBar = () => {
    return (
        <aside className="w-1/4 h-screen sticky top-0 p-4 pl-6 hidden lg:block">
            <div className="bg-gray-800 rounded-2xl p-4">
                <h3 className="text-xl font-bold mb-4">What's happening</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-400">Trending in Tech</p>
                        <p className="font-bold">#GeminiAPI</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Web Development</p>
                        <p className="font-bold">#ReactJS</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
