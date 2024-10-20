// import SideBarO from "@/app/components/sideBar/SideBarO";
// import TheUsers from "./components/TheUsers";
// import { getUsers } from "@/app/action/getUsers";

import Bar from "@/components/topBar/Bar";
import MobilBar from "@/components/topBar/MobilBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const users = await getUsers();

  return (
    // <div className="h-screen dark:bg-[#1F1F1F]">
    //   <SideBarO>
    //     <TheUsers users={users} />
    //     {children}
    //   </SideBarO>
    // </div>
    <div>
      <div className="hidden lg:block">
        <Bar />
      </div>
      <div className="lg:hidden">
        <MobilBar/>
      </div>
      {children}
    </div>
  );
}
