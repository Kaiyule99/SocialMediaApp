import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { ProfilePage } from './pages/ProfilePage';

const Loader = () => (<div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>);

// This component protects routes that require a user to be logged in.
// If the user is not authenticated, it redirects them to the landing page.
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <Loader />;
    return isAuthenticated ? children : <Navigate to="/landing" />;
};

// This component is for public routes like login/register.
// If the user is already logged in, it redirects them to the home page.
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
                        {/* Protected Routes */}
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        
                        {/* Public Routes */}
                        <Route path="/landing" element={<PublicRoute><LandingPage /></PublicRoute>} />
                        <Route path="/login" element={<PublicRoute><AuthPage isLogin={true} /></PublicRoute>} />
                        <Route path="/register" element={<PublicRoute><AuthPage isLogin={false} /></PublicRoute>} />

                        {/* Default redirect for any other path */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
