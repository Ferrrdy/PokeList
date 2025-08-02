import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/pokemon', label: 'Pokemon' },
    { href: '/items', label: 'Items' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
    }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo Utama */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-gray-800 tracking-wide transition-transform duration-300 hover:scale-105 z-20"
          onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat klik logo
        >
          PokéList
        </Link>

        {/* Daftar Link Navigasi untuk Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-300 
                ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}
                after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-600 
                after:left-0 after:-bottom-1 after:transition-all after:duration-300
                hover:after:w-full`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Tombol Hamburger Menu untuk Mobile */}
        <div className="md:hidden z-20">
          <button onClick={toggleMobileMenu} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-0 left-0 w-full h-screen bg-white pt-24 px-6 md:hidden"
            >
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={mobileLinkVariants}>
                    <NavLink
                      to={link.href}
                      onClick={toggleMobileMenu} // Tutup menu saat link diklik
                      className={({ isActive }) =>
                        `text-2xl font-semibold ${isActive ? 'text-blue-600' : 'text-gray-700'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
};

export default Navbar;
