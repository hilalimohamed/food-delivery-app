"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { useCartStore } from "@/app/store/useCartStore";

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

export default function AddToCart({ fooditem }: { fooditem: FoodItemType }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  //   open
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      size: fooditem.sizes[0]?.name || "",
      extraIngredients: [] as string[],
    },
  });

  const selectedSize = watch("size");
  const selectedExtras = watch("extraIngredients");

  const selectedSizeObj = fooditem.sizes.find(
    (size) => size.name === selectedSize
  );
  const sizePrice = selectedSizeObj ? selectedSizeObj.extraPrice : 0;
  const extrasPrice = fooditem.extraIngredients
    .filter((extra) => selectedExtras.includes(extra.name))
    .reduce((total, extra) => total + extra.extraPrice, 0);

  const totalPrice = sizePrice + extrasPrice;

  const onSubmit = (data: any) => {
    const selectedSize = fooditem.sizes.find((size) => size.name === data.size);
    const selectedExtras = fooditem.extraIngredients.filter((extra) =>
      data.extraIngredients.includes(extra.name)
    );

    const sizePrice = selectedSize ? selectedSize.extraPrice : 0;
    const extrasPrice = selectedExtras.reduce(
      (total, extra) => total + extra.extraPrice,
      0
    );
    const totalPrice = sizePrice + extrasPrice;
    addItemToCart({
      foodItemId: fooditem.id,
      name: fooditem.name,
      totalprice: totalPrice,
      quantity: 1,
      // imageUrl: fooditem.imageUrl,
      extraIngredients: selectedExtras.map((extra) => ({
        name: extra.name,
        price: extra.extraPrice,
      })),
      namesize: selectedSize?.name,
      pricesize: selectedSize?.extraPrice,
    });

    console.log("Total Price:", totalPrice);
    console.log("see data here", data);
    setIsDialogOpen(false);
  };


  return (
    <div>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <Button
            className="text-white w-full"
            onClick={() => setIsDialogOpen(true)}
          >
            Add to Cart
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-20" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-6 z-20 rounded-lg shadow-lg w-[90vw] sm:w-[400px] max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-bold text-center">
              {fooditem.name}
            </Dialog.Title>
            <Dialog.Description className="text-center text-gray-600 mb-4">
              {fooditem.description}
            </Dialog.Description>
            <div className="text-center font-bold mb-4">
              Base Price: {fooditem.price} dh
            </div>

            <Dialog.Title className="text-lg font-semibold mb-2">
              Customize Your Order
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Size:</label>
                {fooditem.sizes.map((size) => (
                  <div key={size.id} className="mb-2">
                    <Controller
                      name="size"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={size.name}
                            checked={field.value === size.name}
                            onChange={field.onChange}
                            className="form-radio"
                          />
                          <span>{size.name}</span>
                          {size.extraPrice !== 0 && (
                            <span className="text-gray-500">
                              (+{size.extraPrice.toFixed(2)} dh)
                            </span>
                          )}
                        </label>
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Extra Ingredients:
                </label>
                {fooditem.extraIngredients.map((extra) => (
                  <div key={extra.id} className="mb-2">
                    <Controller
                      name="extraIngredients"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={extra.name}
                            checked={field.value.includes(extra.name)}
                            onChange={() => {
                              const newValue = field.value.includes(extra.name)
                                ? field.value.filter(
                                    (name: string) => name !== extra.name
                                  )
                                : [...field.value, extra.name];
                              field.onChange(newValue);
                            }}
                            className="form-checkbox"
                          />
                          <span>{extra.name}</span>
                          <span className="text-gray-500">
                            (+{extra.extraPrice.toFixed(2)} dh)
                          </span>
                        </label>
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-4 justify-center">
                <Button
                  type="submit"
                  className="bg-green-500 text-white rounded py-2 px-4 w-full sm:w-auto"
                >
                  Add to Cart +{totalPrice.toFixed(2)} dh
                </Button>
                <Dialog.Close asChild>
                  <Button className="bg-gray-300 rounded py-2 px-4 w-full sm:w-auto">
                    Cancel
                  </Button>
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
