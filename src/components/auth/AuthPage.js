import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUserApi, registerUserApi } from '../../api/socialApi';
import { CardinalLogo } from '../layout/Icons';

export const AuthPage = ({ isLogin }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let loginResponse;
            if (isLogin) {
                loginResponse = await loginUserApi(email, password);
            } else {
                await registerUserApi(fName, lName, email, password);
                loginResponse = await loginUserApi(email, password);
            }

            // --- FIX ---
            // Explicitly check if the access_token exists in the response.
            if (loginResponse && loginResponse.access_token) {
                login(loginResponse.access_token);
                navigate('/');
            } else {
                // If no token is received, throw an error to be displayed to the user.
                throw new Error("Login successful, but no access token was received from the server.");
            }

        } catch (err) {
            console.error("Authentication Error:", err);
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
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md mb-4 text-center">
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="fName">First Name</label>
                                    <input id="fName" type="text" value={fName} onChange={(e) => setFName(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-bold text-gray-400 block mb-2" htmlFor="lName">Last Name</label>
                                    <input id="lName" type="text" value={lName} onChange={(e) => setLName(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                                </div>
                            </div>
                        </>
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
                    <Link to={isLogin ? '/register' : '/login'} className="font-bold text-red-500 hover:underline">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </Link>
                </p>
            </div>
        </div>
    );
};
