// import Link from "next/link";
// import React from "react";

// function Bar() {
//   return (
//     <div>
//       <div className="flex gap-10 justify-center items-center">
//         <Link href="/profile">profile</Link>
//         <Link href="/admin/categories">categories</Link>
//         <Link href="/admin/menuitems">menu items</Link>
//         <Link href="/admin/users">users</Link>
//         <Link href="/orders">orders</Link>
//       </div>
//     </div>
//   );
// }

// export default Bar;
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
    <nav className="flex gap-5 justify-center items-center mt-4">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname &&
              "px-5 py-2 rounded-full text-white text-sm bg-primary"
            } capitalize text-sm px-5 py-2 font-semibold bg-gray-200 rounded-full hover:bg-primary hover:text-white transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
