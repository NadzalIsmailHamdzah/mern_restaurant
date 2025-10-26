import React from 'react';

const ReservationsTable = ({ reservations, onViewDetail }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'confirmed':
        return 'bg-green-200 text-green-800';
      case 'cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr className="border-b">
            <th className="p-4 font-medium text-gray-700">Nama</th>
            <th className="p-4 font-medium text-gray-700">Tanggal & Waktu</th>
            <th className="p-4 font-medium text-gray-700">Jumlah</th>
            <th className="p-4 font-medium text-gray-700">Status</th>
            <th className="p-4 font-medium text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-gray-900">{reservation.name}</td>
              <td className="p-4 text-gray-600">{new Date(reservation.date).toLocaleString()}</td>
              <td className="p-4 text-gray-600">{reservation.people} Orang</td>
              <td className="p-4">
                <div className={`${getStatusClass(reservation.status)} text-center rounded-2xl w-36`}>
                  <span className="text-sm font-medium py-1 rounded-full">
                    {reservation.status}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="space-x-2">
                  <button
                    onClick={() => onViewDetail(reservation)}
                    className="text-accent hover:text-yellow-700 transition-colors font-medium"
                  >
                    Lihat Detail
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;