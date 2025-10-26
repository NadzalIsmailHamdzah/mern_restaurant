import React, { useState } from "react";

const ReservationDetailModal = ({ reservation, onUpdateStatus, onClose }) => {
  const [status, setStatus] = useState(reservation.status || "pending");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

const handleSave = () => {
  onUpdateStatus(reservation._id, status); 
};

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold">Detail Reservasi</h3>
          <button
            onClick={onClose}
            className="text-3xl hover:text-red-600 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nama Pemesan</p>
            <p className="text-lg font-semibold">{reservation.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Kontak</p>
            <p className="text-lg font-semibold">{reservation.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Jumlah Orang</p>
            <p className="text-lg font-semibold">{reservation.people}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tanggal</p>
            <p className="text-lg font-semibold">
              {new Date(reservation.date).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Catatan</p>
            <p className="text-lg">{reservation.note || "-"}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Status Reservasi
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end items-center p-6 border-t space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#0C6B5D] text-white font-bold py-2 px-6 rounded-md hover:bg-green-800 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailModal;