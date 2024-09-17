import React from "react";
import OrdersPage from "./components/OrdersPage";
import getOrders from "../action/getOrders";

export default async function page() {
  const orders = await getOrders();
  return (
    <div>
      <OrdersPage orders={orders || []} />
    </div>
  );
}
