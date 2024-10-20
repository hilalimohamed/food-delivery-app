// "use client";
// import React from "react";
// import { Button } from "./ui/button";
// import { FaArrowRight } from "react-icons/fa";
// import Typewriter from "typewriter-effect";
// import Photo from "./Photo";

// export default function Front() {
//   return (
//     <section className="grid grid-cols-2 items-center lg:mt-4 lg:mx-24">
//       <div className="lg:mt-12 lg:ml-10">
//         <div className="mb-12 flex flex-col gap-1.5">
//           <h1 className="text-2xl lg:text-4xl font-extrabold w-1/3 font-serif">
//             <Typewriter
//               options={{
//                 strings: ["Everything"],
//                 autoStart: true,
//                 loop: true,
//                 delay: 50,
//                 deleteSpeed: 500,
//               }}
//             />
//           </h1>
//           <h1 className="text-2xl lg:text-4xl font-extrabold w-2/3 font-serif">
//             <Typewriter
//               options={{
//                 strings: ["is better whit a"],
//                 autoStart: true,
//                 loop: true,
//                 delay: 100,
//                 deleteSpeed: 500,
//               }}
//             />
//             <span className="text-primary">Food</span>
//           </h1>
//         </div>
//         <p className="w-full mb-14 font-semibold font-serif text-base">
//           Discover the true taste of delicious food with our seamless delivery
//           service. Whether you’re craving something savory or sweet, we’ve got
//           everything to satisfy your appetite. Simply browse, select, and enjoy
//           fresh, mouthwatering meals delivered right to your doorstep.
//         </p>
//         <div className="flex gap-5">
//           <Button className="rounded-full gap-2 shadow-xl font-semibold text-white py-6">
//             ORDER NOW
//             <FaArrowRight />
//           </Button>
//           <Button className="bg-transparent hover:bg-transparent shadow-2xl text-base rounded-full gap-2 font-semibold text-primary py-6">
//             Learn more
//             <FaArrowRight />
//           </Button>
//         </div>
//       </div>
//       <div className=" lg:flex items-center justify-end">
//         <Photo />
//       </div>
//     </section>
//   );
// }
"use client";
import React from "react";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Photo from "./Photo";

export default function Front() {
  return (
    <section className="flex flex-col items-center text-center lg:grid lg:grid-cols-2 lg:gap-2 lg:mx-24 lg:mt-12">
      {/* Text Section */}
      <div className="mt-6 lg:-mt-6 lg:text-left">
        <div className="mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-3xl font-extrabold font-serif">
            <Typewriter
              options={{
                strings: ["Everything is better with"],
                autoStart: true,
                loop: true,
                delay: 80,
              }}
            />
            <span className="text-primary block mt-2">Good Food</span>
          </h1>
        </div>
        <p className="mb-8 mx-4 lg:mx-auto text-base lg:text-lg font-medium text-gray-700">
          Experience the richness of flavors from around the world with our easy
          delivery service. Choose your favorites and have them delivered to
          your doorstep.
        </p>
        <div className="block lg:hidden">
          <Photo />
        </div>
        <div className="flex justify-center lg:justify-start gap-4">
          <Button className="bg-primary text-white py-4 px-6 rounded-full font-bold shadow-lg">
            ORDER NOW <FaArrowRight />
          </Button>
          <Button className="bg-transparent border-2 border-primary text-primary py-4 px-6 rounded-full font-bold shadow-lg">
            LEARN MORE <FaArrowRight />
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:-mt-12 lg:block">
        <Photo />
      </div>
    </section>
  );
}

