import React from "react";
import getFoodItems from "@/app/action/getFoodItems";
import getCategories from "../action/getCategories";
import FoodItemList from "./components/FoodItemList";
import Image from "next/image";

export default async function Page() {
  const foodItems = await getFoodItems();
  const categories = await getCategories();

  return (
    <div className="flex justify-center mt-10 relative max-h-screen">
      <div className="inset-0 -z-10 blur-3xl -top-28 -bottom-10 fixed">
        <Image
          alt="Cover Image"
          // src="/home/cover3.avif"
          src="/home/prfl/toof6.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
        />
      </div>
      <FoodItemList foodItems={foodItems} categories={categories} />
    </div>
  );
}
