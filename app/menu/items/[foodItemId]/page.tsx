import getFoodItemId from "@/app/action/getFoodItemId";
import FoodItemDisplay from "../components/FoodItemDisplay";
import getUser from "@/app/action/getUser";

export default async function Page({
  params,
}: {
  params: { foodItemId: string };
}) {
  const foodItemId = await getFoodItemId(params.foodItemId);
  const user = await getUser();

  if (!foodItemId) {
    return <div>Loading...</div>;
  }

  const item = foodItemId[0];

  return (
    <div className="container mx-auto p-4">
      <FoodItemDisplay user={user} item={item} />
    </div>
  );
}
