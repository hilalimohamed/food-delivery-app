import Image from "next/image";
import React, { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mb-4">
      <label
        htmlFor="category-select"
        className="font-bold text-xl z-50 text-white"
      >
        Choose a category:
      </label>
      <div
        id="category-select"
        className="flex justify-between items-center mt-2 p-2 border border-gray-300 rounded w-full cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Image
            src={
              categories.find((cat) => cat.id === selectedCategory)?.imageUrl ||
              "/home/cover4.jpg"
            }
            alt={
              categories.find((cat) => cat.id === selectedCategory)?.name ||
              "Category"
            }
            width={50}
            height={50}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <span className="text-white">
            {categories.find((cat) => cat.id === selectedCategory)?.name ||
              "Select a category"}
          </span>
        </div>
        <div
          className={`text-xl transition-transform duration-500 text-white ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <GrFormNext />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="px-4 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCategoryClick(null)}
            >
              <div className="flex items-center">
                <Image
                  src="/home/cover4.jpg"
                  alt="All categories"
                  width={50}
                  height={50}
                  className="w-7 h-7 rounded-full object-cover mr-2"
                />
                <span>All</span>
              </div>
            </div>
            {categories.map((category) => (
              <div
                key={category.id}
                className="px-4 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center">
                  <Image
                    src={category.imageUrl || "/home/cover4.jpg"}
                    alt={category.name}
                    width={50}
                    height={50}
                    className="w-7 h-7 rounded-full object-cover mr-2"
                  />
                  <span>{category.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
