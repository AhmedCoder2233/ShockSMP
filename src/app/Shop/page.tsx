"use client"; // Ensure this is a client component

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the type for a rank
type Rank = {
  id: number;
  name: string;
  price: number;
  image: string;
  features: string[];
  description: string; // Added description field
};

// Define the type for a cart item
type CartItem = Rank & {
  minecraftUsername: string;
  quantity: number; // Added quantity field
};

const ranks: Rank[] = [
  {
    id: 1,
    name: "AIR [Lifetime]",
    price: 4.99,
    image: "/rank1.png",
    features: [
      "Access to /afk",
      "Access to /disposal",
      "Access to /hat",
      "Access to /ptime",
      "Access to /workbench",
      "Access to 2 Player Vaults",
      "3 Sethomes",
      "+2 Maximum Shopkeepers (4 Shopkeepers Max)",
      "Ability to use Armor Stands, Chickens, Cows, Creepers, Foxes, Horses, Ocelots, Pigs, Sheep, Skeletons, Spiders, Villagers, Zombies, and Zombie Villagers as your Shopkeepers",
    ],
    description: "AIR Benefits: Access to basic commands and features.",
  },
  {
    id: 2,
    name: "WATER [Lifetime]",
    price: 12.99,
    image: "/rank2.png",
    features: [
      "Everything AIR gets",
      "Access to /back to teleport to your last death location",
      "Access to /cartographytable",
      "Ability to Chat in Color",
      "Access to /enderchest",
      "Access to /loom",
      "Access to 4 Player Vaults",
      "6 Sethomes",
      "+2 Max Shopkeepers (6 Shopkeepers Max)",
      "Ability to use Cave Spiders, Dolphins, Donkeys, Glow Squids, Goats, Hoglins, Iron Golems, Llamas, Mooshrooms, Mules, Piglins, Pillagers, Pufferfish, Salmon, Silverfish, Trader Llamas, Tropical Fish, Turtles, Vindicators, Wandering Traders, Witches, Wither Skeletons, Zoglins, and Zombified Piglins as your shopkeeper",
    ],
    description: "WATER Benefits: Enhanced features and commands.",
  },
  {
    id: 3,
    name: "EARTH [Lifetime]",
    price: 19.99,
    image: "/rank3.png",
    features: [
      "Ability to Chat in Format (Bold, Italic, Underline, Obfuscated, and Strikethrough)",
      "Access to /condense",
      "Access to Custom Text",
      "Ability to Edit Signs",
      "Access to /ext",
      "Access to /fly",
      "Access to /grindstone",
      "Ability to /itemrename",
      "Access to /nick (No format)",
      "Access to /pweather",
      "Access to /realname",
      "Access to 6 Player Vaults",
      "12 Sethomes",
      "Player Vault Size increased to 6 rows",
      "+2 Maximum Shopkeepers (8 Shopkeepers Max)",
      "Ability to use Allay, Blaze, Bogged, Camel, Cod, Elder Guardian, Enderman, Endermite, Evoker, Frog, Ghast, Guardian, Husk, Illusioner, Phantom, Piglin Brute, Polar Bear, Ravager, Shulker, Skeleton Horse, Strider, and Zombie Horse as your shopkeepers",
    ],
    description: "EARTH Benefits: Advanced features and customization.",
  },
  {
    id: 4,
    name: "FIRE [Lifetime]",
    price: 39.99,
    image: "/rank4.png",
    features: [
      "Access to /anvil",
      "Access to /back into other dimensions",
      "Ability to Chat in (Magic, RGB, Url)",
      "Access to /depth",
      "Access to /feed",
      "Access to /itemlore",
      "Access to /near (Also excluded from /near)",
      "Bypass the teleport cooldown",
      "Access to /top",
      "Access to 10 Player Vaults",
      "20 Sethomes",
      "Player Vaults Size increased to 8",
      "+17 Maximum Shopkeepers (25 Maximum Shopkeepers)",
      "Ability to use Armadillo, Axolotl, Breeze, Magma Cube, Slime, Sniffer, Snow Golem, Tadpole, Turtle, Vex, Warden as your shopkeepers!",
      "Access to use hanging signs for your shopkeeper",
    ],
    description: "FIRE Benefits: Premium features and maximum customization.",
  },
];

