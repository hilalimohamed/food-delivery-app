"use client"; // This is a client component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCircleArrowUp } from "react-icons/fa6";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }} // Framer Motion hover animation
          whileTap={{ scale: 0.9 }} // Framer Motion click animation
          initial={{ opacity: 0, y: 50 }} // Initial state for animation
          animate={{ opacity: 1, y: 0 }} // Animation when button becomes visible
          exit={{ opacity: 0, y: 50 }} // Exit animation
          className="fixed bottom-8 right-8  text-gray-700 bg-white rounded-full shadow-lg z-50 text-3xl"
        >
          {/* ↑ */}
          <FaCircleArrowUp />
        </motion.button>
      )}
    </>
  );
}
