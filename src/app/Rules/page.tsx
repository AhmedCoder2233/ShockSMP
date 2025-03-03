"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import { FaExclamationCircle, FaComment, FaGlobe } from "react-icons/fa";

const RulesPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-2">
            <FaExclamationCircle className="text-yellow-400" />
            The ShockSMP Rules
          </h1>
          <p className="text-lg text-gray-300">
            Be sure to carefully read them to avoid consequences.
          </p>
        </motion.div>

        {/* Chat Rules Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaComment className="text-3xl text-yellow-400" />
            <h2 className="text-3xl font-semibold">Chat Rules</h2>
          </div>
          <div className="space-y-4">
            {[
              "C1. Spamming/Flooding chat with the same message/characters is against the rules (VERBAL WARNING)",
              "C2. Swearing is allowed, only if it is NOT directed at anybody. (MUTE if it's directed at someone)",
              "C3. Harassment of any kind will NOT be tolerated and might result in a TEMPBAN (Or at the staff member's discretion)",
              "C4. Any form of Sexual conversation will result in a MUTE.",
              "C5. Please do not bring any form of real life current events into the server. (May result in MUTE/TEMPBAN)",
              "C6. Advertising in any way is not allowed. Including mentioning other discords, servers, websites, etc. (Youtube allowed)",
              "More Chat Rules to come.",
            ].map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-blue-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400"
              >
                <p className="text-gray-100">{rule}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* World Rules Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <FaGlobe className="text-3xl text-yellow-400" />
            <h2 className="text-3xl font-semibold">World Rules</h2>
          </div>
          <div className="space-y-4">
            {[
              "W1. Hacking/XRAY will result in an immediate permban/ipban. (It is not taken lightly at all. Play the game as intended.)",
              "W2. Allowed modifications include (JEI/REI, MiniMap (without player/mob icons), Inventory Sorting, Pro Placer, Optimization mods, Quality mods to change how the game looks such as subtle effects) If any mods are not listed, ask before using please.",
              "W3. Griefing/Destroying other player-built builds is not allowed, even if it's unclaimed and will result in being JAILED",
              "W4. For gosh sake, please replant at the public server farm.",
              "More World Rules to come.",
            ].map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-blue-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400"
              >
                <p className="text-gray-100">{rule}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RulesPage;