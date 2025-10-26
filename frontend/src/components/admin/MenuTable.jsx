import React from 'react';

// URL Backend untuk menampilkan gambar (jika kamu ingin menambahkannya)
const BACKEND_URL = 'http://localhost:5000';

const MenuTable = ({ menuItems, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    // 1. Pastikan harga adalah Angka (Number) sebelum diformat
    const numPrice = Number(price); 
    if (isNaN(numPrice)) {
      return "Harga tidak valid"; // Fallback jika datanya 'abc'
    }
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(numPrice);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr className="border-b">
            {/* Opsional: Tambah kolom Gambar */}
            <th className="p-4 font-medium text-gray-700 w-24">Gambar</th> 
            <th className="p-4 font-medium text-gray-700">Nama Menu</th>
            <th className="p-4 font-medium text-gray-700">Kategori</th>
            <th className="p-4 font-medium text-gray-700">Harga</th>
            <th className="p-4 font-medium text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.length > 0 ? (
            menuItems.map((menu) => (
              // 2. Gunakan 'menu.id' (huruf kecil) untuk key
              <tr key={menu.id} className="border-b hover:bg-gray-50">
                
                {/* Opsional: Tampilkan gambar */}
                <td className="p-4">
                  <img 
                    src={`${BACKEND_URL}/${menu.image}`} 
                    alt={menu.name}
                    className="w-16 h-12 object-cover rounded-md"
                  />
                </td>
                
                <td className="p-4 text-gray-900">{menu.name}</td>
                <td className="p-4 text-gray-600">{menu.category}</td>
                
                {/* 3. Kirim Angka (Number) ke formatPrice */}
                <td className="p-4 text-gray-600">{formatPrice(menu.price)}</td>
                
                <td className="p-4">
                  <div className="space-x-2">
                    <button
                      onClick={() => onEdit(menu)}
                      className="text-accent hover:text-yellow-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      // 4. Pastikan 'menu.id' (huruf kecil) juga di sini
                      onClick={() => onDelete(menu.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            // Tampilan jika tidak ada data
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Belum ada data menu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;