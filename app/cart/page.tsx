"use client";
import React from "react";
// import CartPage from "./components/CartPage";

import dynamic from "next/dynamic";

// Dynamic import of CartPage
const CartPage = dynamic(() => import("./components/CartPage"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <CartPage />
    </div>
  );
}
