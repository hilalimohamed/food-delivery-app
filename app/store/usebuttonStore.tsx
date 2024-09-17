// // src/store/useStore.ts

// import create from "zustand";

// interface StoreState {
//   selectedCategory: string | null;
//   setSelectedCategory: (categoryId: string | null) => void;
// }

// export const useStore = create<StoreState>((set) => ({
//   selectedCategory: null,
//   setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
// }));
import create from "zustand";

interface ButtonState {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useStore = create<ButtonState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));