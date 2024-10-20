// "use client";

// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Swiper as SwiperType } from "swiper/types";
// import { GrFormPrevious, GrFormNext } from "react-icons/gr";
// import "swiper/css";
// import { motion } from "framer-motion";
// import { Button } from "./ui/button";

// interface Size {
//   id: string;
//   name: string;
//   extraPrice: number;
// }

// interface ExtraIngredient {
//   id: string;
//   name: string;
//   extraPrice: number;
// }

// interface FoodItem {
//   id: string;
//   name: string;
//   description?: string | null;
//   price: number;
//   sizes: Size[];
//   extraIngredients: ExtraIngredient[];
//   imageUrl?: string | null;
// }

// export default function SomeFood({ fooditems }: { fooditems: FoodItem[] }) {
//   const swiperRef = useRef<SwiperType | null>(null);
//   const [isBeginning, setIsBeginning] = useState(true);
//   const [isEnd, setIsEnd] = useState(false);

//   // Function to determine slidesPerView and whether to add a placeholder
//   const slidesToShow = fooditems.length < 3 ? 3 : 3;

//   return (
//     <div className="relative min-h-screen">
//       <div className="absolute inset-0 blur-3xl opacity-85 -z-10">
//         <Image
//           alt="Cover Image"
//           src="/home/prfl/food19.jpg"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//           priority={true}
//         />
//       </div>
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={{
//           hidden: { x: "10vw", opacity: 0 },
//           visible: {
//             x: 0,
//             opacity: 1,
//             transition: {
//               delay: 0.3,
//               duration: 1,
//               ease: "easeInOut",
//               staggerChildren: 0.2,
//             },
//           },
//         }}
//       >
//         <div className="relative mx-24">
//           {/* Motion child for title */}
//           <motion.div
//             variants={{
//               hidden: { x: "-10vw", opacity: 0 },
//               visible: { x: 0, opacity: 1 },
//             }}
//           >
//             <div className="flex items-center justify-center">
//               <h1 className="text-white pt-7 text-5xl font-bold">
//                 Our Best Sellers
//               </h1>
//             </div>
//           </motion.div>

//           <motion.div
//             variants={{
//               hidden: { x: "10vw", opacity: 0 },
//               visible: { x: 0, opacity: 1 },
//             }}
//           >
//             <div className="flex justify-center items-center gap-5">
//               {/* Motion child for previous button */}
//               <Button
//                 className={`text-3xl p-0.5 rounded-full ${isBeginning ? "hidden" : "text-white"}`}
//                 onClick={() => swiperRef.current?.slidePrev()}
//                 disabled={isBeginning}
//               >
//                 <GrFormPrevious className="p-0.5" />
//               </Button>

//               {/* Motion child for Swiper */}

//               <Swiper
//                 spaceBetween={30}
//                 slidesPerView={slidesToShow}
//                 onSwiper={(swiper) => (swiperRef.current = swiper)}
//                 onSlideChange={(swiper) => {
//                   setIsBeginning(swiper.isBeginning);
//                   setIsEnd(swiper.isEnd);
//                 }}
//                 onReachEnd={() => setIsEnd(true)}
//                 onReachBeginning={() => setIsBeginning(true)}
//                 className="my-10"
//               >
//                 {fooditems.map((item) => (
//                   <SwiperSlide key={item.id}>
//                     <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
//                       <Image
//                         className="w-full h-40 object-cover transform transition duration-500 hover:scale-125"
//                         src={item.imageUrl || "/home/cover1.jpg"}
//                         alt={item.name}
//                         width={300}
//                         height={160}
//                       />
//                       <div className="p-4">
//                         <h3 className="text-lg font-semibold">{item.name}</h3>
//                         <p className="text-gray-600 mt-2">
//                           {item.description || "No description available."}
//                         </p>
//                         <p className="text-purple-500 font-bold mt-2">
//                           {item.price}€
//                         </p>
//                         <div className="mt-3">
//                           <ul className="flex flex-wrap gap-2 mb-2">
//                             {item.sizes.map((size) => (
//                               <li
//                                 key={size.id}
//                                 className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
//                               >
//                                 {size.name} (+{size.extraPrice}€)
//                               </li>
//                             ))}
//                           </ul>
//                           <ul className="flex flex-wrap gap-2">
//                             {item.extraIngredients.map((extra) => (
//                               <li
//                                 key={extra.id}
//                                 className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
//                               >
//                                 {extra.name} (+{extra.extraPrice}€)
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}

//                 {/* Placeholder slide if less than 3 items */}
//                 {fooditems.length < 3 && (
//                   <SwiperSlide>
//                     <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
//                       <Image
//                         className="w-full h-40 object-cover transform transition duration-500 hover:scale-125"
//                         src="/home/cover1.jpg"
//                         alt=""
//                         width={300}
//                         height={160}
//                       />
//                       <div className="p-4">
//                         <h3 className="text-lg font-semibold">Item Name</h3>
//                         <p className="text-gray-600 mt-2">
//                           "No description available."
//                         </p>
//                         <p className="text-purple-500 font-bold mt-2">20€</p>
//                         <div className="mt-3">
//                           <ul className="flex flex-wrap gap-2 mb-2">
//                             {[0, 1, 2].map((size, index) => (
//                               <li
//                                 key={index}
//                                 className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
//                               >
//                                 Size Name (+ Extra Price€)
//                               </li>
//                             ))}
//                           </ul>
//                           <ul className="flex flex-wrap gap-2">
//                             {[0, 1, 2].map((extra, index) => (
//                               <li
//                                 key={index}
//                                 className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
//                               >
//                                 Extra Name (+ Extra Price€)
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 )}

