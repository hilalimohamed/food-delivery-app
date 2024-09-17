"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DetailsTab from "./DetailsTab";
import NutritionTab from "./NutritionTab";
import ReviewsTab from "./ReviewsTab";
import { TbStarFilled } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import AddToCart from "../../components/AddToCart";

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

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  user: any;
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
  detailImages: { url: string }[];
  reviews: Review[];
  averageRating: number;
  numberOfVoters: number;
};

export default function FoodItemDisplay({
  item,
  user,
}: {
  item: FoodItemType;
  user: any;
}) {
  const initialImageUrl = item.imageUrl || "/home/cover4.jpg";
  const [mainImageUrl, setMainImageUrl] = useState(initialImageUrl);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("Details");

  const allImages = [{ url: initialImageUrl }, ...item.detailImages];

  const handleImageClick = (imageUrl: string, index: number) => {
    setMainImageUrl(imageUrl);
    setFocusedIndex(index);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getStarType = (index: number) => {
    if (item.averageRating >= index + 1) return "full";
    if (item.averageRating >= index + 0.2) return "half";
    return "empty";
  };

  return (
    <div>
      <div className="mx-10 grid grid-cols-2 gap-4">
        <div>
          <div className="relative flex justify-center ">
            <Image
              src={mainImageUrl}
              alt={item.name}
              width={500}
              height={400}
              className="object-cover w-[500px] h-[330px] border-4 border-orange-500"
            />
          </div>

          {/* Detail images section */}
          <div className="m-2 flex justify-center items-center gap-1">
            {allImages.length > 0 ? (
              allImages.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image.url}
                    alt={`Detail image ${index + 1}`}
                    width={50}
                    height={40}
                    className={`object-cover rounded-full h-16 w-16 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                      focusedIndex === index ? " opacity-100" : "opacity-80"
                    }`}
                    onClick={() => handleImageClick(image.url, index)}
                  />
                </div>
              ))
            ) : (
              <div>No additional images available.</div>
            )}
          </div>
        </div>

        {/* Right section - Food details */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          {/* <div className="flex">
            <span>
              ⭐⭐⭐⭐⭐ <span className="text-gray-500">({item.numberOfVoters})</span>
            </span>
          </div> */}
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => {
                const starType = getStarType(star - 1); // index from 0 to 4
                return (
                  <div key={star} className="text-xl p-1">
                    {starType === "full" && (
                      <TbStarFilled className="text-yellow-400" />
                    )}
                    {starType === "half" && (
                      <FaStarHalfStroke className="text-yellow-400" />
                    )}
                    {starType === "empty" && (
                      <FaRegStar className="text-yellow-300" />
                    )}
                  </div>
                );
              })}
            </div>
            <span className="ml-2 text-gray-800 text-lg font-bold">
              {item.averageRating.toFixed(1)}
            </span>
            <span className="ml-2 text-gray-500">
              ({item.numberOfVoters} votes)
            </span>
          </div>
          <div className="flex items-center max-w-full pb-3">
            <span className="text-gray-600 text-sm">
              {item.description || "No description available."}
            </span>
          </div>

          <div className="flex items-center space-x-[94px] mt-4">
            <span className="font-bold">Price:</span>
            <span className="text-lg font-bold">
              {item.price.toFixed(2)} Dh
            </span>
          </div>

          <div className="flex items-center space-x-[103px] mt-4">
            <h3 className="font-bold">Size:</h3>
            <div className="grid grid-cols-2 gap-2">
              {item.sizes.map((size) => (
                <div key={size.id} className="text-sm border-2 p-2 rounded">
                  {size.name} ( {size.extraPrice.toFixed(2)} Dh )
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <h3 className="font-bold">extra Ingredients:</h3>
            <div className="grid grid-cols-2 gap-2">
              {item.extraIngredients.map((extraIngredient) => (
                <div
                  key={extraIngredient.id}
                  className="text-sm border-2 p-2 rounded"
                >
                  {extraIngredient.name} ({" +"}
                  {extraIngredient.extraPrice.toFixed(2)} Dh )
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <Button className="mt-4 text-white py-2 px-4 w-full h-12">
            <AddToCart fooditem={item} />
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <div className="relative flex justify-center items-center">
          <ul className="flex justify-center items-center border-2 border-x-orange-500 border-y-gray-300 p-3 z-10 bg-white">
            <li
              className={`mr-4 cursor-pointer ${activeTab === "Details" ? "font-bold border-b-2 border-orange-500" : ""}`}
              onClick={() => handleTabClick("Details")}
            >
              Details
            </li>
            <li
              className={`mr-4 cursor-pointer ${activeTab === "Nutrition" ? "font-bold border-b-2 border-orange-500" : ""}`}
              onClick={() => handleTabClick("Nutrition")}
            >
              Nutrition
            </li>
            <li
              className={`cursor-pointer ${activeTab === "Reviews" ? "font-bold border-b-2 border-orange-500" : ""}`}
              onClick={() => handleTabClick("Reviews")}
            >
              Customer Reviews
            </li>
          </ul>
          <div className="absolute left-0 top-1/2 w-full border-t-2 border-orange-500"></div>
        </div>

        <div className="mt-4">
          {activeTab === "Details" && <DetailsTab />}
          {activeTab === "Nutrition" && <NutritionTab />}
          {activeTab === "Reviews" && (
            <ReviewsTab
              reviews={item.reviews}
              foodItemId={item.id}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}
