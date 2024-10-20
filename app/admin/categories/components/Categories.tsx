"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CatgList from "./CatgList";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import useSound from "use-sound";

type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
};

type FormData = {
  name: string;
  imageUrl?: string;
};

export default function Categories({ categories }: { categories: Category[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [allcategories, setAllcategories] = useState<Category[]>(categories);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [playSuccessSound] = useSound("/sounds/creation-sound.mp3");

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const response = await axios.post("/api/categories", {
        name: formData.name,
        imageUrl: formData.imageUrl,
      });
      if (response.data.message === "category created") {
        setAllcategories((prev) => [...prev, response.data.category]);
        playSuccessSound();
        toast.success("Category created successfully!");
      }
      reset();
    } catch (error) {
      console.error("Failed to create category:", error);
      alert("Failed to create category.");
    }
  };

  const uploadImage = (result: any) => {
    const imageUrl = result?.info?.secure_url || result?.data?.url || null;
    if (imageUrl) {
      setUploadedImage(imageUrl);
      setValue("imageUrl", imageUrl);
    }
  };

  const handleCancel = () => {
    reset();
    router.push("/profile");
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="mx-auto max-w-md lg:max-w-4xl">
        <h1 className="text-xl font-bold mb-4 text-center lg:text-left">
          Manage Categories
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10"
        >
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <CldUploadButton
                uploadPreset="nvhedklk"
                options={{ maxFiles: 1 }}
                onSuccess={uploadImage}
                {...register("imageUrl", { required: "Image is required" })}
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
                  <div className="relative group">
                    <Image
                      src="/home/food.PNG"
                      alt="Placeholder Image"
                      quality={100}
                      width={200}
                      height={200}
                      className="object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                      <span className="text-white font-semibold">
                        Click to upload image
                      </span>
                    </div>
                  </div>
                )}
              </CldUploadButton>
            </div>

            {errors.imageUrl && (
              <span className="text-red-500">{errors.imageUrl.message}</span>
            )}
          </div>

          {/* Category Name Input */}
          <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>

            <input
              {...register("name", { required: true })}
              placeholder="Enter category name"
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="col-span-1 lg:col-span-2 flex gap-4">
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-orange-700"
            >
              Create
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-200 text-black py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* List of All Categories */}
        <h2 className="text-lg font-semibold mb-4 text-center lg:text-left">
          All Categories
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-80 lg:max-h-[600px] overflow-y-auto">
          {allcategories.map((category, index) => (
            <CatgList key={index} category={category} />
          ))}
        </ul>
      </div>
    </div>
  );
}
