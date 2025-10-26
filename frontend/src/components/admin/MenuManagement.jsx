import React, { useState, useEffect } from "react";
import MenuTable from "./MenuTable";
import MenuModal from "./MenuModal";
import { getMenus, addMenu, updateMenu, deleteMenu } from "../../services/menuService";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const fetchMenus = async () => {
    try {
      const res = await getMenus();
      setMenuItems(res.data);
    } catch (err) {
      console.error("Gagal fetch menu:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleAddMenu = () => {
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) return;
    try {
      await deleteMenu(menuId);
      fetchMenus();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMenu = async (formData) => {
    try {
      if (editingMenu) {
        await updateMenu(editingMenu.id, formData);
      } else {
        await addMenu(formData);
      }
      fetchMenus();
      setIsModalOpen(false);
      setEditingMenu(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMenu(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manajemen Menu</h2>
        <button
          onClick={handleAddMenu}
          className="bg-[#0C6B5D] text-white font-bold py-2 px-4 rounded-md hover:bg-green-800 transition-colors"
        >
          Tambah Menu Baru
        </button>
      </div>

      <MenuTable
        menuItems={menuItems}
        onEdit={handleEditMenu}
        onDelete={handleDeleteMenu}
      />

      {isModalOpen && (
        <MenuModal
          menu={editingMenu}
          onSave={handleSaveMenu}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MenuManagement;
