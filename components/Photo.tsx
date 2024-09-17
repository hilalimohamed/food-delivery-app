// import Image from "next/image";
// import React from "react";

// export default function Photo() {
//   return (
//     <div>
//       <div className="w-[450px] h-[440px] flex items-center justify-center relative">
//         <Image
//           className="w-[490px] h-[440px]"
//           src="/home/food.PNG"
//           alt="Profile"
//           quality={100}
//           width={200}
//           height={200}
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Photo() {
  const images = [
    "/home/food.PNG",
    "/home/swiper/IMG_4947.PNG",
    "/home/swiper/IMG_4944.PNG",
    // "/home/swiper/IMG_4942.PNG",
    // "/home/swiper/IMG_4943.PNG",
    "/home/swiper/IMG_4945.PNG",
    "/home/swiper/IMG_4946.PNG",
    "/home/swiper/IMG_4948.PNG",
    // "/home/swiper/IMG_4949.PNG",
    // "/home/swiper/IMG_4950.PNG",
    // "/home/swiper/IMG_4951.PNG",
    // "/home/food4.PNG",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="w-[450px] h-[440px] flex items-center justify-center relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex} // Ensure unique key for each image
            className="absolute"
            initial={{ opacity: 0, x: -100 }} // Initial state (fade out)
            animate={{ opacity: 1, x: 0 }} // Animation (fade in)
            exit={{ opacity: 0, x: 90 }} // Exit state (fade out)
            transition={{ duration: 0.8 }} // Smooth animation duration
          >
            <Image
              className="w-[490px] h-[440px]"
              src={images[currentImageIndex]}
              alt="Rotating food images"
              quality={100}
              width={490}
              height={440}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
