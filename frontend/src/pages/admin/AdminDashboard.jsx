import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardStats from '../../components/admin/DashboardStats';
import RecentReservations from '../../components/admin/RecentReservations';

const AdminDashboard = () => {
  return (
    <div className="flex h-full bg-gray-100 font-body">
      <AdminSidebar activePage="dashboard" />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <DashboardStats />
        <RecentReservations />
      </main>
    </div>
  );
};

export default AdminDashboard;