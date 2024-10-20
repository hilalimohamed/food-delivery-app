"use client";
import Link from "next/link";
import React from "react";
import Nav from "./Nav";
import Image from "next/image";
import { Button } from "./ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  console.log("path : ", pathname);

  if (pathname !== "/") {
    return (
      <header className="mt-5 mx-32 rounded-full font-serif">
        <div className="relative rounded-full">
          {/* This is the overlay that provides the opacity */}
          <div className="absolute inset-0 bg-black opacity-100 rounded-full"></div>

          {/* Content wrapper */}
          <div className="relative flex justify-between items-center lg:mx-10 p-2">
            <Link href="/">
              <h1 className="text-2xl font-semibold flex items-end">
                <span className="text-primary text-3xl">.</span>
                <span className="text-white">Fo</span>
                <span>
                  <Image
                    src={"/home/logo/logo.PNG"}
                    width={90}
                    height={90}
                    alt=""
                  />
                </span>
                <span className="text-white">oD</span>
                <span className="text-primary text-3xl">.</span>
              </h1>
            </Link>
            <Nav />
            <div className="flex items-center gap-3">
              {session ? (
                <>
                  <div className="flex items-center gap-2">
                    <Image
                      src={session.user.image || "/home/profile.jpeg"}
                      width={32}
                      height={32}
                      className="rounded-full border border-primary"
                      alt={session.user.name || "User"}
                    />
                    <Link href="/profile">
                      <span className="font-bold text-white">
                        {session.user.name}
                      </span>
                    </Link>
                    <Button
                      onClick={() => signOut()}
                      className="font-bold text-white"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-bold text-white hover:text-black"
                  >
                    Login
                  </Link>
                  <Link href="/register">
                    <Button className="rounded-full font-bold text-base text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
              <Link href="/cart">
                <MdOutlineShoppingCart
                  size={22}
                  className="cursor-pointer text-white hover:text-black"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="rounded-full font-serif">
      <div className="relative rounded-full">
        {/* This is the overlay that provides the opacity */}
        <div className="absolute inset-0  opacity-20 rounded-full"></div>

        {/* Content wrapper */}
        <div className="relative flex justify-between items-center lg:mx-10 p-6">
          <Link href="/">
            <h1 className="text-2xl font-semibold flex items-end">
              <span className="text-primary text-3xl">.</span>
              Fo
              <span>
                <Image
                  src={"/home/logo/logo.PNG"}
                  width={90}
                  height={90}
                  alt=""
                />
              </span>
              oD <span className="text-primary text-3xl">.</span>
            </h1>
          </Link>
          <Nav />
          <div className="flex items-center gap-1 justify-center">
            {session ? (
              <>
                <div className="flex items-center gap-2">
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
                  <Button
                    onClick={() => signOut()}
                    className="font-bold text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex gap-5 items-center">
                <Link
                  href="/login"
                  className="font-bold text-black hover:text-primary"
                >
                  Login
                </Link>
                <Link href="/register" className="mr-4">
                  <Button className="rounded-full font-bold text-base text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}
            <Link href="/cart">
              <MdLocalGroceryStore
                size={22}
                className="cursor-pointer text-black hover:text-primary"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
