"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import Image from "next/image";

// Define the type for a team member
type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "SharkSMP",
    role: "Owner",
    image: "/skin1.png", // Replace with the actual image path
  },
  {
    name: "T_Jackson_KL",
    role: "Manager",
    image: "/skin2.png", // Replace with the actual image path
  },
];

export default function VIPSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-950 to-blue-900 text-white overflow-hidden">
      {/* Snowfall Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* VIP Section Content */}
      <div className="relative z-10 py-16 px-4">
        <h1 className="text-5xl font-bold text-center mb-12">Our Team</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-yellow-400 text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={400}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-contain"
              />
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-lg text-yellow-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Snowfall CSS */}
      <style jsx>{`
        .snowflake {
          position: absolute;
          top: -10%;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          filter: blur(1px);
          animation: snowfall linear infinite;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(110vh);
          }
        }
      `}</style>
    </div>
  );
}