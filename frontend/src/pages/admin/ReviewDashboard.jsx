import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ReviewsManagement from '../../components/admin/ReviewsManagement';

const AdminReviews = () => {
  return (
    <div className="flex h-full bg-gray-100 font-body">
      <AdminSidebar activePage="review" />
      <main className="flex-1 p-8">
        <ReviewsManagement />
      </main>
    </div>
  );
};

export default AdminReviews;