"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useClickOutside } from "@react-hookz/web";

export default function UpdateName({ user }: { user: any }) {
  type FormValues = {
    yourName: string;
  };

  const [first, setFirst] = useState(false);
  const [third, setThird] = useState(true);

  const ref = useRef(null);
  useClickOutside(ref, () => {
    console.log("clicked outside");
    setFirst(false);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      yourName: user?.name || "",
    },
  });
  const [yourName, setYourName] = useState(user?.name || "your name");
  const [lenght, setLenght] = useState(yourName.length);

  const handleFirstButton = () => {
    setFirst(!first);
  };

  const mouseMove = () => {
    setThird(!third);
  };

  const mouseLeave = () => {
    setThird(!third);
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      console.log(data);
      await axios
        .put("/api/update", {
          id: user.id,
          name: data.yourName,
        })
        .then((res) => console.log(res.data))
        .finally(() => setFirst(!first));
    } catch (error) {
      console.log(error);
    }
  };

  const handleYourNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 25) {
      setYourName(inputValue);
      setLenght(inputValue.length);
    }
  };

  return (
    <div ref={ref}>
      {first ? (
        <div>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="your name"
              {...register("yourName", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z]+( [A-Za-z]+)*$/,
                  message:
                    "Only letters and a single space between words are allowed",
                },
                maxLength: {
                  value: 25,
                  message: "Exceeds 25 characters limit",
                },
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              className="border-b-2 text-sm focus:placeholder:text-sky-400 focus:bg-slate-100 rounded focus:rounded focus:border-b-2 focus:border-sky-500 outline-none placeholder:text-sm placeholder:text-sky-500 py-2 pl-2 dark:bg-[#181818] dark:text-white"
              onChange={handleYourNameChange}
              value={yourName}
            />
            {errors.yourName && (
              <span
                style={{ fontSize: "11px" }}
                className="text-red-500 -mt-2 -mb-2"
              >
                {errors.yourName.message?.toString()}
              </span>
            )}
            <div className="flex justify-end items-center gap-2">
              <div className="border-2 border-gray-300 rounded p-1 hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-opacity-5 dark:hover:border-sky-500 dark:hover:text-sky-400">
                <BsEmojiSmile size={16} />
              </div>
              {third ? (
                <div
                  onMouseMove={mouseMove}
                  className="border-none bg-sky-500 text-white py-0.5 px-1.5 rounded dark:text-black"
                >
                  {lenght <= 9 && lenght !== 0 ? (
                    <div>0{lenght}/25</div>
                  ) : (
                    <div>{lenght}/25</div>
                  )}
                </div>
              ) : (
                <button
                  onMouseLeave={mouseLeave}
                  onClick={handleSubmit(onSubmit)}
                  className="border-none bg-sky-500 text-white py-0.5 px-1.5 rounded dark:text-black"
                >
                  Done
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <h1 className="font-semibold text-lg text-gray-800 dark:text-white">
            {user?.name}
          </h1>
          <div
            onClick={handleFirstButton}
            className="cursor-pointer hover:bg-slate-100 hover:text-gray-700 hover:rounded p-1.5 text-gray-800 dark:text-white dark:hover:bg-opacity-10"
          >
            <FaPencil size={14} />
          </div>
        </div>
      )}
    </div>
  );
}
