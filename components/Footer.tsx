"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-transparent text-black py-6 mt-5">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-semibold flex items-end mb-4">
          <span className="text-primary text-3xl">.</span>
          Fo
          <span>
            <Image
              src={"/home/logo/logo.PNG"}
              width={90}
              height={90}
              alt="Logo"
            />
          </span>
          oD <span className="text-primary text-3xl">.</span>
        </h1>
        <div className="flex space-x-4 mb-4">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={24} className="text-blue-600 hover:text-black" />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} className="text-red-500 hover:text-black" />
          </Link>
          <Link href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={24} className="text-green-500 hover:text-black" />
          </Link>
        </div>
        <div className="flex space-x-6 mb-4">
          {/* <Link href="/privacy-policy" className="text-sm hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:text-primary">
            Terms of Service
          </Link> */}
          <Link
            href="/contact"
            className="text-base font-semibold hover:text-primary"
          >
            Contact Us
          </Link>
        </div>
        {/* Horizontal line */}
        <hr className="border-gray-600 w-full mb-4" />
        <p className="text-sm">
          &copy; {currentYear} FooD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
