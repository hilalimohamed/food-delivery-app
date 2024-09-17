"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "menu",
    path: "/menu",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "contact",
    path: "/contact",
  },
];
export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex text-base">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname &&
              "px-3 py-1 rounded-md text-primary border-primary border-b-2"
            } capitalize px-3 py-1 font-semibold hover:rounded-md hover:text-primary hover:border-primary hover:border-b-2 transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
