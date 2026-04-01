import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Shield, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        E
                    </div>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">Expense<span className="text-indigo-600">Flow</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {!user ? (
                        <>
                            <div className="flex items-center gap-6">
                                <Link to="/" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">Features</Link>
                                <Link to="/" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">Pricing</Link>
                                <Link to="/admin" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors flex items-center gap-1">
                                    <Shield size={16} /> Admin
                                </Link>
                            </div>
                            <div className="h-6 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-slate-700 font-semibold hover:text-indigo-600 transition-colors">Log in</Link>
                                <Link to="/register" className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 shadow-indigo-500/20">
                                    Get Started <ChevronRight size={16} />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                                {user.role === 'admin' ?
                                    <Shield size={18} className="text-purple-600" /> :
                                    <User size={18} className="text-indigo-600" />
                                }
                                <span className="font-semibold text-slate-700 text-sm">{user.name}</span>
                                <span className="text-xs px-2 py-0.5 bg-white rounded-full border border-slate-200 uppercase tracking-wider font-bold text-slate-500">
                                    {user.role}
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 md:hidden flex flex-col gap-4 animate-fade-in origin-top">
                    {!user ? (
                        <>
                            <Link to="/login" className="py-2 text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                            <Link to="/admin" className="py-2 text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Admin Portal</Link>
                            <Link to="/register" className="btn-primary text-center justify-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                <User size={20} /> {user.name}
                            </div>
                            <button onClick={handleLogout} className="text-left text-red-500 font-medium">Logout</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
