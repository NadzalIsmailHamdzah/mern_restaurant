import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import MenuManagement from '../../components/admin/MenuManagement';

const AdminMenu = () => {
  return (
    <div className="flex h-full bg-gray-100 font-body">
      <AdminSidebar activePage="menu" />
      <main className="flex-1 p-8">
        <MenuManagement />
      </main>
    </div>
  );
};

export default AdminMenu;