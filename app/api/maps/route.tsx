import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!input || !apiKey) {
    return NextResponse.json(
      { message: "Missing input or API key" },
      { status: 400 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&key=${apiKey}`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from Google Maps API" },
      { status: 500 }
    );
  }
}
