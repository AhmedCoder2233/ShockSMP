"use client"; // Ensure this component is treated as a Client Component

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaDiscord,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaCopy,
} from "react-icons/fa";
import Image from "next/image";

const HeroSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const controls = useAnimation();

  const handleCopyIP = () => {
    navigator.clipboard.writeText("mc.sharksmp.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Infinite animations for social icons
  useEffect(() => {
    const animateIcons = async () => {
      await controls.start({
        y: [0, -10, 0],
        transition: { duration: 2, repeat: Infinity, repeatType: "mirror" },
      });
    };
    animateIcons();
  }, [controls]);

  // Minecraft-themed particles (swords, diamonds, blocks)
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: i % 2 === 0 ? Math.random() * 30 : 70 + Math.random() * 30, // Place particles on the sides (left or right)
    y: Math.random() * 100, // Spread vertically across the entire height
    size: Math.random() * 30 + 20, // Random size for variety
    type: ["sword", "diamond", "block"][Math.floor(Math.random() * 3)], // Random type
    duration: Math.random() * 5 + 3,
    rotate: Math.random() * 360, // Random initial rotation
  }));

  return (
    <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover blur-sm"
      >
        <source src="/hero.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm"></div>

      {/* Minecraft-themed Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x + "vw",
              y: particle.y + "vh",
              rotate: particle.rotate,
            }}
            animate={{
              y: [particle.y + "vh", particle.y + 5 + "vh", particle.y + "vh"], // Floating up and down
              rotate: [particle.rotate, particle.rotate + 360], // Continuous rotation
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              width: particle.size + "px",
              height: particle.size + "px",
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))", // Glowing effect
            }}
          >
            <Image
              src={`/${particle.type}.png`} // Add sword.png, diamond.png, block.png to your public folder
              alt={particle.type}
              width={particle.size}
              height={particle.size}
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Big Server Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8"
        >
          <Image
            src="/shark.png" // Replace with your logo path
            alt="Minecraft Server Logo"
            width={300}
            height={300}
            className="mx-auto rounded-full shadow-2xl border-4 border-blue-500"
          />
        </motion.div>

        {/* Social Icons */}
        <motion.div
          animate={controls}
          className="flex justify-center space-x-6 mb-8"
        >
          {[
            { icon: FaDiscord, link: "https://discord.com/" },
            { icon: FaTiktok, link: "https://www.tiktok.com/" },
            { icon: FaYoutube, link: "https://www.youtube.com/" },
            { icon: FaInstagram, link: "https://www.instagram.com/" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <social.icon className="w-8 h-8" />
            </a>
          ))}
        </motion.div>

        {/* Server IP */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-blue-800/50 backdrop-blur-md p-4 rounded-xl mx-4"
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <span className="text-xl font-mono">mc.sharksmp.com</span>
            <button
              onClick={handleCopyIP}
              className="p-2 bg-blue-900 rounded-lg hover:bg-black transition-colors duration-300"
            >
              <FaCopy className="w-6 h-6" />
            </button>
          </div>
          {isCopied && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="block mt-2 text-sm text-yellow-400"
            >
              Copied to clipboard!
            </motion.span>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;