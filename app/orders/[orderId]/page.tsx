import { getOrderId } from "@/app/action/getOrderId";
import OrderDetails from "./components/OrderDetails";

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const orderById = await getOrderId(params.orderId);

  if (!orderById) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <OrderDetails orderById={orderById} />
    </div>
  );
}
