import React, { useState } from 'react';

const AddReviewModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const reviewData = {
      name: formData.name,
      rating: parseInt(formData.rating),
      comment: formData.comment
    };

    // Kirim ke parent (App.js / Reviews.js)
    onSave(reviewData);

    // Reset form
    setFormData({
      name: '',
      rating: 5,
      comment: ''
    });

    // Tutup modal setelah simpan
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const generateStars = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? '★' : '☆';
    }
    return stars;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold">Tambah Review Baru</h3>
          <button 
            onClick={onClose}
            className="text-3xl hover:text-red-600 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Pindahkan tombol ke dalam form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="review-name" className="block font-medium mb-1 text-gray-700">
              Nama Pelanggan
            </label>
            <input 
              type="text" 
              id="review-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
              placeholder="Masukkan nama pelanggan"
            />
          </div>

          <div>
            <label htmlFor="review-rating" className="block font-medium mb-1 text-gray-700">
              Rating
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="number" 
                id="review-rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                min="1"
                max="5"
                required
                className="w-20 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
              <span className="text-2xl text-yellow-500">
                {generateStars(formData.rating)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Pilih rating dari 1 (terendah) sampai 5 (tertinggi)
            </p>
          </div>

          <div>
            <label htmlFor="review-text" className="block font-medium mb-1 text-gray-700">
              Isi Review
            </label>
            <textarea 
              id="review-text"
              name="comment"
              rows="5"
              value={formData.comment}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition resize-vertical"
              placeholder="Tuliskan review lengkap dari pelanggan..."
            />
          </div>

          {/* Tombol sekarang ada DI DALAM form */}
          <div className="flex justify-end items-center pt-6 border-t space-x-4">
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="bg-[#0D6A5D] text-white font-bold py-2 px-6 rounded-md hover:bg-green-800 transition-colors"
            >
              Simpan Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
