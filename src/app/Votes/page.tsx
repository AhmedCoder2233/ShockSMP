"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import { FaVoteYea } from "react-icons/fa";

const VoteSection = () => {
  // List of voting sites with their links
  const voteSites = [
    { name: "MinecraftServers.org", link: "https://minecraftservers.org/vote/669774" },
    { name: "Minecraft Buzz", link: "https://minecraft.buzz/" },
    { name: "Minecraft-Server.net", link: "https://minecraft-server.net/vote" },
    { name: "PlayMinecraftServers.com", link: "https://play-minecraft-servers.com/minecraft-servers/" },
    { name: "MinecraftBestServers.com", link: "https://minecraftbestservers.com/" },
    { name: "Minecraft.menu", link: "https://minecraft.menu/" },
    { name: "Minecraft Server List", link: "https://minecraft-server-list.com/ "},
    { name: "Minecraft MP", link: "https://minecraft-mp.com/" },
    { name: "Best Minecraft Servers", link: "https://best-minecraft-servers.co/" },
    { name: "Minecraft-ServerList", link: "https://minecraft-serverlist.com/server/2267/vote" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-2">
            <FaVoteYea className="text-yellow-400" />
            Vote for SharkSMP
          </h1>
          <p className="text-lg text-gray-300">
            Help us grow by voting on these platforms!
          </p>
        </motion.div>

        {/* Vote Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voteSites.map((site, index) => (
            <motion.a
              key={index}
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 hover:bg-purple-700/50 transition-colors duration-300"
            >
              <h2 className="text-xl font-semibold text-yellow-400">{site.name}</h2>
              <p className="text-gray-300 mt-2">Click to vote</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoteSection;