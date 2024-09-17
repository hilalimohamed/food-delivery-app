"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import AddItemContent from "./AddItemContent";
import FoodItem from "./FoodItem";

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

export default function PageContent({
  getcategories,
  getfoodItems,
}: {
  getcategories: Category[];
  getfoodItems: FoodItemType[];
}) {
  const [visible, setVisible] = useState(true);
  const [editVisible, setEditVisible] = useState(true);

  const hiddenClick = () => {
    setVisible(!visible);
  };
  const hiddenEditClick = () => {
    setEditVisible(!editVisible);
  };

  return (
    <div className="flex flex-col gap-7 mt-14">
      <div className="mx-10">
        {visible ? (
          <div className="text-center">
            <Button onClick={hiddenClick}>Create New Menu Item</Button>
          </div>
        ) : (
          <div>
            <AddItemContent
              hiddenClick={hiddenClick}
              categories={getcategories}
            />
          </div>
        )}
      </div>
      <div className="mx-10">
        {editVisible ? (
          <div className="text-center">
            <Button onClick={hiddenEditClick}>Edit Menu Item</Button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4">Edit Menu Item</h3>
            <div className="p-8">
              {/* <h1 className="text-3xl font-bold mb-6">Food Items</h1> */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {getfoodItems.map((foodItem) => (
                  <FoodItem
                    key={foodItem.id}
                    foodItem={foodItem}
                    categories={getcategories}
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <Button
                onClick={hiddenEditClick}
                className="bg-gray-200 hover:bg-gray-300 text-black"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
