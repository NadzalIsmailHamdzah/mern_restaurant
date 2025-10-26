import React, { useEffect, useState } from "react";
import ReservationsTable from "./ReservationsTable";
import ReservationDetailModal from "./ReservationDetailModal";
import AddReservationModal from "./ReservationAddDataModal";
import {
  getReservations,
  createReservation,
  updateReservationStatus,
  deleteReservation,
} from "../../services/reservationService";

const ReservationsManagement = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservations, setReservations] = useState([]);

  // fetch data
  useEffect(() => {
    fetchReservations();
  }, []);

const fetchReservations = async () => {
  try {
    const response = await getReservations();
    setReservations(response.data); // ✅ ini kuncinya
  } catch (error) {
    console.error("Gagal ambil reservasi:", error);
  }
};

  const handleViewDetail = (reservation) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  const handleAddReservation = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveReservation = async (reservationData) => {
    try {
      await createReservation(reservationData);
      fetchReservations();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Gagal simpan reservasi:", error);
    }
  };

  const handleUpdateStatus = async (reservationId, newStatus) => {
    try {
      await updateReservationStatus(reservationId, newStatus);
      fetchReservations();
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus reservasi ini?")) {
      try {
        await deleteReservation(reservationId);
        fetchReservations();
      } catch (error) {
        console.error("Gagal hapus reservasi:", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Reservasi</h2>
        <button
          onClick={handleAddReservation}
          className="bg-[#0D6A5D] text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-colors"
        >
          Tambah Reservasi
        </button>
      </div>

      <ReservationsTable
        reservations={reservations}
        onViewDetail={handleViewDetail}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteReservation}
      />

      {isDetailModalOpen && selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          onClose={handleCloseDetailModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {isAddModalOpen && (
        <AddReservationModal
          onSave={handleSaveReservation}
          onClose={handleCloseAddModal}
        />
      )}
    </>
  );
};

export default ReservationsManagement;
