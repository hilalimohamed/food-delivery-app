import { TbStarFilled } from "react-icons/tb";
import ReviewForm from "./ReviewForm";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  user: any;
};

export default function ReviewsTab({
  reviews,
  foodItemId,
  user,
}: {
  reviews: Review[];
  foodItemId: string;
  user: any;
}) {
  console.log("review  :  ", reviews);
  return (
    <div>
      <h3 className="font-bold text-xl mb-4">Customer Reviews</h3>
      <div className="">
        <div className="grid grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={review.user.imageUrl || "/home/profile.jpeg"}
                  alt="reviewer"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold">{review.user.name}</p>
                  <div className="flex">
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`text-xl p-1 ${
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <TbStarFilled />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          ))}

          {/* <div className="border p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src="\home\profile.jpeg"
                alt="reviewer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-bold">James Peters</p>
                <div className="flex">
                  <span>⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-gray-600">
              Really good, but a little too salty for my taste.
            </p>
          </div> */}
        </div>

        <button className="mt-4 border py-2 px-4 rounded hover:bg-gray-100">
          Load More Reviews
        </button>
        <ReviewForm foodItemId={foodItemId} user={user} />
      </div>
    </div>
  );
}
