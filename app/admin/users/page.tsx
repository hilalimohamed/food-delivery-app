import React from "react";
import getUsers from "@/app/action/getUsers";
import AllUsers from "./components/AllUsers";

export default async function page() {
  const getusers = await getUsers();
  console.log("all users", getusers);
  return (
    <div className="flex items-center justify-center mt-6 lg:mt-14">
      <div className="flex flex-col gap-2">
        {getusers.map((getuser) => (
          <AllUsers key={getuser.id} getuser={getuser} />
        ))}
      </div>
    </div>
  );
}
