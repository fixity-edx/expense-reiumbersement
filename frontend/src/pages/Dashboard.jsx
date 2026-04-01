import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return null;

    return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
