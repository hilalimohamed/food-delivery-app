"use client";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
};

type FormValues = {
  itemName: string;
  description: string;
  category: string;
  basePrice: number;
  imageUrl?: string;
  detailImages?: string[];
  sizes: { name: string; extraPrice: number }[];
  extraIngredients: { name: string; extraPrice: number }[];
};

export default function AddItemContent({
  categories,
  hiddenClick,
}: {
  categories: Category[];
  hiddenClick: any;
}) {
  const [isItemSizeExist, setIsItemSizeExist] = useState(false);
  const [isIngredientsExist, setIsIngredientsExist] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedDetailImages, setUploadedDetailImages] = useState<string[]>(
    []
  );
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      sizes: [{ name: "", extraPrice: 0 }],
      extraIngredients: [{ name: "", extraPrice: 0 }],
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

  // const onSubmit: SubmitHandler<FormValues> = async (data) => {
  //   // try {
  //   //   const response = await axios.post("/api/fooditems", data);
  //   //   console.log("Item added:", response.data);
  //   //   reset(); // Reset form after successful submission
  //   // } catch (error) {
  //   //   console.error("Failed to add item:", error);
  //   //   alert("Failed to add item.");
  //   // }
  //   console.log("test here : ", data);
  // };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("hna chpof :  ", data);
    try {
      const response = await axios.post("/api/fooditems", {
        data: {
          itemName: data.itemName,
          description: data.description,
          imageUrl: data.imageUrl,
          // detailImages: data.detailImages,
          detailImages:
            data.detailImages?.map((url) => ({
              url: url,
            })) || [],
          category: data.category,
          basePrice: data.basePrice,
          sizes: data.sizes.map((size) => ({
            name: size.name,
            extraPrice: size.extraPrice,
          })),
          extraIngredients: data.extraIngredients.map((ingredient) => ({
            name: ingredient.name,
            extraPrice: ingredient.extraPrice,
          })),
        },
      });

      console.log("Item added:", response.data);
      reset();
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item.");
    }
  };

  const uploadImage = (result: any) => {
    console.log("Upload Result:", result);
    const imageUrl = result?.info?.secure_url || result?.data?.url || null;
    if (imageUrl) {
      console.log("Image URL:", imageUrl);
      setUploadedImage(imageUrl);
      setValue("imageUrl", imageUrl);
    } else {
      console.error("Image URL not found in upload result");
    }
  };

  const uploadDetailImages = (result: any) => {
    const imageUrl = result?.info?.secure_url || result?.data?.url || null;
    if (imageUrl) {
      console.log("Uploading detail image:", imageUrl); // Debugging log
      setUploadedDetailImages((prev) => {
        const updatedImages = [...prev, imageUrl];
        setValue("detailImages", updatedImages);
        return updatedImages;
      });
    } else {
      console.error("Detail image URL not found in upload result");
    }
  };

  return (
    <div className="flex flex-col mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Item</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div>
          <div className="mb-4 flex flex-col items-center">
            <div className="relative group">
              <CldUploadButton
                uploadPreset="nvhedklk"
                options={{ maxFiles: 1 }}
                onSuccess={uploadImage}
              >
                {uploadedImage ? (
                  <Image
                    src={uploadedImage}
                    alt="Uploaded Image"
                    quality={100}
                    width={200}
                    height={200}
                    className="object-cover rounded-md"
                  />
                ) : (
                  <Image
                    src="/home/food.PNG"
                    alt="Placeholder Image"
                    quality={100}
                    width={200}
                    height={200}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="absolute inset-0 pl-3 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                  <span className="text-white text-xs font-semibold">
                    Click to change image
                  </span>
                </div>
              </CldUploadButton>
            </div>
            {errors.imageUrl && (
              <span className="text-red-500">{errors.imageUrl.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Detail Images
            </label>
            <div className="flex flex-wrap gap-4">
              {uploadedDetailImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Detail Image ${index + 1}`}
                  quality={100}
                  width={100}
                  height={100}
                />
              ))}
            </div>
            <CldUploadButton
              uploadPreset="nvhedklk"
              options={{ maxFiles: 10 }}
              onSuccess={uploadDetailImages}
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Upload Detail Images
              </div>
            </CldUploadButton>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Base Price
            </label>
            <input
              type="number"
              step="0.01"
              min={0}
              {...register("basePrice", { required: "Base price is required" })}
              placeholder="Enter base price"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.basePrice && (
              <span className="text-red-500">{errors.basePrice.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
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
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              {...register("itemName", { required: "Item name is required" })}
              placeholder="Enter item name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.itemName && (
              <span className="text-red-500">{errors.itemName.message}</span>
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
              <span className="text-red-500">{errors.description.message}</span>
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
                <div key={field.id} className="mb-4 flex gap-4 items-center">
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
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="bg-red-500 text-white"
                  >
                    Remove Size
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendSize({ name: "", extraPrice: 0 })}
              >
                Add Item Size
              </button>
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
                onClick={() => setIsIngredientsExist(!isIngredientsExist)}
                className="text-lg font-semibold mb-2 mt-6 cursor-pointer"
              >
                Extra Ingredients
              </h2>
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="mb-4 flex gap-4 items-center">
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
                    {...register(`extraIngredients.${index}.extraPrice`, {
                      required: "Extra price is required",
                    })}
                    placeholder="Extra price"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="bg-red-500 text-white"
                  >
                    Remove Ingredient
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendIngredient({ name: "", extraPrice: 0 })}
              >
                Add Ingredient
              </button>
            </div>
          ) : (
            <div>
              <h2
                onClick={() => setIsIngredientsExist(!isIngredientsExist)}
                className="text-lg font-semibold mb-2 mt-6 cursor-pointer"
              >
                Extra Ingredients
              </h2>
            </div>
          )}

          <div className="mt-6 flex gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Add Item
            </button>
            <button
              type="button"
              className="bg-gray-200 text-black hover:bg-gray-300 px-4 py-2 rounded cursor-pointer"
              onClick={hiddenClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
