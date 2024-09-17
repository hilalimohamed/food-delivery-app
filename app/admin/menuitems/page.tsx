// 'use client'
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useState } from "react";
// import getCategories from "@/app/action/getCategories";
// import getFoodItems from "@/app/action/getFooodItems";
// import AddItemContent from "./components/AddItemContent";
// import FoodItem from "./components/FoodItem";

// async function page() {
//   const [show, setShow] = useState('hidden')
//   const getcategories = await getCategories();
//   const getfoodItems = await getFoodItems();
//   const hiddenClick = ()=>{
//     setShow('flex justify-center')
//     console.log('hna : ',show)
//   }
//   return (
//     <div className="flex flex-col items-center mt-14">
//       <div className="">
//         <Button onClick={hiddenClick}>create new menu item</Button>
//       </div>
//       <div className={`${show}`}>
//         <div>
//           <Image
//             className="w-26 h-26"
//             src="/home/food.PNG"
//             alt="Profile"
//             quality={100}
//             width={200}
//             height={200}
//           />
//           <Button>change image</Button>
//         </div>
//         <div>
//           <AddItemContent categories={getcategories} />
//         </div>
//       </div>
//       <div className="">
//         <h3>edit menu item : </h3>
//         <div className="p-8">
//           <h1 className="text-3xl font-bold mb-6">Food Items</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
//             {getfoodItems.map((foodItem) => (
//               <FoodItem
//                 key={foodItem.id}
//                 foodItem={foodItem}
//                 categories={getcategories}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;
import React from "react";
import getCategories from "@/app/action/getCategories";
import getFoodItems from "@/app/action/getFoodItems";
import PageContent from "./components/PageContent";

export default async function Page() {

  const getcategories = await getCategories();
  const getfoodItems = await getFoodItems();

  return (
    <PageContent getcategories={getcategories} getfoodItems={getfoodItems} />
  );
}
