"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-blue-900/100 relative pb-5 text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/minecraft-texture-dark.png')] opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
          className="flex justify-center gap-6 mb-6"
        >
          <motion.a
            href="https://discord.gg/your-invite-link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fab fa-discord"></i>
          </motion.a>
          <motion.a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fab fa-twitter"></i>
          </motion.a>
          <motion.a
            href="https://youtube.com/your-channel"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fab fa-youtube"></i>
          </motion.a>
        </motion.div>

        {/* Copyright Notice */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: false }}
          className="text-lg text-gray-300"
        >
          &copy; {new Date().getFullYear()} Shock SMP. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;