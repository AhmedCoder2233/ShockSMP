import { GameDig } from 'gamedig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await GameDig.query({
      type: "minecraft", // Specify the game type
      host: "mc.shocksmp.com", // Server address
      port: 25565, // Server port
    });

    return NextResponse.json({
      status: "Online",
      playerCount: response.players.length,
      players: response.players.map((player: any) => player.name),
      version: response.version || "Unknown",
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