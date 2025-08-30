//import logo from '../public/animal.png';
import '../App.css';
import { Home, PenTool, BookOpen, LogIn ,LogOut } from "lucide-react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname); // auto-detect route
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate=useNavigate();

  const links = [
    { name: "/", label: "Home", href: "/", icon: <Home size={18} /> },
    { name: "/write", label: "Write", href: "/write", icon: <PenTool size={18} /> },
    { name: "/blogs", label: "My Blogs", href: "/blogs", icon: <BookOpen size={18} /> },
  ];
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // redirect to home
  };
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/write"); // go to write blog
    } else {
      navigate("/login"); // go to login/signup
    }
  };

  return (
    <header className=" bg-[#0d0d0d] text-white px-6 py-4 flex items-center justify-between shadow-lg border-b border-zinc-800 w-full z-30">
      {/* Left: Logo + Brand */}
      <div className="flex items-center space-x-2">
        <img
          src='/animal.png'
          alt="NightOwl Logo"
          className="h-12 w-12"
        />
        <span className="text-xl font-bold tracking-wide font-serif">NightOwl</span>
      </div>

      {/* Center: Navigation with Slider */}
      <nav className="relative flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => setActive(link.href)}
            className={`relative z-10 flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
              active === link.href
                ? "text-green-500"
                : "text-white hover:text-green-500"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>

            {active === link.href && (
              <motion.div
                layoutId="nav-slider"
                className="absolute inset-0 rounded-lg bg-zinc-700 -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Right: Auth Buttons */}
      <div className="flex items-center space-x-5">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:text-red-500 hover:bg-zinc-900"
          >
            <LogOut size={18} /> <span>Log Out</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-1 px-3 py-1 rounded-lg hover:text-green-500 hover:bg-zinc-900"
          >
            <LogIn size={18} /> <span>Log In</span>
          </Link>
        )}
        <button
          onClick={handleGetStarted}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};
