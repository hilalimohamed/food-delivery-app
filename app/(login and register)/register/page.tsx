"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { NextResponse } from "next/server";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export default function page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState("Register");

  useEffect(() => {
    // Check if the user is authenticated
    if (session?.user) {
      // Redirect to the desired path for authenticated users
      router.push("/");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      setLoading("loading...");

      // Call your API to submit the data here
      const response = await axios.post("/api/register", {
        name: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.data.message === "user created") {
        toast.success("User created!");
        console.log(response.data.message);
        router.push("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      console.error(error.stack);
      return NextResponse.json(
        { message: "an error occurred" },
        { status: 500 }
      );
    } finally {
      setLoading("Register");
    }
  };

  return (
    <div className="flex place-items-center justify-center mt-8 dark:bg-[#1F1F1F]">
      <div className="hidden md:block lg:block border-2 w-[340px] h-[400px] shadow-2xl border-r-primary border-primary">
        <Image
          src="/home/h.avif"
          alt=""
          width={360}
          height={504}
          priority={true}
        />
        <h1 className="text-2xl text-center w-full p-[5px] text-primary font-mono font-bold cursor-default dark:bg-white">
          WELCOME TO CHAT
        </h1>
      </div>
      <div className="shadow-2xl p-6 px-9 w-[350px] h-[400px] border-2 md:border-l-0 lg:border-l-0 border-primary dark:bg-[#282828]">
        <h1 className="text-primary font-bold text-center mb-2 text-xl">
          Register
        </h1>
        <Image
          src="/home/h.avif"
          alt=""
          width={100}
          height={140}
          priority={true}
          className="mx-auto my-auto mb-2"
        />
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="User Name"
            {...register("username", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 17,
                message: "Username must be at most 17 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Username must contain only letters",
              },
            })}
            className="border-b-2 text-sm focus:placeholder:text-primary focus:border-primary outline-none placeholder:text-sm placeholder:text-primary pl-2 dark:bg-[#282828] dark:border-gray-500 dark:text-gray-300"
          />
          {errors.username && (
            <span
              style={{ fontSize: "11px" }}
              className="text-red-500 -mt-4 -mb-3"
            >
              {errors.username.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="border-b-2 text-sm focus:placeholder:text-primary focus:border-primary outline-none placeholder:text-sm placeholder:text-primary pl-2 dark:bg-[#282828] dark:border-gray-500 dark:text-gray-300"
          />
          {errors.email && (
            <span
              style={{ fontSize: "11px" }}
              className="text-red-500 -mt-4 -mb-3"
            >
              {errors.email.message}
            </span>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 32,
                message: "Password must not exceed 32 characters",
              },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
                message:
                  "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character",
              },
            })}
            className="border-b-2 text-sm placeholder:text-sm focus:placeholder:text-primary outline-none focus:border-primary placeholder:text-primary pl-2 dark:bg-[#282828] dark:border-gray-500 dark:text-gray-300"
          />
          {errors.password && (
            <span
              style={{ fontSize: "11px" }}
              className="text-red-500 -mt-4 -mb-3"
            >
              {errors.password.message}
            </span>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmpassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="border-b-2 text-sm placeholder:text-sm focus:placeholder:text-primary outline-none focus:border-primary placeholder:text-primary pl-2 dark:bg-[#282828] dark:border-gray-500 dark:text-gray-300"
          />
          {errors.confirmpassword && (
            <span
              style={{ fontSize: "11px" }}
              className="text-red-500 -mt-4 -mb-3"
            >
              {errors.confirmpassword.message}
            </span>
          )}
          {loading === "Register" ? (
            <button className="bg-primary py-1 mt-2 text-white font-semibold">
              Register
            </button>
          ) : loading === "loading..." ? (
            <button
              className="bg-sky-300 py-1 mt-2 text-white font-semibold cursor-wait"
              disabled
            >
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </button>
          ) : (
            <button className="bg-primary py-1 mt-2 text-white font-semibold">
              Register
            </button>
          )}
        </form>
        <div className=" mt-8">
          <h6 className="text-xs text-gray-500 text-right">
            Already have an account ?
            <Link
              href={"/login"}
              className="underline text-xs text-blue-800 hover:text-primary font-semibold dark:text-gray-100 dark:hover:text-gray-400"
            >
              login
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
