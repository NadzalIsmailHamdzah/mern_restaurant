import React from 'react';

const ReviewDetailModal = ({ review, onClose }) => {
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
          <h3 className="text-2xl font-bold">Review dari {review.name}</h3>
          <button 
            onClick={onClose}
            className="text-3xl hover:text-red-600 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-bold text-gray-700">Rating:</h4>
            <p className="text-2xl text-yellow-500 mt-1">
              {generateStars(review.rating)}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-700">Isi Review Lengkap:</h4>
            <p className="p-3 bg-gray-100 rounded-md mt-1 text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        </div>

        <div className="flex justify-end items-center p-6 border-t">
          <button 
            onClick={onClose}
            className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailModal;