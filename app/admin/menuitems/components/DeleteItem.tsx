"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import axios from "axios";
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

export default function DeleteItem({ foodItem }: { foodItem: FoodItemType }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteItem = async () => {
    console.log('food id ! ',foodItem.id)
    try {
      const response = await axios.delete("/api/fooditems", {
        data: { id: foodItem.id },
      });
      console.log("Food Item Deleted:", response.data);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting item : ", error);
    }
  };

  return (
    <div>
      <Dialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <Dialog.Trigger asChild>
          <div
            className="bg-gray-200 p-2 rounded-full"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <MdDelete className="size-6 text-red-500" />
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <Dialog.Title className="text-lg font-bold">
              Confirm Deletion
            </Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete this item ?
            </Dialog.Description>
            <div className="flex gap-4 mt-4">
              <Button onClick={deleteItem} className="bg-red-500 text-white">
                Yes, Delete
              </Button>
              <Dialog.Close asChild>
                <Button>Cancel</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
