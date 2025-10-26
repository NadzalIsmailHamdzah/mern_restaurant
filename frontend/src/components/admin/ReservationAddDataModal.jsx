import React, { useState } from "react";

const AddReservationModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    people: "",
    date: "",
    time: "",
    note: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationData = {
      name: formData.name,
      phone: formData.phone,
      date: new Date(`${formData.date}T${formData.time}`),
      people: parseInt(formData.people),
      note: formData.note,
    };

    onSave(reservationData);

    setFormData({
      name: "",
      phone: "",
      people: "",
      date: "",
      time: "",
      note: "",
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold">Tambah Reservasi Baru</h3>
          <button
            onClick={onClose}
            className="text-3xl hover:text-red-600 transition-colors"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Nomor Telepon
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+62xxxxxxxxxxx"
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Jumlah Orang
              </label>
              <input
                type="number"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={getTodayDate()}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Waktu
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Catatan
            </label>
            <textarea
              name="note"
              rows="3"
              value={formData.note}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary"
              placeholder="Catatan khusus..."
            />
          </div>
        </form>

        <div className="flex justify-end items-center p-6 border-t space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#0D6A5D] text-white font-bold py-2 px-6 rounded-md hover:bg-green-800"
          >
            Simpan Reservasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReservationModal;
