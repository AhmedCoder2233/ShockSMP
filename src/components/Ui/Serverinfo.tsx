"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Utility function to remove Minecraft formatting codes
const removeFormattingCodes = (text: string): string => {
  return text.replace(/§[0-9a-fk-or]/g, "");
};

type ServerStatusResponse = {
  status: string;
  playerCount: number;
  players: string[];
  version: string;
};

const ServerStatusSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const [serverStatus, setServerStatus] = useState<string>("Loading...");
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [serverVersion, setServerVersion] = useState<string>("Unknown");

  const fetchServerData = async () => {
    try {
      const response = await fetch("/api/serverstatus");
      const data: ServerStatusResponse = await response.json();

      // Clean up player names
      const cleanedPlayers = data.players
        .map((player) => removeFormattingCodes(player))
        .filter((player) => !player.includes("Welcome back"));

      // Update state
      setServerStatus(data.status);
      setPlayerCount(data.playerCount);
      setPlayers(cleanedPlayers);
      setServerVersion(data.version);
    } catch (error) {
      console.error("Failed to fetch server data:", error);
      setServerStatus("Offline");
      setPlayerCount(0);
      setPlayers([]);
      setServerVersion("Unknown");
    }
  };

  useEffect(() => {
    fetchServerData(); // Initial fetch
    const interval = setInterval(fetchServerData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden"
    >
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
        {/* Heading - Server Status */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Server Status
        </motion.h2>

        {/* Server Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: false }}
          className="inline-block bg-blue-800/50 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-blue-700/50 max-w-2xl w-full"
        >
          {/* Server Status Indicator */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`w-4 h-4 rounded-full ${
                serverStatus === "Online" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-2xl font-semibold text-white">
              {serverStatus === "Online" ? "Online" : "Offline"}
            </p>
          </div>

          {/* Server Version */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: false }}
            className="text-xl font-bold text-gray-300 mb-4"
          >
            Version: {serverVersion}
          </motion.p>

          {/* Welcome Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: false }}
            className="text-xl font-bold text-yellow-400 mb-4"
          >
            Welcome to Shark SMP!
          </motion.p>

          {/* Player Count */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            viewport={{ once: false }}
            className="text-lg font-bold text-gray-300 mb-6"
          >
            Currently {playerCount}/1000 players online.
          </motion.p>

         

          {/* Server IP and Discord Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            viewport={{ once: false }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold text-lg rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Join Server: mc.sharksmp.com
            </motion.button>
            <motion.a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Join Discord
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServerStatusSection;