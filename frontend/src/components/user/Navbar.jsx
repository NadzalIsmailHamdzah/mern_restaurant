import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0D6A5D] py-4 shadow-lg" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="font-[playfair] text-3xl text-white font-bold">
          Naisham
        </Link>
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-accent transition">
              Beranda
            </Link>
          </li>
          <li>
            <Link to="/tentang" className="text-white hover:text-accent">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link to="/menu" className="text-white hover:text-accent">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/kontak" className="text-white hover:text-accent">
              Kontak
            </Link>
          </li>
          <li>
            <Link
              to="/reservasi"
              className="bg-accent text-white font-bold py-2 px-5 rounded-md bg-[#cc984f] hover:bg-yellow-700 transition"
            >
              Reservasi
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
