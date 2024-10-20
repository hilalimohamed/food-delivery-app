// "use client";

// import React, { useState } from "react";
// import FoodItemMn from "./FoodItemMn";
// import Categories from "./Categories";

// type Category = {
//   id: string;
//   name: string;
//   imageUrl: string | null;
// };

// type Size = {
//   id: string;
//   name: string;
//   extraPrice: number;
// };

// type ExtraIngredient = {
//   id: string;
//   name: string;
//   extraPrice: number;
// };

// type FoodItemType = {
//   id: string;
//   name: string;
//   description: string | null;
//   price: number;
//   imageUrl: string | null;
//   categoryId: string;
//   category: Category;
//   sizes: Size[];
//   extraIngredients: ExtraIngredient[];
// };

// interface FoodItemListProps {
//   foodItems: FoodItemType[];
//   categories: Category[];
// }

// const FoodItemList: React.FC<FoodItemListProps> = ({
//   foodItems,
//   categories,
// }) => {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   // Filter food items by category (independent of search)
//   const categoryFilteredItems = selectedCategory
//     ? foodItems.filter((item) => item.categoryId === selectedCategory)
//     : foodItems;

//   // Filter food items by search query (independent of category)
//   const searchFilteredItems = searchQuery
//     ? foodItems.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : foodItems;

//   // Get the category name for the placeholder
//   const selectedCategoryName = categories.find(
//     (category) => category.id === selectedCategory
//   )?.name;

//   return (
//     <div className="flex flex-col w-3/4">
//       {/* Categories for filtering */}
//       <Categories
//         categories={categories}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />

//       {/* Search input */}
//       <div className="w-full mb-4">
//         <label htmlFor="search-input" className="font-bold text-xl text-white">
//           Search Food Items:
//         </label>
//         <input
//           type="text"
//           id="search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder={`Type food name${selectedCategoryName ? ` for ${selectedCategoryName}` : " for all items"}`}
//           className="mt-2 p-2 border border-gray-300 rounded w-full"
//         />
//       </div>

//       {/* Display items based on selected category or search query (whichever is used) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {selectedCategory || searchQuery
//           ? categoryFilteredItems
//               .filter((item) => searchFilteredItems.includes(item))
//               .map((foodItem) => (
//                 <FoodItemMn key={foodItem.id} fooditem={foodItem} />
//               ))
//           : foodItems.map((foodItem) => (
//               <FoodItemMn key={foodItem.id} fooditem={foodItem} />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default FoodItemList;

"use client";
import { useStore } from "@/app/store/usebuttonStore"; // Import the Zustand store
import React, { useState } from "react";
import FoodItemMn from "./FoodItemMn";
import Categories from "./Categories";

type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
};

type Size = {
  id: string;
  name: string;
  extraPrice: number;
};

type ExtraIngredient = {
  id: string;
  name: string;
  extraPrice: number;
};

type FoodItemType = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  category: Category;
  sizes: Size[];
  extraIngredients: ExtraIngredient[];
};

interface FoodItemListProps {
  foodItems: FoodItemType[];
  categories: Category[];
}

const FoodItemList: React.FC<FoodItemListProps> = ({
  foodItems,
  categories,
}) => {
  const selectedCategory = useStore((state) => state.selectedCategory); // Get selected category from Zustand store
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter food items by category (independent of search)
  const categoryFilteredItems = selectedCategory
    ? foodItems.filter((item) => item.categoryId === selectedCategory)
    : foodItems;

  // Filter food items by search query (independent of category)
  const searchFilteredItems = searchQuery
    ? foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : foodItems;

  // Get the category name for the placeholder
  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory
  )?.name;

  return (
    <div className="flex flex-col w-3/4">
      {/* Categories for filtering */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={useStore((state) => state.setSelectedCategory)}
      />

      {/* Search input */}
      <div className="w-full mb-4">
        <label htmlFor="search-input" className="font-bold text-xl text-white">
          Search Food Items:
        </label>
        <input
          type="text"
          id="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Type food name${selectedCategoryName ? ` for ${selectedCategoryName}` : " for all items"}`}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Display items based on selected category or search query (whichever is used) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-h-[300px] overflow-y-auto">
        {selectedCategory || searchQuery
          ? categoryFilteredItems
              .filter((item) => searchFilteredItems.includes(item))
              .map((foodItem) => (
                <FoodItemMn key={foodItem.id} fooditem={foodItem} />
              ))
          : foodItems.map((foodItem) => (
              <FoodItemMn key={foodItem.id} fooditem={foodItem} />
            ))}
      </div>
    </div>
  );
};
export default FoodItemList;
