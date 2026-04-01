import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Simple role check after login to ensure it is actually an admin
            // Ideally backend should block this, but frontend check is good UX
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid Admin Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="glass-card w-full max-w-md p-8 relative overflow-hidden to-slate-800 bg-slate-800 border-slate-700 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
                        <p className="text-slate-400 text-sm">Restricted Access Only</p>
                    </div>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                    <Shield size={14} /> {error}
                </div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Admin Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all placeholder:text-slate-600"
                            placeholder="admin@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-0.5">
                        Secure Login
                    </button>

                    <div className="text-center pt-4 border-t border-slate-700/50 mt-6">
                        <Link to="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                            Return to Home
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
