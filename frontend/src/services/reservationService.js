import api from "./api";

export const getReservationsToday = () => api.get("/reservations/today");
export const getRecentReservations = () => api.get("/reservations/recent");

export const getReservations = () => api.get("/reservations");

// Tambah reservasi baru
export const createReservation = (data) => api.post("/reservations", data);

// Update status reservasi
export const updateReservationStatus = (id, status) =>
  api.put(`/reservations/${id}/status`, { status });

// Hapus reservasi
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);