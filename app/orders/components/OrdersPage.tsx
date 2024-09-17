// "use client";
// import React from "react";

// interface FoodItem {
//   id: string;
//   name: string;
// }

// interface OrderItem {
//   id: string;
//   foodItem: FoodItem;
//   quantity: number;
//   size?: string;
//   extraIngredients?: string;
// }

// interface Order {
//   id: string;
//   status: string;
//   totalPrice: number;
//   address: string;
//   orderItems: OrderItem[];
//   user?: {
//     email: string;
//   };
// }

// interface OrdersPageProps {
//   orders: any;
//   //   orders: Order[];
// }

// const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
//   if (orders.length === 0) {
//     return (
//       <div className="text-center text-gray-500 mt-8">No orders found.</div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>
//       {orders.map((order: Order) => (
//         <div
//           key={order.id}
//           className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
//         >
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Order ID: {order.id}
//           </h2>
//           <p className="text-gray-700">
//             <span className="font-semibold">Status:</span> {order.status}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-semibold">Total Price:</span>{" "}
//             {order.totalPrice} MAD
//           </p>
//           <p className="text-gray-700">
//             <span className="font-semibold">Address:</span> {order.address}
//           </p>
//           <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
//             Order Items:
//           </h3>
//           <ul className="list-disc pl-6">
//             {order.orderItems.map((item: OrderItem) => (
//               <li key={item.id} className="text-gray-700">
//                 {item.foodItem.name} - {item.quantity}x
//                 {item.size && <span> (Size: {item.size})</span>}
//                 {item.extraIngredients && (
//                   <span> (Extras: {item.extraIngredients})</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//           <p className="mt-4 text-gray-700">
//             <span className="font-semibold">Order placed by:</span>{" "}
//             {order.user?.email || "Unknown"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;
import React from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import getUser from "@/app/action/getUser";

interface FoodItem {
  id: string;
  name: string;
}

interface OrderItem {
  id: string;
  foodItem: FoodItem;
}

interface Order {
  id: string;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
  user: {
    email: string;
  };
}

interface OrdersPageProps {
  orders: any;
}

export default async function OrdersPage({ orders }: OrdersPageProps) {
  const user = await getUser();

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">No orders found.</div>
    );
  }

  return (
    <>
      {user?.role === "ADMIN" ? (
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-4 text-left font-semibold">User</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Date</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-800">{order.user.email}</td>
                  <td className="p-4 text-gray-600">{order.status}</td>
                  <td className="p-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="p-4">
                    <Link href={`/orders/${order.id}`}>
                      <button className="text-orange-500 hover:underline">
                        Show Order
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h1>
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white border-l-4 border-l-orange-500 shadow-lg rounded-lg p-6 mb-6 border border-gray-200 hover:border-orange-500 hover:scale-105 transition-all transform duration-500"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Order placed by: {order.user.email}
              </h2>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date:</span>{" "}
                {formatDate(order.createdAt)}
              </p>
              <h3 className="text-md font-semibold mt-4 mb-2 text-gray-800">
                Items:
              </h3>
              <ul className="list-disc pl-6 text-gray-700">
                {order.orderItems.map((item) => (
                  <li key={item.id}>{item.foodItem.name}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href={`/orders/${order.id}`}>
                  <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
                    Show Order
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
