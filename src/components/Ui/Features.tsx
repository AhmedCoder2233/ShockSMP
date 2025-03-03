"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const features = [
    {
      icon: "🍂",
      title: "Dynamic Seasons",
      description: "Experience the changing seasons with unique weather, crops, and events throughout the year.",
    },
    {
      icon: "🌍",
      title: "Vanilla+ World Generator",
      description: "Explore a beautifully enhanced world with custom terrain generation that stays true to the vanilla experience.",
    },
    {
      icon: "🏡",
      title: "Community Builds",
      description: "Collaborate with others to create stunning towns, farms, and projects in a friendly and welcoming environment.",
    },
    {
      icon: "👥",
      title: "Active Community",
      description: "Join a vibrant and supportive community of players who love Minecraft as much as you do.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('/minecraft-texture-dark.png')] opacity-10"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
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
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-bold text-white mb-12"
        >
          Why Choose Shock SMP?
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
              viewport={{ once: false }}
              className="bg-blue-800/50 backdrop-blur-md rounded-xl p-6 border border-blue-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="text-6xl mb-4"
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-yellow-400 mb-4"
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-gray-300"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: false }}
          className="mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold text-xl rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Join Now and Start Your Adventure!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;