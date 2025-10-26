import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ activePage = 'dashboard' }) => {
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', to: '/admin' },
    { key: 'banner', label: 'Banner', to: '/admin/banner' },
    { key: 'about', label: 'Tentang Kami', to: '/admin/about' },
    { key: 'menu', label: 'Menu', to: '/admin/menu' },
    { key: 'reservasi', label: 'Reservasi', to: '/admin/reservasi' },
    { key: 'review', label: 'Review', to: '/admin/review' },
  ];

  const getMenuItemClass = (itemKey) => {
    const baseClass = "flex items-center px-4 py-2 rounded-md transition-colors";
    return itemKey === activePage
      ? `${baseClass} bg-[#0D6A5D] text-white`
      : `${baseClass} hover:bg-gray-700 text-white`;
  };

  return (
    <aside className="w-64 h-screen flex-shrink-0 bg-[#1d2c3f] text-white flex flex-col sticky top-0">
      <div className="h-16 flex items-center justify-center text-center border-b border-gray-700">
        <h1 className="text-xl font-bold">Naisham</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={getMenuItemClass(item.key)}
          >
            {item.label}
          </Link>
        ))}
        {/* <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 text-white mt-8"
        >
          <span className="mr-3">🌐</span>
          Lihat Website
        </a> */}
      </nav>
    </aside>
  );
};

export default AdminSidebar;