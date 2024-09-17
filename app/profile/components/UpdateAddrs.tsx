// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { FaPencil } from "react-icons/fa6";
// import { BsEmojiSmile } from "react-icons/bs";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useClickOutside } from "@react-hookz/web";

// export default function UpdateAddrs({ user }: { user: any }) {
//   type FormValues = {
//     yourAddress: string;
//   };

//   const [first, setFirst] = useState(false);
//   const [third, setThird] = useState(true);

//   const ref = useRef(null);
//   //   const inputRef = useRef<HTMLInputElement | null>(null);

//   useClickOutside(ref, () => {
//     console.log("clicked outside");
//     setFirst(false);
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       yourAddress: user?.streetAddress || "",
//     },
//   });
//   const [yourAddress, setYourAddress] = useState(user?.streetAddress || "");
//   const [lenght, setLenght] = useState(yourAddress.length);

//   const handleFirstButton = () => {
//     setFirst(!first);
//   };

//   const mouseMove = () => {
//     setThird(!third);
//   };

//   const mouseLeave = () => {
//     setThird(!third);
//   };

//   const onSubmit = async (data: FormValues) => {
//     console.log(data);
//     try {
//       console.log(data);
//       await axios
//         .put("/api/update/straddr", {
//           id: user.id,
//           streetAddress: data.yourAddress,
//         })
//         .then((res) => console.log(res.data))
//         .finally(() => setFirst(!first));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleYourNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;
//     if (inputValue.length <= 25) {
//       setYourAddress(inputValue);
//       setLenght(inputValue.length);
//     }
//   };

//   return (
//     <div ref={ref}>
//       {first ? (
//         <div>
//           <form className="flex flex-col gap-2">
//             <input
//               type="text"
//               placeholder="your street address"
//               {...register("yourAddress", {
//                 required: "This field is required",
//                 pattern: {
//                   value: /^[A-Za-z0-9\s,.'-]{3,}$/,
//                   message:
//                     "Invalid address format. Letters, numbers, spaces, and common punctuation (,.'-) are allowed",
//                 },
//                 maxLength: {
//                   value: 100,
//                   message: "Exceeds 100 characters limit",
//                 },
//                 minLength: {
//                   value: 3,
//                   message: "Must be at least 3 characters",
//                 },
//               })}
//               className="border-b-2 text-sm focus:placeholder:text-sky-400 focus:bg-slate-100 rounded focus:rounded focus:border-b-2 focus:border-sky-500 outline-none placeholder:text-sm placeholder:text-sky-500 py-2 pl-2 dark:bg-[#181818] dark:text-white"
//               onChange={handleYourNameChange}
//               value={yourAddress}
//             />
//             {errors.yourAddress && (
//               <span
//                 style={{ fontSize: "11px" }}
//                 className="text-red-500 -mt-2 -mb-2"
//               >
//                 {errors.yourAddress.message?.toString()}
//               </span>
//             )}
//             <div className="flex justify-end items-center gap-2">
//               <div className="border-2 border-gray-300 rounded p-1 hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-opacity-5 dark:hover:border-sky-500 dark:hover:text-sky-400">
//                 <BsEmojiSmile size={16} />
//               </div>
//               {third ? (
//                 <div
//                   onMouseMove={mouseMove}
//                   className="border-none bg-sky-500 text-white py-0.5 px-1.5 rounded dark:text-black"
//                 >
//                   {lenght <= 9 && lenght !== 0 ? (
//                     <div>0{lenght}/25</div>
//                   ) : (
//                     <div>{lenght}/25</div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onMouseLeave={mouseLeave}
//                   onClick={handleSubmit(onSubmit)}
//                   className="border-none bg-sky-500 text-white py-0.5 px-1.5 rounded dark:text-black"
//                 >
//                   Done
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="flex gap-5 items-center">
//           <h1 className="font-semibold text-lg text-gray-800 dark:text-white">
//             {user?.streetAddress}
//           </h1>
//           <div
//             onClick={handleFirstButton}
//             className="cursor-pointer hover:bg-slate-100 hover:text-gray-700 hover:rounded p-1.5 text-gray-800 dark:text-white dark:hover:bg-opacity-10"
//           >
//             <FaPencil size={14} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useClickOutside } from "@react-hookz/web";

export default function UpdateAddrs({ user }: { user: any }) {
  type FormValues = {
    yourAddress: string;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);

  useClickOutside(ref, () => {
    if (!loading) {
      setIsEditing(false);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      yourAddress: user?.streetAddress || "",
    },
  });

  const [yourAddress, setYourAddress] = useState(user?.streetAddress || "");
  const [charCount, setCharCount] = useState(yourAddress.length);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const toggleButtonLabel = () => {
    setIsButtonVisible(!isButtonVisible);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await axios
        .put("/api/update/straddr", {
          id: user.id,
          streetAddress: data.yourAddress,
        })
        .then((res) => console.log(res.data))
        .finally(() => setIsEditing(!isEditing));
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 25) {
      setYourAddress(inputValue);
      setCharCount(inputValue.length);
    }
  };

  return (
    <div ref={ref}>
      {isEditing ? (
        <div>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Your street address"
              {...register("yourAddress", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9\s,.'-]{3,}$/,
                  message:
                    "Invalid address format. Letters, numbers, spaces, and common punctuation (,.'-) are allowed",
                },
                maxLength: {
                  value: 100,
                  message: "Exceeds 100 characters limit",
                },
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              className="border-b-2 text-sm focus:placeholder:text-sky-400 focus:bg-slate-100 rounded focus:border-sky-500 outline-none placeholder:text-sm placeholder:text-sky-500 py-2 pl-2 dark:bg-[#181818] dark:text-white"
              onChange={handleAddressChange}
              value={yourAddress}
              disabled={loading}
            />
            {errors.yourAddress && (
              <span
                style={{ fontSize: "11px" }}
                className="text-red-500 -mt-2 -mb-2"
              >
                {errors.yourAddress.message?.toString()}
              </span>
            )}
            <div className="flex justify-end items-center gap-2">
              <div className="border-2 border-gray-300 rounded p-1 hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-opacity-5 dark:hover:border-sky-500 dark:hover:text-sky-400">
                <BsEmojiSmile size={16} />
              </div>
              {isButtonVisible ? (
                <div
                  onMouseMove={toggleButtonLabel}
                  className="border-none bg-sky-500 text-white py-0.5 px-1.5 rounded dark:text-black"
                >
                  {charCount <= 9 && charCount !== 0
                    ? `0${charCount}/25`
                    : `${charCount}/25`}
                </div>
              ) : (
                <button
                  onMouseLeave={toggleButtonLabel}
                  type="submit"
                  className="border-none bg-sky-500 text-white py-0.5 px-1.5 rounded dark:text-black"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Done"}
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <h1 className="font-semibold text-lg text-gray-800 dark:text-white">
            {user?.streetAddress || "No address provided"}
          </h1>
          <div
            onClick={handleEditClick}
            className="cursor-pointer hover:bg-slate-100 hover:text-gray-700 hover:rounded p-1.5 text-gray-800 dark:text-white dark:hover:bg-opacity-10"
          >
            <FaPencil size={14} />
          </div>
        </div>
      )}
    </div>
  );
}
