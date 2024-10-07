/* eslint-disable */
"use client";
import React from "react";
import { useCartStore } from "@/app/store/useCartStore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import LocationForm from "./LocationForm";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, addItemToCart, removeItem, decrementItem, clearCart } =
    useCartStore();
  const { handleSubmit } = useForm();

  const [address, setAddress] = React.useState("");
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);

  const handlePlaceOrder = async () => {
    if (!address || latitude === null || longitude === null) {
      alert("Please select a location");
      return;
    }

    try {
      const response = await axios.post("/api/orders", {
        items,
        address,
        latitude,
        longitude,
      });

      if (response.status === 201) {
        clearCart();
        console.log("Order placed successfully:", response.data);
        // Redirect to order page
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("An error occurred while placing the order:", error);
    }
  };

  return (
    <div className="flex flex-col p-6 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6"
      >
        Your Cart
      </motion.h1>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.li
                key={item.foodItemId}
                className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <span className="text-lg font-semibold">
                  {item.name} - {item.totalprice}€
                </span>
                <div className="text-sm">Quantity: {item.quantity}</div>
                <div className="text-lg font-medium">
                  Total: {item.quantity * item.totalprice}€
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() =>
                      decrementItem(
                        item.foodItemId,
                        item.namesize,
                        item.pricesize,
                        item.extraIngredients || []
                      )
                    }
                  >
                    -
                  </Button>
                  <Button
                    className="bg-gray-500 text-white"
                    onClick={() =>
                      removeItem(
                        item.foodItemId,
                        item.namesize,
                        item.pricesize,
                        item.extraIngredients || []
                      )
                    }
                  >
                    Remove
                  </Button>
                  <Button
                    className="bg-green-500 text-white"
                    onClick={() => addItemToCart({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Pass the setAddress, setLatitude, setLongitude to LocationForm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <LocationForm
              setAddress={setAddress}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </motion.div>

          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleSubmit(handlePlaceOrder)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Place Order
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
