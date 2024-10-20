"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareGithub } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

export default function Page() {
  const session = useSession();
  const [loading, setLoading] = useState("Log In");
  const [loadingSocial, setLoadingSocial] = useState("nothing");
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("authenticated");
      router.push("/");
    } else {
      console.log("unauthenticated");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading("loading...");

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Invalid login!");
      } else if (result?.ok) {
        toast.success("Logged in! Just wait a second...");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading("Log In");
    }
  };

  const socialMedia = (media: string) => {
    setLoadingSocial(media);
    signIn(media)
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid login!");
        }
        if (callback?.ok) {
          toast.success("Logged in!");
        }
      })
      .finally(() => {
        setLoadingSocial("nothing");
      });
  };
  // mt-8 sm:mx-auto sm:w-full sm:max-w-md
  return (
    <div className="flex place-items-center mt-2 justify-center dark:bg-[#1F1F1F]">
      <div className="hidden md:block lg:block border-2 w-[340px] h-[444px] shadow-2xl border-r-primary border-primary">
        <Image
          src="/home/h.avif"
          alt=""
          width={360}
          height={544}
          priority={true}
        />
        <h1 className="text-2xl text-center w-full bg-primary py-8 px-12 border-b-4 text-white font-mono border-primary font-bold cursor-default">
          WELCOME TO EAT
        </h1>
      </div>
      <div className="shadow-2xl py-5 px-9 border-2 md:border-l-0 lg:border-l-0 border-primary h-[471px] max-h-[444px] dark:bg-[#282828]">
        <h1 className="text-primary font-bold text-center mb-0.5 text-xl">
          Log In
        </h1>
        <Image
          src="/home/h.avif"
          alt=""
          width={88}
          height={88}
          priority={true}
          className="mx-auto my-auto mb-2"
        />
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
            className="border-b-2 text-sm focus:placeholder:text-orange-200 focus:border-primary outline-none placeholder:text-sm placeholder:text-primary pl-2 dark:bg-[#282828] dark:border-gray-500 dark:text-gray-300"
          />
          {errors.email && (
            <span
              style={{ fontSize: "11px" }}
              className="text-red-500 -mt-2 -mb-2"
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
            className="border-b-2 text-sm placeholder:text-sm focus:placeholder:text-orange-200 outline-none focus:border-primary placeholder:text-primary pl-2 dark:bg-[#282828] dark:border-gray-500 dark:text-gray-300"
          />
          {errors.password && (
            <span
              style={{ fontSize: "11px" }}
              className="text-red-500 -mt-2 -mb-2 max-w-[240px]"
            >
              {errors.password.message}
            </span>
          )}
          {loading === "Log In" ? (
            <button className="bg-primary py-1 mt-2 text-white font-semibold">
              Log In
            </button>
          ) : loading === "loading..." ? (
            <button
              className="bg-orange-300 py-1 mt-2 text-white font-semibold"
              disabled
            >
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </button>
          ) : (
            <button className="bg-primary py-1 mt-2 text-white font-semibold">
              Log In
            </button>
          )}
        </form>
        <div className="mt-7 mb-6 relative">
          <div
            style={{ height: "2px" }}
            className="bg-gray-200 dark:bg-gray-500"
          ></div>
          <h3 className="absolute -top-2 left-1/3 px-1 bg-white text-gray-500 text-sm dark:bg-[#282828] dark:text-gray-200">
            Or sign in with
          </h3>
        </div>
        <div className="flex justify-between">
          <button className="flex items-center bg-blue-900 text-white py-1 px-2 cursor-no-drop">
            <FaFacebookF className="" />
            <span className="text-xs ml-1 font-semibold">Facebook</span>
          </button>
          {loadingSocial === "github" ? (
            <button
              className="flex items-center bg-gray-800 py-1 px-2 mx-2"
              disabled
            >
              <div
                className="text-white p-[6px] inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span className="text-xs text-white ml-1 font-semibold">
                Github
              </span>
            </button>
          ) : (
            <button
              onClick={() => socialMedia("github")}
              className="flex items-center bg-black py-1 px-2 mx-2"
            >
              <FaSquareGithub className="text-white text-xl" />
              <span className="text-xs text-white ml-1 font-semibold">
                Github
              </span>
            </button>
          )}
          {loadingSocial === "google" ? (
            <button className="flex items-center bg-red-400 py-1 px-3" disabled>
              <div
                className="text-white p-[5px] inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span className="text-xs text-white ml-1 font-semibold">
                Google
              </span>
            </button>
          ) : (
            <button
              onClick={() => socialMedia("google")}
              className="flex items-center bg-red-500 py-1 px-3"
            >
              <FcGoogle />
              <span className="text-xs text-white ml-1 font-semibold">
                Google
              </span>
            </button>
          )}
        </div>
        <div className=" justify-between mt-5">
          <button className="text-blue-700 text-xs hover:underline hover:text-blue-500 font-semibold mb-2 dark:text-gray-100 dark:hover:text-gray-400">
            forgot password
          </button>
          <h6 className="text-xs text-gray-500 text-right">
            don't have an account ?
            <Link
              href={"/register"}
              className="underline text-xs text-blue-800 hover:text-blue-500 font-semibold dark:text-gray-100 dark:hover:text-gray-400"
            >
              sign up
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
