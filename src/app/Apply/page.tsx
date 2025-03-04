"use client"; // Ensure this is a client component

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ApplyPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Redirect to /sign-up if the user is not signed in
  if (!isSignedIn) {
    router.push("/SignUp");
    return null;
  }

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Prepare email content
    const emailContent = `
      New Application from ${user.primaryEmailAddress?.emailAddress}:
      
      MC Username: ${data.mcUsername}
      Discord Username: ${data.discordUsername}
      Role Applying For: ${data.role}
      Working Microphone: ${data.microphone}
      Experience with Role: ${data.experience}
      Reason for Applying: ${data.reason}
      Situation Resolution: ${data.situation}
      Handling Disrespect: ${data.disrespect}
      Griefing Punishment: ${data.griefingPunishment}
      Questions: ${data.questions || "N/A"}
    `;

    try {
      // Send email using Nodemailer
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "ahmedmemon3344@gmail.com",
          subject: "New ShockSMP Application",
          text: emailContent,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Apply to Join SharkSMP</h1>
          <p className="text-lg text-gray-300">
            Application Status: <span className="text-red-500">CLOSED</span>
          </p>
        </motion.div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Minimum Age Requirement: 18 years</li>
            <li>Have Discord: Required</li>
            <li>Working Microphone: Recommended</li>
            <li>Clean Record (2+ weeks): Required</li>
            <li>Communicate effectively: Required</li>
          </ul>
        </motion.div>

        {/* Application Form */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold mb-4">Thank you!</h2>
            <p className="text-lg text-gray-300">
              We will get back to you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-lg font-semibold mb-2">
                MC Username*
              </label>
              <input
                type="text"
                name="mcUsername"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Discord Username*
              </label>
              <input
                type="text"
                name="discordUsername"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Which Role are you Applying For?*
              </label>
              <select
                name="role"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              >
                <option value="">Please Select One</option>
                <option value="Moderator">Moderator</option>
                <option value="Admin">Admin</option>
                <option value="Builder">Builder</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Do you have a working Microphone?* (Recommended)
              </label>
              <select
                name="microphone"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              >
                <option value="">Please Select One</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Do you have any experience with the role you chose?*
              </label>
              <select
                name="experience"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              >
                <option value="">Please Select One</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Why do you want to become part of the team?*
              </label>
              <textarea
                name="reason"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Come up with a realistic situation that could occur in the server,
                and explain how you will resolve it.*
              </label>
              <textarea
                name="situation"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                What should you do when you witness a player being disrespectful
                towards others?*
              </label>
              <textarea
                name="disrespect"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                If you see a player griefing, what is the first punishment they
                should receive? (If it's their first griefing offense)*
              </label>
              <select
                name="griefingPunishment"
                required
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              >
                <option value="">Please Select One</option>
                <option value="Warning">Warning</option>
                <option value="Temporary Ban">Temporary Ban</option>
                <option value="Permanent Ban">Permanent Ban</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Have any questions? (Optional)
              </label>
              <textarea
                name="questions"
                className="w-full p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-yellow-400 text-purple-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300"
            >
              Send Application
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;