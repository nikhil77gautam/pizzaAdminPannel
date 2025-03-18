import React from "react";
import { FaBars } from "react-icons/fa"; // Importing FontAwesome icon

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-800 text-white h-16 flex items-center justify-between md:justify-between px-6">
      {/* Menu icon for small screens */}
      <button className="lg:hidden" onClick={toggleSidebar}>
        <FaBars className="text-2xl" />
      </button>

      <h1 className="text-2xl font-bold">Pizza Admin Panel</h1>
    </div>
  );
};

export default Navbar;