export default function ShopPage() {
  const { isSignedIn, user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null); // For rank details modal
  const [showDetails, setShowDetails] = useState(false); // Toggle details modal

  const handleAddToCart = (rank: Rank, minecraftUsername: string) => {
    if (!isSignedIn) {
      setError("Please sign in to add items to the cart.");
      return;
    }
    if (!minecraftUsername) {
      setError("Please enter your Minecraft username.");
      return;
    }

    // Check if the item already exists in the cart
    const existingItem = cart.find(
      (item) =>
        item.id === rank.id && item.minecraftUsername === minecraftUsername
    );

    if (existingItem) {
      // If it exists, increase the quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === rank.id && item.minecraftUsername === minecraftUsername
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If it doesn't exist, add it to the cart with quantity 1
      setCart([...cart, { ...rank, minecraftUsername, quantity: 1 }]);
    }

    setError("");
    setSuccess(`${rank.name} added to cart!`); // Show success message
  };

  const handleRemoveFromCart = (itemToRemove: CartItem) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.minecraftUsername === itemToRemove.minecraftUsername
          )
      )
    );
    setSuccess(`${itemToRemove.name} removed from cart!`);
  };

  const handleIncreaseQuantity = (itemToUpdate: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemToUpdate.id &&
        item.minecraftUsername === itemToUpdate.minecraftUsername
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (itemToUpdate: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemToUpdate.id &&
        item.minecraftUsername === itemToUpdate.minecraftUsername
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  setTimeout(() => {
    setSuccess("");
  }, 5000);

  setTimeout(() => {
    setError("");
  }, 5000);



  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Cart Icon */}
        <div className="fixed mt-0 right-4 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="p-3 bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-500 transition-colors duration-300"
          >
            <FaShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Cart Component */}
        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-4 bg-blue-800/90 backdrop-blur-sm rounded-lg p-6 border-l-4 border-yellow-400 w-80 md:w-96 z-40 max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            {cart.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-yellow-400">${item.price} x {item.quantity}</p>
                <p className="text-sm text-gray-300">
                  Minecraft Username: {item.minecraftUsername}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="p-1 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors duration-300"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="p-1 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors duration-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <p className="text-lg font-semibold">Total: ${totalPrice}</p>
            <button
              className="w-full p-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300 mt-4"
            >
              Proceed to Payment
            </button>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded-lg z-50">
            {error}
          </div>
        )}
        {/* Success Message */}
        {success && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-lg z-50">
            {success}
          </div>
        )}

        {/* Rank Details Modal */}
        {showDetails && selectedRank && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-800/90 backdrop-blur-sm rounded-lg p-6 border-l-4 border-yellow-400 w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedRank.image}
                  alt={selectedRank.name}
                  className="w-full md:w-1/2 h-48 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{selectedRank.name}</h2>
                  <p className="text-yellow-400">${selectedRank.price}</p>
                  <p className="text-sm text-gray-300 mb-4">{selectedRank.description}</p>
                  <ul className="list-disc list-inside">
                    {selectedRank.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="w-full p-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300 mt-4"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* Shop Ranks */}
        <h1 className="text-5xl font-bold text-center mb-12">Shop Ranks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ranks.map((rank) => (
            <RankCard
              key={rank.id}
              rank={rank}
              onAddToCart={handleAddToCart}
              onViewDetails={() => {
                setSelectedRank(rank);
                setShowDetails(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const RankCard = ({
  rank,
  onAddToCart,
  onViewDetails,
}: {
  rank: Rank;
  onAddToCart: (rank: Rank, minecraftUsername: string) => void;
  onViewDetails: () => void;
}) => {
  const [minecraftUsername, setMinecraftUsername] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6 border-l-4 border-yellow-400"
    >
      <Image
        src={rank.image}
        alt={rank.name}
        width={500}
        height={300}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{rank.name}</h2>
      <p className="text-lg text-yellow-400 mb-4">${rank.price}</p>
      <input
        type="text"
        placeholder="Minecraft Username"
        value={minecraftUsername}
        onChange={(e) => setMinecraftUsername(e.target.value)}
        className="w-full p-3 bg-blue-800/50 backdrop-blur-sm rounded-lg border-l-4 border-yellow-400 text-white focus:outline-none mb-4"
      />
      <button
        onClick={() => onAddToCart(rank, minecraftUsername)}
        className="w-full p-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-300 mb-2"
      >
        Add to Cart
      </button>
      <button
        onClick={onViewDetails}
        className="w-full p-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-950 transition-colors duration-300"
      >
        View Details
      </button>
    </motion.div>
  );
};