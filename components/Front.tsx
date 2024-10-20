"use client";
import React from "react";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Photo from "./Photo";

export default function Front() {
  return (
    <section className="grid grid-cols-2 items-center mt-4 mx-24">
      <div className="mt-12 ml-10">
        <div className="mb-12 flex flex-col gap-1.5">
          <h1 className="text-4xl font-extrabold w-1/3 font-serif">
            <Typewriter
              options={{
                strings: ["Everything"],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 500,
              }}
            />
          </h1>
          <h1 className="text-4xl font-extrabold w-2/3 font-serif">
            <Typewriter
              options={{
                strings: ["is better whit a"],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 500,
              }}
            />{" "}
            <span className="text-primary">Food</span>
          </h1>
        </div>
        <p className="w-full mb-14 font-semibold font-serif text-base">
          Discover the true taste of delicious food with our seamless delivery
          service. Whether you’re craving something savory or sweet, we’ve got
          everything to satisfy your appetite. Simply browse, select, and enjoy
          fresh, mouthwatering meals delivered right to your doorstep.
        </p>
        <div className="flex gap-5">
          <Button className="rounded-full gap-2 shadow-xl font-semibold text-white py-6">
            ORDER NOW
            <FaArrowRight />
          </Button>
          <Button className="bg-transparent hover:bg-transparent shadow-2xl text-base rounded-full gap-2 font-semibold text-primary py-6">
            Learn more
            <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Photo />
      </div>
    </section>
  );
}
