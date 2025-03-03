"use client"; // Ensure this component is treated as a Client Component

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const SurvivalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/minecraft-texture.png')] opacity-10"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -100, x: Math.random() * 100 }}
            animate={{ opacity: 1, y: "100vh", x: Math.random() * 100 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Heading - Shock SMP Released! */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Shock SMP Released!
        </motion.h2>

        {/* Subheading - Survival Mode */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: false }}
          className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-8"
        >
          Survival Mode is Here
        </motion.p>

        {/* Animated Icons and Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Rotating Diamond */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -180 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: false }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/diamond.png" // Add diamond.png to your public folder
                alt="Diamond"
                width={100}
                height={100}
                className="mb-4"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: false }}
              className="text-xl text-white"
            >
              Explore the World
            </motion.p>
          </motion.div>

          {/* Middle Column - Scaling Sword */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: false }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/sword.png" // Add sword.png to your public folder
                alt="Sword"
                width={100}
                height={100}
                className="mb-4"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: false }}
              className="text-xl text-white"
            >
              Fight for Survival
            </motion.p>
          </motion.div>

          {/* Right Column - Sliding Block */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 180 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: false }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/block.png" // Add block.png to your public folder
                alt="Block"
                width={100}
                height={100}
                className="mb-4"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: false }}
              className="text-xl text-white"
            >
              Build Your Legacy
            </motion.p>
          </motion.div>
        </div>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: false }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold text-xl rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Link href="https://discord.gg/kXuMa8cz3G">
            Join Now
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SurvivalSection;