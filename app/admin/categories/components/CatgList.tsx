// {
//   /* Delete Button with SheetTrigger
// <SheetTrigger asChild>
// <Button onClick={() => setIsSheetOpen(true)}>DELETE</Button>
// </SheetTrigger>

// Confirmation Sheet
// <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//   <SheetContent>
//     <h3 className="text-lg font-bold">Confirm Deletion</h3>
//     <p>Are you sure you want to delete this category?</p>
//     <div className="flex gap-4 mt-4">
//       <Button onClick={dltCategory} className="bg-red-500 text-white">
//         Yes, Delete
//       </Button>
//       <SheetClose asChild>
//         <Button onClick={() => setIsSheetOpen(false)}>Cancel</Button>
//       </SheetClose>
//     </div>
//   </SheetContent>
// </Sheet> */
// }
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

type Category = {
  id: string;
  name: string;
  imageUrl: string | null;
};

type FormValues = {
  name: string;
  imageUrl: string | null;
};

export default function CatgList({ category }: { category: Category }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    category.imageUrl || null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: category.name, imageUrl: category.imageUrl },
  });

  const dltCategory = async () => {
    try {
      const response = await axios.delete("/api/categories", {
        data: { id: category.id },
      });
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.put("/api/categories", {
        id: category.id,
        name: data.name,
        imageUrl: data.imageUrl,
      });
      // console.log("hi : ", data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const uploadImage = (result: any) => {
    const imageUrl = result?.info?.secure_url || result?.data?.url || null;
    if (imageUrl) {
      setUploadedImage(imageUrl);
      setValue("imageUrl", imageUrl);
    }
  };

  return (
    <div className="p-4 mb-4 border rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-200">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(updateCategory)}
          className="grid grid-cols-1 gap-4"
        >
          <input
            type="text"
            placeholder="Edit category name"
            {...register("name", { required: "Name is required" })}
            className="border py-2 border-gray-300 px-4 rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <div className="flex flex-col items-center">
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

          <div className="flex justify-between items-center">
            <Button className="bg-blue-500 text-white">Update</Button>
            <Button
              className="bg-gray-500 text-white"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <span>{category.name}</span>
          <Image
            src={category.imageUrl || "/home/food.PNG"}
            alt={category.name}
            className="w-full h-32 object-cover rounded-md"
            width={200}
            height={200}
          />
          <div className="flex items-center gap-10">
            <Button
              className="bg-blue-500 text-white"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Dialog.Root open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <Dialog.Trigger asChild>
                <Button className="bg-red-500 text-white">Delete</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                  <Dialog.Title className="text-lg font-bold">
                    Confirm Deletion
                  </Dialog.Title>
                  <Dialog.Description>
                    Are you sure you want to delete this category?
                  </Dialog.Description>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <Button
                      onClick={dltCategory}
                      className="bg-red-500 text-white"
                    >
                      Yes, Delete
                    </Button>
                    <Dialog.Close asChild>
                      <Button className="bg-gray-500 text-white">Cancel</Button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </>
      )}
    </div>
  );
}
