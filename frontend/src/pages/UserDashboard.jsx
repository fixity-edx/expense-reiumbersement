import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Search, Scan } from 'lucide-react';
import Tesseract from 'tesseract.js';

const UserDashboard = () => {
    const [claims, setClaims] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Other');
    const [loading, setLoading] = useState(false);
    const [ocrLoading, setOcrLoading] = useState(false);

    const categories = ['Travel', 'Food', 'Office', 'Software', 'Other'];

    const fetchClaims = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/claims', {
                headers: { 'x-auth-token': token }
            });
            setClaims(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchClaims();
    }, []);

    const processReceipt = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setOcrLoading(true);
        try {
            const result = await Tesseract.recognize(
                file,
                'eng',
                { logger: m => console.log(m) }
            );

            const text = result.data.text;
            console.log("OCR Result:", text);

            // Basic simplistic parsing logic
            const lines = text.split('\n');
            let foundAmount = null;

            // Try to find a dollar amount
            const currencyRegex = /\$?\d+\.\d{2}/;
            const match = text.match(currencyRegex);
            if (match) {
                foundAmount = match[0].replace('$', '');
            }

            if (foundAmount) setAmount(foundAmount);
            setDescription((prev) => (prev ? prev + " " : "") + "Receipt from " + lines[0]);

        } catch (err) {
            console.error(err);
            alert("Could not process receipt image");
        }
        setOcrLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/claims',
                { description, amount, category },
                { headers: { 'x-auth-token': token } }
            );
            setDescription('');
            setAmount('');
            setCategory('Other');
            fetchClaims();
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const getStatusColor = (status) => {
        if (status === 'Approved') return 'text-green-600 bg-green-50 border-green-200';
        if (status === 'Rejected') return 'text-red-600 bg-red-50 border-red-200';
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    };

    return (
        <div className="max-w-7xl mx-auto p-6 pt-28">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-800">My Claims</h1>
                <p className="text-slate-500">Track and manage your reimbursement requests</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Submit Form */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-6 sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <PlusCircle size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">New Claim</h2>
                        </div>

                        <div className="mb-6">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Scan className="w-8 h-8 text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500"><span className="font-semibold">Scan Receipt</span> (Auto-fill)</p>
                                    {ocrLoading && <span className="text-xs text-primary animate-pulse">Processing...</span>}
                                </div>
                                <input type="file" accept="image/*" className="hidden" onChange={processReceipt} />
                            </label>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <select
                                    className="input-field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    className="input-field min-h-[100px] resize-none"
                                    placeholder="e.g. Flight to NYC for Conference"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex justify-center items-center gap-2"
                            >
                                {loading ? 'Analyzing...' : 'Submit Claim'}
                            </button>
                            <p className="text-xs text-slate-400 text-center mt-2">
                                AI will automatically summarize your claim.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Claims List */}
                <div className="lg:col-span-2 space-y-4">
                    {claims.map((claim) => (
                        <div key={claim._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                            {claim.category || 'Other'}
                                        </span>
                                        <h3 className="font-semibold text-lg text-slate-800">{claim.description}</h3>
                                    </div>
                                    <p className="text-slate-500 text-sm">{new Date(claim.date).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(claim.status)}`}>
                                    {claim.status}
                                </span>
                            </div>

                            {claim.aiSummary && (
                                <div className="mb-4 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                                    <p className="text-xs font-semibold text-indigo-500 mb-1 uppercase tracking-wider">AI Summary</p>
                                    <p className="text-sm text-slate-600 italic">"{claim.aiSummary}"</p>
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                <span className="text-slate-400 text-sm">Amount Requested</span>
                                <span className="text-2xl font-bold text-slate-800">${claim.amount}</span>
                            </div>
                        </div>
                    ))}

                    {claims.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                                <Search size={24} className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No claims yet</h3>
                            <p className="text-slate-500">Submit your first expense claim to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
