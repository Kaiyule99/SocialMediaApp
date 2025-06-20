import React from 'react';
import { Link } from 'react-router-dom';
import { CardinalLogo } from '../components/layout/Icons';

export const LandingPage = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-900">
            <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
                 <CardinalLogo className="w-64 h-64 lg:w-full lg:h-full max-w-lg text-red-600" />
            </div>
            <div className="flex-1 flex flex-col items-start justify-center p-8 lg:p-12 space-y-8">
                <h1 className="text-6xl md:text-7xl font-extrabold text-white">Chirp</h1>
                <p className="text-2xl md:text-3xl text-gray-300">Join the conversation. Now.</p>
                <div className="space-y-4 w-full max-w-sm">
                    <Link to="/register" className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        Create account
                    </Link>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-2">Already have an account?</h3>
                        <Link to="/login" className="block w-full text-center bg-transparent hover:bg-gray-800 text-red-500 font-bold py-3 px-6 border border-red-500 rounded-full transition duration-300">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
