"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterContext() {
  return (
    <Toaster
      reverseOrder={true}
      position="top-right"
      toastOptions={{
        duration: 1500,
        success: {
          style: {
            backgroundColor: "rgb(218,255,181)",
            color: "black",
            borderRadius: "3px",
            borderLeft: "5px solid green",
            zIndex: "10",
          },
        },
        error: {
          style: {
            backgroundColor: "rgb(255,193,180)",
            color: "black",
            borderRadius: "2px",
            borderLeft: "5px solid red",
            zIndex: "10",
          },
        },
      }}
    />
  );
}
