import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Filter, Download, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = () => {
    const [claims, setClaims] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All');

    const categories = ['All', 'Travel', 'Food', 'Office', 'Software', 'Other'];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/claims/${id}`,
                { status },
                { headers: { 'x-auth-token': token } }
            );
            fetchClaims();
        } catch (err) {
            console.error(err);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Expense Reimbursement Report", 20, 10);

        const tableColumn = ["Date", "Employee", "Category", "Description", "Amount", "Status"];
        const tableRows = [];

        filteredClaims.forEach(claim => {
            const claimData = [
                new Date(claim.date).toLocaleDateString(),
                claim.user?.name || 'Unknown',
                claim.category || 'Other',
                claim.description,
                `$${claim.amount}`,
                claim.status
            ];
            tableRows.push(claimData);
        });

        try {
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20
            });
            doc.save("expense_report.pdf");
        } catch (error) {
            console.error("PDF Export Error:", error);
            alert("Failed to export PDF. See console for details.");
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Approved': 'bg-green-100 text-green-700 border-green-200',
            'Rejected': 'bg-red-100 text-red-700 border-red-200',
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['Pending']}`}>
                {status}
            </span>
        );
    };

    const filteredClaims = filterCategory === 'All'
        ? claims
        : claims.filter(c => c.category === filterCategory);

    // Analytics Data Calculation
    const categoryData = categories.filter(c => c !== 'All').map(cat => ({
        name: cat,
        value: claims.filter(c => (c.category || 'Other') === cat).reduce((acc, curr) => acc + curr.amount, 0)
    })).filter(d => d.value > 0);

    const statusData = [
        { name: 'Approved', value: claims.filter(c => c.status === 'Approved').length },
        { name: 'Pending', value: claims.filter(c => c.status === 'Pending').length },
        { name: 'Rejected', value: claims.filter(c => c.status === 'Rejected').length },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 pt-28">
            <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                    <p className="text-slate-500">Manage, analyze, and approve expense requests</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={exportPDF} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                        <Download size={16} /> Export Report
                    </button>
                    <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm text-slate-600">
                        Total Claims: <span className="font-bold text-slate-800 ml-1">{claims.length}</span>
                    </div>
                </div>
            </header>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <PieIcon size={20} className="text-primary" /> Spending by Category
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-secondary" /> Claim Status Distribution
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
                <Filter size={20} className="text-slate-400" />
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterCategory === cat
                            ? 'bg-slate-800 text-white'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Employee</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Details</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Date</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Amount</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredClaims.map((claim) => (
                                <tr key={claim._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{claim.user?.name || 'Unknown'}</div>
                                        <div className="text-xs text-slate-500">{claim.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 max-w-md">
                                        <div className="mb-2">
                                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 mr-2">
                                                {claim.category || 'Other'}
                                            </span>
                                        </div>
                                        <p className="text-slate-800 mb-1">{claim.description}</p>
                                        {claim.aiSummary && (
                                            <p className="text-xs text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded border border-indigo-100">
                                                ✨ {claim.aiSummary}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {new Date(claim.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                        ${claim.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(claim.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {claim.status === 'Pending' && (
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => updateStatus(claim._id, 'Approved')}
                                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(claim._id, 'Rejected')}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {filteredClaims.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                        No claims found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
