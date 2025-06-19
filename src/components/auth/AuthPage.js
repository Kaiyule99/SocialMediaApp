import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { loginUserApi, registerUserApi } from '../../api/socialApi.js';
import { CardinalLogo } from '../layout/Icons.js';

export const AuthPage = ({ isLogin, setPage }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let response;
            if (isLogin) {
                response = await loginUserApi(email, password);
            } else {
                await registerUserApi(name, email, password);
                response = await loginUserApi(email, password);
            }
            login(response.access_token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-6">
                    <CardinalLogo className="w-16 h-16 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    {isLogin ? 'Sign in to Chirp' : 'Create your account'}
                </h2>
                {error && <p className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="name">Name</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 disabled:bg-red-800 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>
                 <p className="text-center text-gray-400 mt-6">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setPage(isLogin ? 'register' : 'login')} className="font-bold text-red-500 hover:underline">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};
