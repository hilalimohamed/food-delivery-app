"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Users = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  image: string | null;
  phone: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  country: string | null;
};

type RoleFormValues = {
  role: string;
};

export default function AllUsers({ getuser }: { getuser: Users }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { register, handleSubmit } = useForm<RoleFormValues>({
    defaultValues: {
      role: getuser.role as "USER" | "ADMIN",
    },
  });

  const onSubmit: SubmitHandler<RoleFormValues> = async (data) => {
    try {
      const response = await axios.put("/api/update/isAdmin", {
        id: getuser.id,
        role: data.role,
      });

      if (response.status === 201) {
        console.log("User's role has been updated.");
      } else {
        console.error("Failed to update the user's role.");
      }
    } catch (error) {
      console.error("An error occurred while updating the role:", error);
    }
    setIsSheetOpen(false);
  };

  return (
    <div className="bg-gray-200 rounded-lg">
      <div className="flex items-center justify-between gap-20 px-4 py-0.5">
        <div className="flex flex-col gap-2 py-2">
          <h2 className="">{getuser.name}</h2>
          <p>{getuser.email}</p>
        </div>
        <Dialog.Root open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <Dialog.Trigger asChild>
            <Button onClick={() => setIsSheetOpen(true)}>Edit</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <Dialog.Title className="text-lg font-bold">
                Edit User Information
              </Dialog.Title>
              <Dialog.Description className="space-y-2 mt-4">
                <div>
                  <p>
                    <strong>Name:</strong> {getuser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {getuser.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {getuser.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {getuser.streetAddress}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {getuser.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {getuser.country}
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role", { required: true })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <div className="flex gap-4 mt-4">
                    <Button type="submit" className="bg-blue-500 text-white">
                      Save
                    </Button>
                    <Dialog.Close asChild>
                      <Button>Cancel</Button>
                    </Dialog.Close>
                  </div>
                </form>
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
