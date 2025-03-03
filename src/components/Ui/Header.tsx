"use client"; // Ensure this is a client component

import { useUser, useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Define routes with their corresponding paths
  const routes = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/Shop" },
    { name: "Rules", path: "/Rules" },
    { name: "Votes", path: "/Votes" },
    { name: "Apply", path: "/Apply" },
  ];

  return (
    <header className="bg-blue-800/90 backdrop-blur-sm text-white shadow-lg w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Side: Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Image
            src="/shock.png" // Replace with your logo path
            alt="ShockSMP Logo"
            width={60}
            height={60}
            className="rounded-full object-contain"
          />
        </motion.div>

        {/* Middle: Routes (Desktop) */}
        <nav className="hidden md:flex space-x-8">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={route.path}
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {route.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Side: User Profile or Sign In / Sign Up (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          {isSignedIn ? (
            <>
              {/* User Profile Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={toggleProfileDropdown}
                  className="flex items-center hover:text-yellow-400 transition-colors duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="text-yellow-400">
                    Welcome, {user?.fullName}!
                  </span>
                  <FaUserCircle className="ml-2 text-2xl" />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      className="z-50 right-0 mt-2 w-48 bg-blue-800/90 backdrop-blur-sm rounded-lg shadow-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-2 z-50">
                        <button
                          onClick={() => signOut()}
                          className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded-lg z-50"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link href="/SignIn">
                <motion.button
                  className="flex items-center hover:text-yellow-400 transition-colors duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <FaSignInAlt className="mr-2" /> Sign In
                </motion.button>
              </Link>
              <Link href="/SignUp">
                <motion.button
                  className="flex items-center hover:text-yellow-400 transition-colors duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <FaUserPlus className="mr-2" /> Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-blue-800/90 backdrop-blur-sm top-16 inset-0 w-full h-[350px] p-4 z-[60]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-6">
              {routes.map((route, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={route.path}
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    {route.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col space-y-4">
                {isSignedIn ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-yellow-400">
                        Welcome, {user?.fullName}!
                      </span>
                    </motion.div>
                    <motion.button
                      onClick={() => signOut()}
                      className="flex items-center hover:text-yellow-400 transition-colors duration-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <Link href="/SignIn">
                      <motion.button
                        className="flex items-center hover:text-yellow-400 transition-colors duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <FaSignInAlt className="mr-2" /> Sign In
                      </motion.button>
                    </Link>
                    <Link href="/SignUp">
                      <motion.button
                        className="flex items-center hover:text-yellow-400 transition-colors duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <FaUserPlus className="mr-2" /> Sign Up
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;