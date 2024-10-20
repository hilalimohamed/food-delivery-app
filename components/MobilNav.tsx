"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenuUnfold2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  MdLocalGroceryStore,
  MdHome,
  MdRestaurantMenu,
  MdInfo,
  MdContactMail,
} from "react-icons/md";

const links = [
  {
    name: "home",
    path: "/",
    icon: <MdHome size={22} />,
  },
  {
    name: "menu",
    path: "/menu",
    icon: <MdRestaurantMenu size={22} />,
  },
  {
    name: "about",
    path: "/about",
    icon: <MdInfo size={22} />,
  },
  {
    name: "contact",
    path: "/contact",
    icon: <MdContactMail size={22} />,
  },
];

export default function MobilNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <RiMenuUnfold2Line className="size-6 text-primary" />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>
            <VisuallyHidden>Navigation Menu</VisuallyHidden>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden>
              This is the navigation menu for the site
            </VisuallyHidden>
          </SheetDescription>

          {/* Logo section */}
          <div className="mt-16 mb-16 flex justify-center">
            <Link href="/">
              <h1 className="text-base font-semibold flex items-end">
                <span className="text-primary text-3xl">.</span>
                Fo
                <span className="w-1/2">
                  <Image
                    src={"/home/logo/logo.PNG"}
                    width={90}
                    height={90}
                    alt="Logo"
                  />
                </span>
                oD <span className="text-primary text-3xl">.</span>
              </h1>
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col justify-center items-center gap-6">
            {links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className={`flex items-center gap-2 ${
                  link.path === pathname &&
                  "px-3 py-1 rounded-md text-orange-500 border-orange-500 border-b-2"
                } capitalize px-3 py-1 font-semibold hover:rounded-md hover:text-orange-500 hover:border-orange-500 hover:border-b-2 transition-all`}
              >
                {link.icon}
                <SheetPrimitive.Close>{link.name}</SheetPrimitive.Close>
              </Link>
            ))}
          </nav>

          {/* Login and Register Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            {session ? (
              <div className="flex flex-col items-center gap-5 w-full">
                <div className="flex gap-3">
                  <Image
                    src={session.user.image || "/home/profile.jpeg"}
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-gray-400"
                    alt={session.user.name || "User"}
                  />
                  <Link href="/profile">
                    <span className="font-bold text-sm">
                      {session.user.name}
                    </span>
                  </Link>
                </div>
                <Button
                  onClick={() => signOut()}
                  className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-400"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-gray-400">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-400">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Cart icon */}
          <Link href="/cart" className="flex justify-center mt-8">
            <motion.div
              className="flex"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: [0, 0, 100, 0],
                y: [0, -20, 0],
                transition: {
                  x: {
                    delay: 2,
                    duration: 1,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: 2,
                    repeat: 1,
                    repeatType: "mirror",
                  },
                },
              }}
            >
              <MdLocalGroceryStore
                size={28}
                className="cursor-pointer text-black hover:text-primary"
              />
            </motion.div>
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
}
