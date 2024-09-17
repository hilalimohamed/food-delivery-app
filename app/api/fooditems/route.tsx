import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      itemName,
      description,
      imageUrl,
      detailImages,
      category,
      basePrice,
      sizes,
      extraIngredients,
    } = body.data;

    // Find the category by name
    const categoryData = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryData) {
      //   console.log("Category not found:", category);
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Create the food item with sizes and extra ingredients
    const foodItem = await prisma.foodItem.create({
      data: {
        name: itemName,
        description: description,
        imageUrl: imageUrl, // This is the main image URL
        price: parseFloat(basePrice),
        category: {
          connect: { id: categoryData.id },
        },
        sizes: {
          create: sizes.map((size: { name: string; extraPrice: any }) => ({
            name: size.name,
            extraPrice: parseFloat(size.extraPrice),
          })),
        },
        extraIngredients: {
          create: extraIngredients.map(
            (ingredient: { name: string; extraPrice: any }) => ({
              name: ingredient.name,
              extraPrice: parseFloat(ingredient.extraPrice),
            })
          ),
        },
        detailImages: {
          create: detailImages.map((image: { url: string }) => ({
            url: image.url,
          })),
        },
      },
    });

    // console.log("Food Item created:", foodItem);

    return NextResponse.json(
      { message: "Item added successfully", foodItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the item" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("hna hhh : ", body);
    const {
      id,
      name,
      description,
      imageUrl,
      category,
      price,
      sizes,
      extraIngredients,
    } = body;
    const categoryData = await prisma.category.findUnique({
      where: { name: category },
    });
    if (!categoryData) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    // hna badya update the food item
    const foodItem = await prisma.foodItem.update({
      where: { id },
      data: {
        name: name,
        description: description,
        price: parseFloat(price),
        imageUrl: imageUrl,
        category: {
          connect: { id: categoryData.id },
        },
        sizes: {
          deleteMany: {},
          create: sizes.map((size: { name: string; extraPrice: any }) => ({
            name: size.name,
            extraPrice: parseFloat(size.extraPrice),
          })),
        },
        extraIngredients: {
          deleteMany: {},
          create: extraIngredients.map(
            (ingredient: { name: string; extraPrice: any }) => ({
              name: ingredient.name,
              extraPrice: parseFloat(ingredient.extraPrice),
            })
          ),
        },
      },
    });

    return NextResponse.json(
      { message: "Item updated successfully", foodItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "invalid data" }, { status: 402 });
    }
    await prisma.size.deleteMany({
      where: { foodItemId: id },
    });

    await prisma.extraIngredient.deleteMany({
      where: { foodItemId: id },
    });
    const foodItem = await prisma.foodItem.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "the food item deleted", data: foodItem },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "an error occurred" }, { status: 500 });
  }
}
