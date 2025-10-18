import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");

  if (!searchText || searchText.length < 2) {
    return NextResponse.json({ addresses: [] });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        searchText
      )}&format=json&addressdetails=1&countrycodes=IN&limit=10&accept-language=en`
    );

    const data = await res.json();

    // Map to a simple address list
    const addresses = data.map((item: any) => item.display_name);

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("OSM fetch error:", error);
    return NextResponse.json({ addresses: [] }, { status: 500 });
  }
}
