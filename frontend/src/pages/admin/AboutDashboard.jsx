import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AboutManagement from '../../components/admin/AboutManagement';

const AdminAbout = () => {
  return (
    <div className="flex h-full bg-gray-100 font-body">
      <AdminSidebar activePage="about" />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Manajemen Halaman "Tentang Kami"</h2>
        <AboutManagement />
      </main>
    </div>
  );
};

export default AdminAbout;