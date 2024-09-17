"use client";
import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
};

type Size = {
  //   id: number;
  name: string;
  extraPrice: number;
};

type ExtraIngredient = {
  //   id: number;
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

export default function UpdateItem({
  foodItem,
  categories,
}: {
  foodItem: FoodItemType;
  categories: Category[];
}) {
  //   console.log("items list  :  ", foodItem);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isItemSizeExist, setIsItemSizeExist] = useState(false);
  const [isIngredientsExist, setIsIngredientsExist] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FoodItemType>({
    defaultValues: {
      ...foodItem,
      category: foodItem.category,
      sizes: foodItem.sizes.length
        ? foodItem.sizes
        : [{ name: "", extraPrice: 0 }],
      extraIngredients: foodItem.extraIngredients.length
        ? foodItem.extraIngredients
        : [{ name: "", extraPrice: 0 }],
    },
  });
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "extraIngredients",
  });

  const onSubmit: SubmitHandler<FoodItemType> = async (data) => {
    console.log("hadi", data);
    try {
      const response = await axios.put("/api/fooditems", {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: data.imageUrl,
        sizes: data.sizes.map((size) => ({
          name: size.name,
          extraPrice: size.extraPrice,
        })),
        extraIngredients: data.extraIngredients.map((ingredient) => ({
          name: ingredient.name,
          extraPrice: ingredient.extraPrice,
        })),
      });

      console.log("Updated food item:", response.data);
      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error("Failed to update food item:", error);
    }
  };

  const uploadImage = (result: any) => {
    console.log("Upload Result:", result);
    const imageUrl = result?.info?.secure_url || result?.data?.url || null;
    if (imageUrl) {
      console.log("Image URL:", imageUrl);
      setValue("imageUrl", imageUrl);
    } else {
      console.error("Image URL not found in upload result");
    }
  };

  return (
    <div>
      <div
        className="bg-gray-200 p-2 rounded-full"
        onClick={() => setIsUpdateDialogOpen(true)}
      >
        <FaEdit className="size-6" />
      </div>
      <div className="">
        <Dialog.Root
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg h-full max-h-screen w-full max-w-4xl">
              <Dialog.Title className="text-lg font-bold">
                Edit Food Item
              </Dialog.Title>
              <Dialog.Description>
                Update the details of the food item below.
              </Dialog.Description>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="grid grid-cols-2 items-center gap-6">
                  <div>
                    <div className="mb-4 flex flex-col items-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Image
                      </label>
                      <CldUploadButton
                        uploadPreset="nvhedklk"
                        options={{ maxFiles: 1 }}
                        onSuccess={uploadImage}
                        {...register("imageUrl", {
                          required: "imageUrl is required",
                        })}
                        className="relative group"
                      >
                        <Image
                          src={foodItem.imageUrl || "/home/food.PNG"}
                          alt={foodItem.name}
                          className=" object-cover  rounded-md"
                          width={200}
                          height={200}
                        />
                        <div className="absolute inset-0 pl-3 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                          <span className="text-white text-xs font-semibold">
                            Click to change image
                          </span>
                        </div>
                      </CldUploadButton>
                      {errors.imageUrl && (
                        <span className="text-red-500">
                          {errors.imageUrl.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4 w-">
                      <label className="block text-sm font-medium text-gray-700">
                        Base Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("price", {
                          required: "Base price is required",
                        })}
                        placeholder="Enter base price"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      {errors.price && (
                        <span className="text-red-500">
                          {errors.price.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <span className="text-red-500">
                          {errors.category.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Item Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Item name is required",
                        })}
                        placeholder="Enter item name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      {errors.name && (
                        <span className="text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                        })}
                        placeholder="Enter item description"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      {errors.description && (
                        <span className="text-red-500">
                          {errors.description.message}
                        </span>
                      )}
                    </div>

                    {isItemSizeExist ? (
                      <div>
                        <h2
                          onClick={() => setIsItemSizeExist(!isItemSizeExist)}
                          className="text-lg font-semibold mb-2 cursor-pointer"
                        >
                          Item Sizes
                        </h2>
                        {sizeFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="mb-4 flex gap-4 items-center"
                          >
                            <input
                              {...register(`sizes.${index}.name`, {
                                required: "Size name is required",
                              })}
                              placeholder="Size name"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                              type="number"
                              step="0.01"
                              {...register(`sizes.${index}.extraPrice`, {
                                required: "Extra price is required",
                              })}
                              placeholder="Extra price"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <Button
                              type="button"
                              onClick={() => removeSize(index)}
                              className="bg-red-500 text-white"
                            >
                              Remove Size
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() =>
                            appendSize({ name: "", extraPrice: 0 })
                          }
                        >
                          Add Item Size
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <h2
                          onClick={() => setIsItemSizeExist(!isItemSizeExist)}
                          className="text-lg font-semibold mb-2 cursor-pointer"
                        >
                          Item Sizes
                        </h2>
                      </div>
                    )}

                    {isIngredientsExist ? (
                      <div>
                        <h2
                          onClick={() =>
                            setIsIngredientsExist(!isIngredientsExist)
                          }
                          className="text-lg font-semibold mb-2 mt-6 cursor-pointer"
                        >
                          Extra Ingredients
                        </h2>
                        {ingredientFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="mb-4 flex gap-4 items-center"
                          >
                            <input
                              {...register(`extraIngredients.${index}.name`, {
                                required: "Ingredient name is required",
                              })}
                              placeholder="Ingredient name"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                              type="number"
                              step="0.01"
                              {...register(
                                `extraIngredients.${index}.extraPrice`,
                                {
                                  required: "Extra price is required",
                                }
                              )}
                              placeholder="Extra price"
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <Button
                              type="button"
                              onClick={() => removeIngredient(index)}
                              className="bg-red-500 text-white"
                            >
                              Remove Ingredient
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() =>
                            appendIngredient({ name: "", extraPrice: 0 })
                          }
                        >
                          Add Ingredient
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <h2
                          onClick={() =>
                            setIsIngredientsExist(!isIngredientsExist)
                          }
                          className="text-lg font-semibold mb-2 mt-6 cursor-pointer"
                        >
                          Extra Ingredients
                        </h2>
                      </div>
                    )}
                    <div className="flex justify-end space-x-4 mt-6">
                      <Button type="submit" className="bg-blue-500 text-white">
                        Update
                      </Button>
                      <Dialog.Close asChild>
                        <Button className="bg-gray-500 text-white">
                          Cancel
                        </Button>
                      </Dialog.Close>
                    </div>
                  </div>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
