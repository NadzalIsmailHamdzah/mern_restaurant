// src/components/admin/MenuModal.jsx
import React, { useState, useEffect } from 'react';

// URL Backend untuk preview
const BACKEND_URL = 'http://localhost:5000';

const MenuModal = ({ menu, onSave, onClose }) => {
  // State untuk form, disesuaikan dengan Mongoose Model
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Isi form jika ini adalah mode "Edit"
  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name,
        description: menu.description,
        category: menu.category,
        price: menu.price.toString(), // Pastikan harga jadi string untuk input
      });
      // Set preview dari gambar yang sudah ada
      if (menu.image) {
        setPreviewUrl(menu.image.startsWith('http') ? menu.image : `${BACKEND_URL}/${menu.image}`);
      }
    } else {
      // Mode "Add New"
      setFormData({ name: '', description: '', category: '', price: '' });
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [menu]);

  // 2. Handler untuk input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handler untuk file (membuat preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 4. Handler untuk Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // --- INI BAGIAN PENTING ---
    // Buat FormData
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);
    
    if (selectedFile) {
      data.append('image', selectedFile); // 'image' harus cocok dengan model & multer
    }
    // --------------------------

    try {
      await onSave(data); // Kirim FormData ke parent (MenuManagement)
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      // (Opsional: tampilkan error di modal)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold">
              {menu ? 'Edit Menu' : 'Tambah Menu Baru'}
            </h3>

            {/* Input Name */}
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">Nama Menu</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-md" />
            </div>

            {/* Input Category */}
            <div>
              <label htmlFor="category" className="block mb-2 font-medium">Kategori</label>
              <input type="text" name="category" id="category" value={formData.category} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-md" />
            </div>

            {/* Input Price */}
            <div>
              <label htmlFor="price" className="block mb-2 font-medium">Harga</label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-md" />
            </div>

            {/* Input Description */}
            <div>
              <label htmlFor="description" className="block mb-2 font-medium">Deskripsi</label>
              <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-md"></textarea>
            </div>

            {/* Input Image */}
            <div>
              <label htmlFor="image" className="block mb-2 font-medium">Gambar</label>
              <input type="file" name="image" id="image" onChange={handleFileChange} accept="image/*" className="w-full border border-gray-300 p-2 rounded-md" />
              {/* Pesan jika mode 'Edit' dan gambar tidak wajib di-upload ulang */}
              {menu && <p className="text-sm text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah gambar.</p>}
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau:</p>
                <img src={previewUrl} alt="Preview" className="w-48 h-32 object-cover rounded-md border" />
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-100 p-4 flex justify-end gap-4 rounded-b-lg">
            <button type="button" onClick={onClose} disabled={isLoading} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="bg-[#0C6B5D] text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-colors disabled:opacity-50">
              {isLoading ? 'Menyimpan...' : (menu ? 'Simpan Perubahan' : 'Tambah Menu')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;