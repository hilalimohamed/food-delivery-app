"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/usebuttonStore";

type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
};

export default function Categories({ categories }: { categories: Category[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const router = useRouter();

  const fullCategories = [...categories];
  while (fullCategories.length < 4) {
    fullCategories.push({
      id: `placeholder-${fullCategories.length}`,
      name: "Coming Soon",
      imageUrl: "/path/to/placeholder.jpg",
    });
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId); // Set the selected category in Zustand store
    router.push("/menu"); // Navigate to the menu page
  };

  return (
    <div className="mx-20 mb-20 flex flex-col justify-center items-center">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 1, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-5"
      >
        Recipes by Category
      </motion.div>{" "}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { duration: 1, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
        className="text-gray-600 mb-16 text-xl w-2/3 text-center"
      >
        Excepteur sint occaecat cupidatat non qui proident, sunt culpa qui
        officia deserunmollit anim id est laborum.
      </motion.div>
      <div className="flex justify-center items-center gap-3 w-full">
        <Button
          className="text-3xl text-white p-0.5 rounded-full"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <GrFormPrevious className="p-0.5" />
        </Button>
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="my-10"
        >
          {fullCategories.map((category, index) => (
            <SwiperSlide key={category.id}>
              <motion.div
                initial={{ y: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.7, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                className={`bg-gray-100 rounded-b-full overflow-hidden cursor-pointer ${
                  index % 2 === 0 ? "translate-y-5" : "-translate-y-5"
                }`}
                onClick={() => handleCategoryClick(category.id)} // Handle category click
              >
                <div className="relative group">
                  <Image
                    className="w-full h-60 rounded-b-full object-cover transform transition-transform duration-500 group-hover:-translate-y-11"
                    src={category.imageUrl || "/home/cover4.jpg"}
                    alt={category.name}
                    width={300}
                    height={160}
                  />
                  <div className="absolute bg-gray-100 bottom-0 left-0 w-full -translate-y-3 pb-2 m-1 text-center transition-transform duration-500 group-hover:translate-y-2">
                    <h1 className="text-xl font-bold">{category.name}</h1>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          className="text-3xl text-white p-0.5 rounded-full"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <GrFormNext className="p-0.5" />
        </Button>
      </div>
    </div>
  );
}
