import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        const success = signup(name, email, password);
        if (success) {
            alert('Account created successfully!');
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 pb-12 px-4">
            <Link to="/" className="mb-6">
                <span className="text-3xl font-bold tracking-tighter text-purple-900 italic">Dheza<span className="text-yellow-500">.in</span></span>
            </Link>

            <div className="w-full max-w-[350px] p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
                <h1 className="text-3xl font-medium mb-4 text-gray-900">Create Account</h1>

                {error && <div className="text-red-600 text-xs mb-4 flex items-center"><span className="text-xl mr-1">⚠️</span> {error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Your name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-sm transition-shadow"
                            placeholder="First and last name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-sm transition-shadow"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-sm transition-shadow"
                            placeholder="At least 6 characters"
                        />
                        <p className="text-xs text-gray-600 mt-1">Passwords must be at least 6 characters.</p>
                    </div>

                    <button type="submit" className="btn btn-accent btn-md w-full rounded-md text-sm font-medium shadow-sm border border-yellow-500 mt-2 transition-colors">
                        Verify email
                    </button>
                </form>

                <p className="mt-6 text-xs text-gray-900 leading-relaxed">
                    By creating an account, you agree to Dheza's <Link to="#" className="text-blue-600 hover:text-orange-600 hover:underline">Conditions of Use</Link> and <Link to="#" className="text-blue-600 hover:text-orange-600 hover:underline">Privacy Notice</Link>.
                </p>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-900">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:text-orange-600 hover:underline">Sign in <span className="text-xs">▶</span></Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
