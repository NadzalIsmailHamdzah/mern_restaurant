import React, { useEffect, useState } from "react";
import ReviewsTable from "./ReviewsTable";
import ReviewDetailModal from "./ReviewDetailModal";
import AddReviewModal from "./ReviewAddDataModal";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";

const ReviewsManagement = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Ambil data review dari API saat pertama kali load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews();
        setReviews(res.data); // pastikan backend return array review
      } catch (err) {
        console.error("Gagal ambil review:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleViewDetail = (comment) => {
    setSelectedReview(comment);
    setIsDetailModalOpen(true);
  };

  const handleAddReview = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReview(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveReview = async (reviewData) => {
    try {
      const res = await createReview(reviewData);
      setReviews((prev) => [...prev, res.data]); // tambahkan review baru dari API
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Gagal simpan review:", err);
    }
  };

  const handleUpdateReview = async (id, updatedData) => {
    try {
      const res = await updateReview(id, updatedData);
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? res.data : r))
      );
    } catch (err) {
      console.error("Gagal update review:", err);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus review ini?")) {
      try {
        await deleteReview(id);
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        console.error("Gagal hapus review:", err);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Review</h2>
        <button
          onClick={handleAddReview}
          className="bg-[#0D6A5D] text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-colors"
        >
          Tambah Review
        </button>
      </div>

      <ReviewsTable
        reviews={reviews}
        onViewDetail={handleViewDetail}
        onDelete={handleDeleteReview}
        onUpdate={handleUpdateReview}
      />

      {isDetailModalOpen && selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          onClose={handleCloseDetailModal}
        />
      )}

      {isAddModalOpen && (
        <AddReviewModal
          onSave={handleSaveReview}
          onClose={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default ReviewsManagement;
