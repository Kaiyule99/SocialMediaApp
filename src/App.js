import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { HomePage } from './pages/HomePage.js';
import { LandingPage } from './pages/LandingPage.js';
import { AuthPage } from './components/auth/AuthPage.js';

const Loader = () => (<div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

function App() {
    return (
        <AuthProvider>
            <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
                <PageRouter />
            </div>
        </AuthProvider>
    );
}

const PageRouter = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [page, setPage] = useState('landing'); 

    if (isLoading) {
        return <Loader />;
    }

    if (isAuthenticated) {
        return <HomePage />;
    }

    switch (page) {
        case 'login':
            return <AuthPage isLogin={true} setPage={setPage} />;
        case 'register':
            return <AuthPage isLogin={false} setPage={setPage} />;
        case 'landing':
        default:
            return <LandingPage setPage={setPage} />;
    }
};

export default App;
