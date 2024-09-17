import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { foodItemId, rating, comment, userId } = await request.json();

    // Fetch the current food item
    const foodItem = await prisma.foodItem.findUnique({
      where: { id: foodItemId },
    });

    if (!foodItem) {
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "cannot rate without login" },
        { status: 404 }
      );
    }

    // Calculate the new average rating and number of voters
    const newNumberOfVoters = foodItem.numberOfVoters + 1;
    const newAverageRating =
      (foodItem.averageRating * foodItem.numberOfVoters + rating) /
      newNumberOfVoters;

    // Update the food item with the new average rating and number of voters
    await prisma.foodItem.update({
      where: { id: foodItemId },
      data: {
        averageRating: newAverageRating,
        numberOfVoters: newNumberOfVoters,
      },
    });

    // Save the review in the Review model (if applicable)
    await prisma.review.create({
      data: {
        rating,
        comment,
        foodItemId,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Review submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
