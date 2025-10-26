import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import BannerManagement from '../../components/admin/BannerManagement';

const AdminBanner = () => {
  return (
    <div className="flex h-full bg-gray-100 font-body">
      <AdminSidebar activePage="banner" />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Manajemen Banner</h2>
        <BannerManagement />
      </main>
    </div>
  );
};

export default AdminBanner;