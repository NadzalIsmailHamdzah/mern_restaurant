import api from "./api";

// Ambil semua menu
export const getMenus = () => api.get("/menu");

// Ambil jumlah menu
export const getMenuCount = () => api.get("/menu/count");

// Ambil detail 1 menu
export const getMenuById = (id) => api.get(`/menu/${id}`);

// Tambah menu (khusus admin)
export const addMenu = (data) => api.post("/menu", data);

// Update menu
export const updateMenu = (id, data) => api.put(`/menu/${id}`, data);

// Hapus menu
export const deleteMenu = (id) => api.delete(`/menu/${id}`);
