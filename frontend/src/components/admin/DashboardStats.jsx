import React, { useEffect, useState } from "react";
import { getMenuCount } from "../../services/menuService";
import { getReservationsToday } from "../../services/reservationService";
import { getNewReviews } from "../../services/reviewService";

const DashboardStats = () => {
  const [menuCount, setMenuCount] = useState(0);
  const [reservationsToday, setReservationsToday] = useState(0);
  const [newReviews, setNewReviews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, reservRes, reviewRes] = await Promise.all([
          getMenuCount(),
          getReservationsToday(),
          getNewReviews(),
        ]);


        setMenuCount(menuRes.data.count);
        setReservationsToday(reservRes.data.count);
        setNewReviews(reviewRes.data.count);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: "Reservasi Hari Ini", value: reservationsToday },
    { label: "Total Item Menu", value: menuCount },
    { label: "Review Baru", value: newReviews },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium mb-2">
            {stat.label}
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
