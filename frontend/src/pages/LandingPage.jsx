import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, PieChart, Sparkles, CheckCircle, Smartphone, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="overflow-x-hidden pt-20">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob delay-200"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob delay-700"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 border border-indigo-100 shadow-sm mb-8 animate-fade-up backdrop-blur-md">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        <span className="text-sm font-bold text-indigo-900 tracking-wide uppercase">New: AI Receipt Scanning</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight animate-fade-up delay-100">
                        Expenses made <br />
                        <span className="text-gradient">Effortless.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-200">
                        Stop processing receipts manually. Upload a photo, let our AI handle the data entry, and get reimbursed in record time.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-up delay-300">
                        <Link to="/register" className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-3 group">
                            Start Free Trial
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/login" className="btn-secondary text-lg px-10 py-4 flex items-center justify-center">
                            Employee Login
                        </Link>
                    </div>

                    {/* Hero Image / Dashboard Preview */}
                    <div className="mt-20 relative max-w-5xl mx-auto animate-scale-in delay-500">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                                alt="Dashboard Preview"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />

                            {/* Floating UI Elements */}
                            <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float z-20 max-w-xs">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">Status Update</p>
                                    <p className="text-sm font-bold text-slate-800">Claim #4002 Approved</p>
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float-reverse z-20 max-w-xs">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">AI Analysis</p>
                                    <p className="text-sm font-bold text-slate-800">Receipt Scanned via OCR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Stats */}
            <section className="py-10 border-y border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="animate-fade-up delay-100">
                            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">99%</h3>
                            <p className="text-slate-500 font-medium">Faster Processing</p>
                        </div>
                        <div className="animate-fade-up delay-200">
                            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">24/7</h3>
                            <p className="text-slate-500 font-medium">AI Availability</p>
                        </div>
                        <div className="animate-fade-up delay-300">
                            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">0%</h3>
                            <p className="text-slate-500 font-medium">Paperwork</p>
                        </div>
                        <div className="animate-fade-up delay-400">
                            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">10k+</h3>
                            <p className="text-slate-500 font-medium">Claims Processed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Built for Modern Teams</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Everything you need to manage company spend, from receipt capture to reimbursement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="glass-card p-10 group">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Instant AI Parsing</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Upload a receipt and let our Tesseract OCR & Groq AI engine extract vendor, date, and amount instantly. No manual typing required.
                            </p>
                            <Link to="/register" className="inline-flex items-center text-indigo-600 font-semibold hover:gap-2 transition-all">
                                Try it out <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-card p-10 group">
                            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Approvals</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Admins get a dedicated dashboard to review claims. Approve or reject with one click, and trigger automated email notifications.
                            </p>
                            <Link to="/register" className="inline-flex items-center text-purple-600 font-semibold hover:gap-2 transition-all">
                                See Admin Tools <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-card p-10 group">
                            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-8 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                                <PieChart size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Visual Analytics</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Understand spending patterns with interactive charts. Track expenses by category, department, or month with real-time data.
                            </p>
                            <Link to="/register" className="inline-flex items-center text-pink-600 font-semibold hover:gap-2 transition-all">
                                View Demo <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Layer */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Workflow</span>
                        <h2 className="text-4xl font-bold text-slate-900">How ExpenseFlow Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>

                        {[
                            { icon: Smartphone, title: 'Upload Receipt', desc: 'Take a photo or upload file' },
                            { icon: Sparkles, title: 'AI Processing', desc: 'Data extracted automatically' },
                            { icon: CheckCircle, title: 'Manager Approval', desc: 'One-click verification' },
                            { icon: Globe, title: 'Reimbursement', desc: 'Money sent to account' }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 group-hover:border-indigo-100 transition-transform duration-500">
                                    <step.icon size={32} className="text-slate-700 group-hover:text-indigo-600 transition-colors" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                                <p className="text-slate-500 text-sm max-w-[150px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-50"></div>
                </div>

                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to modernize your finance stack?</h2>
                    <p className="text-indigo-200 text-xl mb-10 max-w-2xl mx-auto">Join thousands of forward-thinking companies saving time and money with ExpenseFlow.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/register" className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            Get Started Now
                        </Link>
                        <Link to="/admin" className="px-8 py-4 bg-transparent border border-indigo-400 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                            Admin Demo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
