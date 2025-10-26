// src/pages/admin/BannerManagement.jsx
import React, { useState, useEffect } from 'react';
import { getBanner, updateBanner, resetBanner } from '../../services/bannerService'; // Sesuaikan path

// URL Backend kamu untuk menampilkan gambar
const BACKEND_URL = 'http://localhost:5000';

const BannerManagement = () => {
  // 1. State disesuaikan dengan skema DB
  const [bannerData, setBannerData] = useState({
    title: '',
    description: '',
    image: '', 
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(''); // State terpisah untuk preview
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Fungsi untuk mengambil data banner saat component dimuat
  const fetchBanner = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getBanner();
      setBannerData(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data banner.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  // 3. Fungsi untuk menangani perubahan input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 4. Fungsi untuk menangani pemilihan file (membuat preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Buat preview URL
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  // 5. Fungsi untuk submit (menggunakan FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', bannerData.title);
    formData.append('description', bannerData.description);
    if (selectedFile) {
      formData.append('image', selectedFile); // 'image' harus cocok dengan backend
    }

    try {
      const response = await updateBanner(formData);
      setBannerData(response.data); // Update state dengan data baru dari server
      setSelectedFile(null); // Hapus file yang dipilih
      setPreviewUrl(''); // Hapus preview
      alert('Perubahan banner berhasil disimpan!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Gagal menyimpan perubahan.');
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Fungsi untuk reset
  const handleReset = async () => {
    if (!window.confirm('Yakin ingin mereset banner ke data default?')) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetBanner();
      setBannerData(response.data); // Update state dengan data default
      setSelectedFile(null);
      setPreviewUrl('');
      alert('Banner berhasil di-reset.');
    } catch (err) {
      console.error(err);
      setError('Gagal mereset banner.');
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Logika untuk menentukan URL gambar yang ditampilkan
  const getDisplayImage = () => {
    if (previewUrl) {
      return previewUrl; // 1. Prioritas: Tampilkan preview file baru
    }
    if (bannerData.image) {
      // 2. Jika tidak ada preview, tampilkan gambar dari server
      // Jika image dari DB adalah URL (http/https), pakai langsung
      if (bannerData.image.startsWith('http')) {
        return bannerData.image;
      }
      // Jika image dari DB adalah path (uploads/...), gabungkan dengan URL backend
      return `${BACKEND_URL}/${bannerData.image}`;
    }
    return ''; // 3. Jika tidak ada, kosongkan
  };

  const bannerStyle = {
    backgroundImage: `url('${getDisplayImage()}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Preview */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Pratinjau Banner Saat Ini
          </label>
          <div
            className="w-2xl h-96 bg-gray-200 bg-cover bg-center rounded-md border"
            style={bannerStyle}
          >
            {isLoading && (
              <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                <span className="text-white">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="banner-image" className="block font-medium mb-2 text-gray-700">
            Ganti Gambar Banner
          </label>
          <input
            type="file"
            id="banner-image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
            disabled={isLoading}
          />
        </div>

        {/* Title Input (diubah dari headline) */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2 text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title" // <-- Diubah
            value={bannerData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
            disabled={isLoading}
          />
        </div>

        {/* Description Input (diubah dari subheadline) */}
        <div>
          <label htmlFor="description" className="block font-medium mb-2 text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description" // <-- Diubah
            rows="3"
            value={bannerData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition"
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-[#0C6B5D] text-white font-bold py-2 px-6 rounded-md hover:bg-green-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Reset ke Default
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerManagement;