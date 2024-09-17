import { formatDate } from "@/utils/formatDate";
import React from "react";

interface FoodItem {
  id: string;
  name: string;
}

interface OrderItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  size?: string;
  extraIngredients?: string;
}

interface Order {
  id: string;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
  user: {
    email: string;
  };
  address: string;
  latitude: number;
  longitude: number;
}

interface OrderDetailsProps {
  orderById: any;
  //   orderById: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderById }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h1>
      <p className="text-gray-700">
        <span className="font-semibold">User:</span> {orderById.user.email}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Status:</span> {orderById.status}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Date:</span>{" "}
        {formatDate(orderById.createdAt)}
      </p>
      <p className="text-gray-700 mt-4">
        <span className="font-semibold">Address:</span> {orderById.address}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Location:</span> Latitude:{" "}
        {orderById.latitude}, Longitude: {orderById.longitude}
      </p>
      <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800">Items:</h2>
      <ul className="list-disc pl-6">
        {orderById.orderItems.map((item: OrderItem) => (
          <li key={item.id} className="text-gray-700">
            {item.foodItem.name} - Quantity: {item.quantity}
            {item.size && `, Size: ${item.size}`}
            {item.extraIngredients && `, Extras: ${item.extraIngredients}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
