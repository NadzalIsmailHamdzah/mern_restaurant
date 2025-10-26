import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ReservationsManagement from '../../components/admin/ReservationsManagement';

const AdminReservations = () => {
  return (
    <div className="flex h-full bg-gray-100 font-body">
      <AdminSidebar activePage="reservasi" />
      <main className="flex-1 p-8">
        <ReservationsManagement />
      </main>
    </div>
  );
};

export default AdminReservations;