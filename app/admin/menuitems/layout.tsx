import Bar from "@/components/topBar/Bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Bar />
      {children}
    </div>
  );
}
