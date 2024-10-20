import Bar from "@/components/topBar/Bar";
import MobilBar from "@/components/topBar/MobilBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
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
