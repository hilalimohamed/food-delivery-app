import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { TbStarFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";

type ReviewFormValues = {
  rating: number;
  comment?: string;
};

type ReviewFormProps = {
  foodItemId: string;
  user: any;
};

function ReviewForm({ foodItemId, user }: ReviewFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    // defaultValues: { rating: 1, comment: "" },
  });

  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onSubmit = async (data: ReviewFormValues) => {
    // if (!user) {
    //   alert("You must be logged in to submit a review!");
    //     router.push("/login");
    //   return;
    // }
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await axios.post("/api/review", {
        rating: data.rating,
        comment: data.comment,
        foodItemId: foodItemId,
        userId: user.id,
      });

      if (response.status === 200) {
        alert("Review submitted successfully!");
        reset();
      } else {
        console.error("Error while submitting review");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the review.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Rate this item:</h3>

        {/* Star Rating System */}
        <Controller
          name="rating"
          control={control}
          rules={{ required: "Please provide a rating" }} // Validation rule
          render={({ field }) => (
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => field.onChange(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className={`text-xl p-1 ${
                    (hoveredRating || field.value) >= star
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <TbStarFilled />
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && (
          <span className="text-red-500 text-xs">{errors.rating.message}</span>
        )}

        {/* Comment Textarea */}
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2">
            Comment:
          </label>
          <Controller
            name="comment"
            control={control}
            rules={{ required: "Please enter a comment" }} // Validation rule
            render={({ field }) => (
              <textarea
                id="comment"
                {...field}
                rows={4}
                className="border p-2 w-full"
                placeholder="Write your comment here..."
              />
            )}
          />
          {errors.comment && (
            <span className="text-red-500 text-xs">
              {errors.comment.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {/* Custom Login Modal */}
      {showLoginModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">You need to log in</h2>
            <p className="mb-4">Please log in to submit a review.</p>
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </button>
            <button
              className="bg-gray-300 text-black py-1 px-4 rounded"
              onClick={() => setShowLoginModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
