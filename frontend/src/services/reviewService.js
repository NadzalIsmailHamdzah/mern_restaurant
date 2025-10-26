import api from "./api";

// GET semua review
export const getReviews = () => api.get("/reviews");

// GET semua review terbaru
export const getNewReviews = () => api.get("/reviews/new");

// CREATE review baru
export const createReview = (data) => api.post("/reviews", data);

// UPDATE review berdasarkan id
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);

// DELETE review berdasarkan id
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

