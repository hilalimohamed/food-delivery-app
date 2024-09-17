import Image from "next/image";
import React from "react";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";

type Category = {
  id: string;
  name: string;
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

export default function FoodItem({
  foodItem,
  categories,
}: {
  foodItem: FoodItemType;
  categories: Category[];
}) {
  return (
    <div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl mb-2 cursor-pointer">
        <div className="p-6 flex flex-col-reverse justify-center items-center">
          <div className="flex gap-20 my-3">
            <UpdateItem foodItem={foodItem} categories={categories} />
            <DeleteItem foodItem={foodItem} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{foodItem.name}</h2>
          <p className="mt-2 text-xl text-gray-800">
            <span className="font-semibold">Price:</span> ${foodItem.price}
          </p>
          {/* {foodItem.imageUrl && ( */}
          <Image
            src={foodItem.imageUrl || "/home/food.PNG"}
            alt={foodItem.name}
            className="w-full h-32 object-cover mt-4 rounded-md"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
