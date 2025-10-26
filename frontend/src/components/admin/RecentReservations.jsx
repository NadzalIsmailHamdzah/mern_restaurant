import React, { useEffect, useState } from "react";
import { getRecentReservations } from "../../services/reservationService";

const RecentReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRecentReservations();
        setReservations(res.data);
      } catch (err) {
        console.error("Gagal ambil reservasi terbaru:", err);
      }
    };
    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "canceled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Reservasi Terbaru</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 font-medium text-gray-700">Nama</th>
              <th className="py-2 font-medium text-gray-700">Tanggal</th>
              <th className="py-2 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id} className="border-b hover:bg-gray-50">
                <td className="py-3 text-gray-900">{reservation.name}</td>
                <td className="py-3 text-gray-600">
                  {new Date(reservation.date).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(
                      reservation.status
                    )}`}
                  >
                    {reservation.status}
                  </span>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan="3" className="py-3 text-center text-gray-500">
                  Belum ada reservasi terbaru
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReservations;