//                 {/* Placeholder slide if less than 3 items */}
//                 {fooditems.length === 0 &&
//                   [0, 1, 2].map((item, index) => (
//                     <SwiperSlide key={index}>
//                       <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
//                         <Image
//                           className="w-full h-40 object-cover transform transition duration-500 hover:scale-125"
//                           src="/home/cover1.jpg"
//                           alt=""
//                           width={300}
//                           height={160}
//                         />
//                         <div className="p-4">
//                           <h3 className="text-lg font-semibold">Item Name</h3>
//                           <p className="text-gray-600 mt-2">
//                             No description available.
//                           </p>
//                           <p className="text-purple-500 font-bold mt-2">20€</p>
//                           <div className="mt-3">
//                             <ul className="flex flex-wrap gap-2 mb-2">
//                               {[0, 1, 2].map((size, index) => (
//                                 <li
//                                   key={index}
//                                   className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
//                                 >
//                                   Size Name (+ Extra Price€)
//                                 </li>
//                               ))}
//                             </ul>
//                             <ul className="flex flex-wrap gap-2">
//                               {[0, 1, 2].map((extra, index) => (
//                                 <li
//                                   key={index}
//                                   className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
//                                 >
//                                   Extra Name (+ Extra Price€)
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//               </Swiper>

//               {/* Motion child for next button */}

//               <Button
//                 className={`text-3xl p-0.5 rounded-full ${isEnd ? "hidden" : "text-white"}`}
//                 onClick={() => swiperRef.current?.slideNext()}
//                 disabled={isEnd}
//               >
//                 <GrFormNext className="p-0.5" />
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useSession } from "next-auth/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface Size {
  id: string;
  name: string;
  extraPrice: number;
}

interface ExtraIngredient {
  id: string;
  name: string;
  extraPrice: number;
}

interface FoodItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  sizes: Size[];
  extraIngredients: ExtraIngredient[];
  imageUrl?: string | null;
}

