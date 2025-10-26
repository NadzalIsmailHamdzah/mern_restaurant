// src/pages/admin/AboutManagement.jsx
import React, { useState, useEffect } from 'react';
import { getAbout, updateAbout, resetAbout } from '../../services/aboutService.js'; // Sesuaikan path

// URL Backend kamu untuk menampilkan gambar
const BACKEND_URL = 'http://localhost:5000';

const AboutManagement = () => {
  const [aboutData, setAboutData] = useState({
    title: '',
    sub_title: '',
    content_title: '',
    description: '',
    image: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data 'About' saat component dimuat
  const fetchAbout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAbout();
      setAboutData(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal mengambil data "Tentang Kami".');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Handler untuk input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler untuk file (membuat preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  // Handler untuk submit (update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', aboutData.title);
    formData.append('sub_title', aboutData.sub_title);
    formData.append('content_title', aboutData.content_title);
    formData.append('description', aboutData.description);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await updateAbout(formData);
      setAboutData(response.data);
      setSelectedFile(null);
      setPreviewUrl('');
      alert('Konten "Tentang Kami" berhasil disimpan!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Gagal menyimpan perubahan.');
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Handler untuk reset
  const handleReset = async () => {
    if (!window.confirm('Yakin ingin mereset konten "Tentang Kami" ke data default?')) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetAbout();
      setAboutData(response.data);
      setSelectedFile(null);
      setPreviewUrl('');
      alert('Konten berhasil di-reset.');
    } catch (err) {
      console.error(err);
      setError('Gagal mereset konten.');
    } finally {
      setIsLoading(false);
    }
  };

  // untuk menampilkan gambar (preview atau dari DB)
  const getDisplayImage = () => {
    if (previewUrl) {
      return previewUrl; // Prioritas 1: Preview file baru
    }
    if (aboutData.image) {
      if (aboutData.image.startsWith('http')) {
        return aboutData.image; // Prioritas 2: Gambar dari URL (default)
      }
      return `${BACKEND_URL}/${aboutData.image}`; // Prioritas 3: Gambar dari server
    }
    return '';
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* === Input Teks Sesuai Model === */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2 text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={aboutData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="sub_title" className="block font-medium mb-2 text-gray-700">
            Sub Title
          </label>
          <input
            type="text"
            id="sub_title"
            name="sub_title"
            value={aboutData.sub_title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="content_title" className="block font-medium mb-2 text-gray-700">
            Content Title
          </label>
          <input
            type="text"
            id="content_title"
            name="content_title"
            value={aboutData.content_title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-2 text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="10"
            value={aboutData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-3 rounded-md resize-vertical"
            disabled={isLoading}
          />
        </div>

        {/* === Input Gambar === */}
        <div>
          <label htmlFor="about-image" className="block font-medium mb-2 text-gray-700">
            Gambar Halaman
          </label>
          <input
            type="file"
            id="about-image"
            name="image" // Samakan dengan model
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            disabled={isLoading}
          />
        </div>

        {/* Image Preview */}
        {getDisplayImage() && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau Gambar:</p>
            <img
              src={getDisplayImage()}
              alt="Preview Tentang Kami"
              className="w-full max-w-md h-48 object-cover rounded-md border"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="flex gap-4 pt-4 border-t">
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
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManagement;