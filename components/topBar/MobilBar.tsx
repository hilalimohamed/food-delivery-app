"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "profile",
    path: "/profile",
  },
  {
    name: "categories",
    path: "/admin/categories",
  },
  {
    name: "menu items",
    path: "/admin/menuitems",
  },
  {
    name: "users",
    path: "/admin/users",
  },
  {
    name: "orders",
    path: "/orders",
  },
];

export default function Bar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-4 justify-center items-center mt-4 p-2 bg-white shadow-md fixed bottom-0 w-full z-50">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "bg-primary text-white"
            } capitalize text-xs px-4 py-2 font-semibold rounded-full transition-all bg-gray-200 hover:bg-primary hover:text-white`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
