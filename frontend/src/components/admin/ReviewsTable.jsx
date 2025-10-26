import React, { useState } from "react";

const ReviewsTable = ({ reviews, onViewDetail, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", rating: 5, comment: "" });

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditForm({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", rating: 5, comment: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = () => {
    onUpdate(editingId, {
      name: editForm.name,
      rating: parseInt(editForm.rating),
      comment: editForm.comment,
    });
    setEditingId(null);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-3 border-b">Nama</th>
            <th className="p-3 border-b">Rating</th>
            <th className="p-3 border-b">Review</th>
            <th className="p-3 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="hover:bg-gray-50">
              <td className="p-3 border-b">
                {editingId === review._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  review.name
                )}
              </td>
              <td className="p-3 border-b">
                {editingId === review._id ? (
                  <input
                    type="number"
                    name="rating"
                    value={editForm.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="border p-1 rounded w-16"
                  />
                ) : (
                  review.rating
                )}
              </td>
              <td className="p-3 border-b">
                {editingId === review._id ? (
                  <textarea
                    name="comment"
                    value={editForm.comment}
                    onChange={handleInputChange}
                    rows="2"
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  review.comment
                )}
              </td>
              <td className="p-3 border-b text-center space-x-2">
                {editingId === review._id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onViewDetail(review)}
                      className="font-medium px-3 py-1 rounded hover:text-blue-600"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => startEdit(review)}
                      className="text-yellow-500 font-medium px-3 py-1 rounded hover:text-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(review._id)}
                      className="text-red-500 font-medium px-3 py-1 rounded hover:text-red-300"
                    >
                      Hapus
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {reviews.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                Belum ada review.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
