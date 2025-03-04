import Stripe from "stripe";
import { NextResponse } from "next/server";
import { sendEmail } from "@/components/utils/nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { cart, email, username } = await request.json();

    // Log the incoming payload for debugging
    console.log("Incoming payload:", { cart, email, username });

    // Validate the payload
    if (!cart || !Array.isArray(cart)) {
      return NextResponse.json(
        { error: "Cart is required and must be an array." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required and must be a string." },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: `Minecraft Username: ${item.minecraftUsername}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      metadata: {
        email,
        username,
        minecraftUsernames: cart.map((item: any) => item.minecraftUsername).join(", "),
        ranks: cart.map((item: any) => item.name).join(", "),
        totalPrice: cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
      },
    });

    // Send email to admin
    const adminEmailContent = `
      New Purchase
      User Email: ${email}
      Username: ${username}
      Ranks Purchased: ${cart.map((item: any) => `${item.name} (${item.quantity}x)`).join(", ")}
      Total Price: $${cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)}
      Minecraft Usernames: ${cart.map((item: any) => item.minecraftUsername).join(", ")}
      Check Stripe dashboard for more details.
    `;

    await sendEmail(
      "ahmedmemon3344@gmail.com", // Admin email
      "New Rank Purchase", // Subject
      adminEmailContent // HTML content
    );

    // Send confirmation email to user
    const userEmailContent = `
      Thank you for your purchase!
      Here are the details of your purchase:
      Ranks Purchased: ${cart.map((item: any) => `${item.name} (${item.quantity}x)`).join(", ")}
      Total Price: $${cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)}
      Minecraft Usernames: ${cart.map((item: any) => item.minecraftUsername).join(", ")}
      If you have any questions, please contact support.
    `;

    await sendEmail(
      email, // User email
      "Purchase Confirmation", // Subject
      userEmailContent // HTML content
    );

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session."},
      { status: 500 }
    );
  }
}