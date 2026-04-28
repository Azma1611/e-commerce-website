import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const success = login(email, password);
        if (success) {
            alert('Login successful!');
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 pb-12 px-4">
            <Link to="/" className="mb-6">
                <span className="text-3xl font-bold tracking-tighter text-purple-900 italic">Dheza<span className="text-yellow-500">.in</span></span>
            </Link>

            <div className="w-full max-w-[350px] p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
                <h1 className="text-3xl font-medium mb-4 text-gray-900">Sign in</h1>

                {error && <div className="text-red-600 text-xs mb-4 flex items-center"><span className="text-xl mr-1">⚠️</span> {error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Email or mobile phone number</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-sm transition-shadow"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-bold text-gray-900">Password</label>
                            <Link to="#" className="text-sm text-blue-600 hover:text-orange-600 hover:underline">Forgot Password?</Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-sm transition-shadow"
                        />
                    </div>

                    <button type="submit" className="btn btn-accent btn-md w-full rounded-md text-sm font-medium shadow-sm border border-yellow-500 transition-colors">
                        Continue
                    </button>
                </form>

                <p className="mt-5 text-xs text-gray-900 leading-relaxed">
                    By continuing, you agree to Dheza's <Link to="#" className="text-blue-600 hover:text-orange-600 hover:underline">Conditions of Use</Link> and <Link to="#" className="text-blue-600 hover:text-orange-600 hover:underline">Privacy Notice</Link>.
                </p>
            </div>

            <div className="w-full max-w-[350px] mt-6 flex flex-col items-center">
                <div className="flex items-center w-full mb-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-xs text-gray-500">New to Dheza?</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <Link to="/signup" className="btn btn-outline btn-md w-full rounded-md text-sm font-medium shadow-sm border border-gray-300 transition-colors">
                    Create your Dheza account
                </Link>
            </div>
        </div>
    );
};

export default Login;
