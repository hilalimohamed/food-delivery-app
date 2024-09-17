// import Front from "@/components/Front";
// import Categories from "@/components/Categories";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import SomeFood from "@/components/SomeFood";
// import getFoodItems from "./action/getFoodItems";
// import getCategories from "./action/getCategories";

// export default async function Home() {
//   const fooditems = await getFoodItems();
//   const categories = await getCategories();
//   return (
//     <div>
//       <div className="relative max-h-screen">
//         <div className="absolute inset-0 rotate-180 -z-10 blur-xl -top-28 -bottom-10">
//           <Image
//             // alt="Cover Image"
//             // src="/home/prfl/food12.jpg" // Make sure to provide the correct path to your image
//             // // layout="fill" // This makes the image cover the entire screen
//             // objectFit="cover" // Ensures the image covers the entire area
//             // quality={100} // Ensures high quality for the image
//             // className="w-1/2 h-1/2 object-cover"
//             // height={100}
//             // width={100}
//             alt="Cover Image"
//             src="/home/prfl/food15.jpg"
//             layout="fill"
//             objectFit="cover"
//             quality={100}
//             priority={true}
//           />
//         </div>
//         <div className="relative z-10">
//           <Front />
//         </div>
//       </div>
//       <div className="mt-20">
//         <Categories categories={categories} />
//       </div>
//       <div className="">
//         <SomeFood fooditems={fooditems} />
//       </div>
//     </div>
//   );
// }
import Front from "@/components/Front";
import Categories from "@/components/Categories";
import Image from "next/image";
import SomeFood from "@/components/SomeFood";
import getFoodItems from "./action/getFoodItems";
import getCategories from "./action/getCategories";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default async function Home() {
  const fooditems = await getFoodItems();
  const categories = await getCategories();

  return (
    <div>
      <div className="relative max-h-screen">
        <div className="absolute inset-0 rotate-180 -z-10 blur-xl -top-28 -bottom-10">
          <Image
            alt="Cover Image"
            src="/home/prfl/food15.jpg"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority={true}
          />
        </div>
        <div className="relative z-10">
          <Front />
        </div>
      </div>
      <div className="mt-20">
        <Categories categories={categories} />
      </div>
      <div className="">
        <SomeFood fooditems={fooditems} />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
