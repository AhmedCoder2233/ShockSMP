import { GameDig } from "gamedig";
import { NextResponse } from "next/server";

// Utility function to remove Minecraft formatting codes
const removeFormattingCodes = (text: string): string => {
  return text.replace(/§[0-9a-fk-or]/g, "");
};

export async function GET() {
  try {
    const response = await GameDig.query({
      type: "minecraft", // Specify the game type
      host: "diplomaticamc.com", // Server address
      port: 25565, // Server port
    });

    // Clean up player names
    const players = response.players
      .map((player: any) => removeFormattingCodes(player.name)) // Remove formatting codes
      .filter((player: string) => !player.includes("The Hive Java Edition")); // Filter out non-player names

    // Clean up version string
    const version = removeFormattingCodes(response.version || "Unknown");

    return NextResponse.json({
      status: "Online",
      playerCount: players.length, // Use the cleaned player list length
      players: players.length > 0 ? players : ["Player names are not available."], // Fallback if no player names are available
      version, // Use the cleaned version string
    });
  } catch (error) {
    console.error("Failed to fetch server data:", error);
    return NextResponse.json({
      status: "Offline",
      playerCount: 0,
      players: [],
      version: "Unknown",
    });
  }
}