export default function SomeFood({ fooditems }: { fooditems: FoodItem[] }) {
  const { data: session } = useSession();
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Calculate slidesToShow based on the number of food items
  const slidesToShow = fooditems.length < 3 ? 3 : 3;

  // Add placeholders to fill up to 3 slides if food items are less than 3
  const filledFoodItems =
    fooditems.length < 3
      ? [
          ...fooditems,
          ...Array(3 - fooditems.length).fill({ isPlaceholder: true }),
        ]
      : fooditems;

  // Check if the current user is an admin
  const isAdmin = session?.user?.role === "ADMIN";
  // console.log("wach admin ", session?.user?.role);

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 blur-3xl opacity-85 -z-10">
        <Image
          alt="Cover Image"
          src="/home/prfl/food19.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { x: "10vw", opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.3,
              duration: 1,
              ease: "easeInOut",
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <div className="relative mx-24">
          <motion.div
            variants={{
              hidden: { x: "-10vw", opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <div className="flex items-center justify-center">
              <h1 className="text-white pt-7 text-5xl font-bold">
                Our Best Sellers
              </h1>
            </div>
          </motion.div>

          {/* message to admin or users */}
          {fooditems.length === 0 ? (
            <div className="text-center text-white font-bold my-4">
              {/* Show this message only if the user is an admin */}
              {session ? (
                isAdmin ? (
                  <>
                    There are no items available. Consider adding new items to
                    the list.
                  </>
                ) : (
                  <>
                    No items are currently available. Please check back later.
                  </>
                )
              ) : (
                <>No items are currently available. Please check back later.</>
              )}
            </div>
          ) : (
            fooditems.length < 3 && (
              <div className="text-center text-white font-bold my-4">
                {/* Show this message only if the user is an admin */}
                {isAdmin ? (
                  <>
                    You have less than 3 items. Consider adding more items to
                    the list.
                  </>
                ) : (
                  <>
                    There are only a few items available at the moment. Please
                    check back later for more options.
                  </>
                )}
              </div>
            )
          )}

          <motion.div
            variants={{
              hidden: { x: "10vw", opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
          >
            <div className="flex justify-center items-center gap-5">
              <Button
                className={`text-3xl p-0.5 rounded-full ${
                  isBeginning ? "hidden" : "text-white"
                }`}
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
              >
                <GrFormPrevious className="p-0.5" />
              </Button>

              <Swiper
                spaceBetween={30}
                slidesPerView={slidesToShow}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onReachEnd={() => setIsEnd(true)}
                onReachBeginning={() => setIsBeginning(true)}
                className="my-10"
              >
                {filledFoodItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    {item.isPlaceholder ? (
                      <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden cursor-pointer animate-pulse">
                        <div className="w-full h-40 bg-gray-300"></div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-400">
                            Loading...
                          </h3>
                          <p className="text-gray-400 mt-2">
                            Waiting for more items...
                          </p>
                          <p className="text-gray-400 font-bold mt-2">--</p>
                          <div className="mt-3">
                            <ul className="flex flex-wrap gap-2 mb-2">
                              <li className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                                Size Placeholder
                              </li>
                            </ul>
                            <ul className="flex flex-wrap gap-2">
                              <li className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                                Extra Placeholder
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                        <Image
                          className="w-full h-40 object-cover transform transition duration-500 hover:scale-125"
                          src={item.imageUrl || "/home/cover1.jpg"}
                          alt={item.name}
                          width={300}
                          height={160}
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600 mt-2">
                            {item.description || "No description available."}
                          </p>
                          <p className="text-purple-500 font-bold mt-2">
                            {item.price}€
                          </p>
                          <div className="mt-3">
                            <ul className="flex flex-wrap gap-2 mb-2">
                              {item.sizes.map((size: any) => (
                                <li
                                  key={size.id}
                                  className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
                                >
                                  {size.name} (+{size.extraPrice}€)
                                </li>
                              ))}
                            </ul>
                            <ul className="flex flex-wrap gap-2">
                              {item.extraIngredients.map((extra: any) => (
                                <li
                                  key={extra.id}
                                  className="text-sm font-bold text-purple-500 bg-purple-100 px-2 py-1 rounded-md"
                                >
                                  {extra.name} (+{extra.extraPrice}€)
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>

              <Button
                className={`text-3xl p-0.5 rounded-full ${isEnd ? "hidden" : "text-white"}`}
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
              >
                <GrFormNext className="p-0.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
