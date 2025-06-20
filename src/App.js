import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { ProfilePage } from './pages/ProfilePage';

const Loader = () => (<div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <Loader />;
    return isAuthenticated ? children : <Navigate to="/landing" />;
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <Loader />;
    return isAuthenticated ? <Navigate to="/" /> : children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        
                        <Route path="/landing" element={<PublicRoute><LandingPage /></PublicRoute>} />
                        <Route path="/login" element={<PublicRoute><AuthPage isLogin={true} /></PublicRoute>} />
                        <Route path="/register" element={<PublicRoute><AuthPage isLogin={false} /></PublicRoute>} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
