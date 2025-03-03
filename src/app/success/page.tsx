"use client"; // Ensure this is a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Send email notifications
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ahmedmemon3344@gmail.com",
        subject: "New Rank Purchase",
        text: "A user has purchased ranks. Check Stripe dashboard for details.",
      }),
    });

    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "user-email@example.com", // Replace with user email
        subject: "Rank Purchase Confirmation",
        text: "Your ranks will be delivered within 24 hours.",
      }),
    });

    // Clear cart
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-12">Payment Successful!</h1>
        <p className="text-lg">
          Your ranks will be delivered within 24 hours.
        </p>
      </div>
    </div>
  );
}