import Image from "next/image";
import React from "react";

import AddToCart from "./AddToCart";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

export default function FoodItemMn({ fooditem }: { fooditem: FoodItemType }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/items/${fooditem.id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      {fooditem.imageUrl ? (
        <Image
          src={fooditem.imageUrl}
          alt={fooditem.name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
      ) : (
        <div className="bg-gray-200 w-full h-48 flex items-center justify-center">
          <Image
            src="/home/food.PNG"
            alt={fooditem.name}
            width={400}
            height={300}
            className="object-cover w-full h-48"
          />
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{fooditem.name}</h2>

        {fooditem.description && (
          <p className="text-gray-600 text-sm mb-4">{fooditem.description}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            dh {fooditem.price.toFixed(2)}
          </span>
          {/* <AddToCart fooditem={fooditem} /> */}
          <Button>See More</Button>
        </div>
      </div>
    </div>
  );
}
