import { create } from "zustand";
import { persist, PersistStorage, StateStorage } from "zustand/middleware";
import axios from "axios";
type CartItem = {
  foodItemId: string;
  name: string;
  totalprice: number;
  quantity: number;
  imageUrl?: string;
  extraIngredients?: { name: string; price: number }[];
  //   sizes?: { name: string; price: number };
  namesize: string | undefined;
  pricesize: number | undefined;
};
type CartState = {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItem: (
    foodItemId: string,
    namesize: string | undefined,
    pricesize: number | undefined,
    extraIngredients: { name: string; price: number }[]
  ) => void;
  decrementItem: (
    foodItemId: string,
    namesize: string | undefined,
    pricesize: number | undefined,
    extraIngredients: { name: string; price: number }[]
  ) => void;
  clearCart: () => void;
  //   submitOrder: () => Promise<void>;
};

// Custom localStorage wrapper with correct typing
// const customStorage: PersistStorage<CartState> = {
//   getItem: (name) => {
//     const item = localStorage.getItem(name);
//     if (item) {
//       return JSON.parse(item);
//     }
//     return null;
//   },
//   setItem: (name, value) => {
//     localStorage.setItem(name, JSON.stringify(value));
//   },
//   removeItem: (name) => {
//     localStorage.removeItem(name);
//   },
// };
const customStorage: PersistStorage<CartState> = {
  getItem: (name) => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  setItem: (name, value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItemToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.foodItemId === item.foodItemId &&
              i.namesize === item.namesize &&
              i.pricesize === item.pricesize &&
              i.extraIngredients?.length === item.extraIngredients?.length &&
              i.extraIngredients?.every(
                (extra, index) =>
                  extra.name === item.extraIngredients?.[index].name &&
                  extra.price === item.extraIngredients?.[index].price
              )
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.foodItemId === item.foodItemId &&
                i.namesize === item.namesize &&
                i.pricesize === item.pricesize &&
                i.extraIngredients?.length === item.extraIngredients?.length &&
                i.extraIngredients?.every(
                  (extra, index) =>
                    extra.name === item.extraIngredients?.[index].name &&
                    extra.price === item.extraIngredients?.[index].price
                )
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (foodItemId, namesize, pricesize, extraIngredients) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.foodItemId === foodItemId &&
                item.namesize === namesize &&
                item.pricesize === pricesize &&
                item.extraIngredients?.length === extraIngredients.length &&
                item.extraIngredients?.every(
                  (extra, index) =>
                    extra.name === extraIngredients[index]?.name &&
                    extra.price === extraIngredients[index]?.price
                )
              )
          ),
        })),
      decrementItem: (foodItemId, namesize, pricesize, extraIngredients) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.foodItemId === foodItemId &&
              i.namesize === namesize &&
              i.pricesize === pricesize &&
              i.extraIngredients?.length === extraIngredients.length &&
              i.extraIngredients?.every(
                (extra, index) =>
                  extra.name === extraIngredients[index]?.name &&
                  extra.price === extraIngredients[index]?.price
              )
          );

          if (existingItem) {
            if (existingItem.quantity > 1) {
              return {
                items: state.items.map((i) =>
                  i === existingItem ? { ...i, quantity: i.quantity - 1 } : i
                ),
              };
            } else {
              return {
                items: state.items.filter((i) => i !== existingItem),
              };
            }
          }
          return { items: [...state.items] };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // unique name
      //   getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
      storage: customStorage, // Use 'storage' instead of 'getStorage'
    }
  )
);

//   submitOrder: async () => {
//     const { items } = useCartStore.getState();
//     if (items.length === 0) return;

//     try {
//       const response = await axios.post("/api/orders", { items });
//       console.log("Order submitted:", response.data);
//       set({ items: [] }); // Clear cart after order submission
//     } catch (error) {
//       console.error("Failed to submit order:", error);
//     }
//   },

// export const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],
//       addItemToCart: (item) =>
//         set((state) => {
//           const existingItem = state.items.find(
//             (i) => i.foodItemId === item.foodItemId
//           );
//           if (existingItem) {
//             return {
//               items: state.items.map((i) =>
//                 i.foodItemId === item.foodItemId
//                   ? { ...i, quantity: i.quantity + item.quantity }
//                   : i
//               ),
//             };
//           }
//           return { items: [...state.items, item] };
//         }),
//       removeItem: (foodItemId) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.foodItemId !== foodItemId),
//         })),
//       clearCart: () => set({ items: [] }),

//       // submitOrder: async () => {
//       //   const { items } = useCartStore.getState();
//       //   if (items.length === 0) return;

//       //   try {
//       //     const response = await axios.post("/api/orders", { items });
//       //     console.log("Order submitted:", response.data);
//       //     set({ items: [] }); // Clear cart after order submission
//       //   } catch (error) {
//       //     console.error("Failed to submit order:", error);
//       //   }
//       // },
//     }),
//     {
//       name: "cart-storage", // unique name
//       getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
//     }
//   )
// );
