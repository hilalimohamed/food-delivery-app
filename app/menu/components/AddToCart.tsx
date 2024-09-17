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

  //close

  return (
    <div>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <Button
            className="add-to-cart-button"
            onClick={() => setIsDialogOpen(true)}
          >
            Add to Cart
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <Dialog.Title className="text-lg font-bold">
              {fooditem.name}
            </Dialog.Title>
            <Dialog.Description>{fooditem.description}</Dialog.Description>
            {`Base Price: ${fooditem.price} dh`}

            {/* <div className="sizes">
              <h4>Choose a Size:</h4>
              {fooditem.sizes.map((size) => (
                <div key={size.id}>
                  <label>
                    <input type="radio" name="size" value={size.id} />
                    {`${size.name} (+$${size.extraPrice})`}
                  </label>
                </div>
              ))}
            </div>

            <div className="extra-ingredients">
              <h4>Choose Extra Ingredients:</h4>
              {fooditem.extraIngredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <label>
                    <input
                      type="checkbox"
                      name="extraIngredient"
                      value={ingredient.id}
                    />
                    {`${ingredient.name} (+$${ingredient.extraPrice})`}
                  </label>
                </div>
              ))}
            </div> */}
            <Dialog.Title>Customize Your Order</Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <label>Size:</label>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="">Select a size</option>
                      {fooditem.sizes.map((size) => (
                        <option key={size.id} value={size.name}>
                          {size.name} (+${size.extraPrice.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  )}
                /> */}
              <div>
                {fooditem.sizes.map((size) => (
                  <div key={size.id}>
                    <Controller
                      name="size"
                      control={control}
                      render={({ field }) => (
                        <label>
                          <input
                            type="radio"
                            value={size.name}
                            checked={field.value === size.name}
                            onChange={field.onChange}
                          />
                          {size.name}{" "}
                          {size.extraPrice !== 0 &&
                            `(${size.extraPrice.toFixed(2)} dh)`}
                        </label>
                      )}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label>Extra Ingredients:</label>
                {fooditem.extraIngredients.map((extra) => (
                  <div key={extra.id}>
                    <Controller
                      name="extraIngredients"
                      control={control}
                      render={({ field }) => (
                        <label>
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
                          />
                          {extra.name} (+{extra.extraPrice.toFixed(2)} dh)
                        </label>
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-4">
                <Button
                  type="submit"
                  className=" bg-green-500 text-white rounded"
                >
                  Add to Cart +{totalPrice.toFixed(2)} dh
                </Button>
                <Dialog.Close asChild>
                  <Button>Cancel</Button>
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
