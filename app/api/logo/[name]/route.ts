import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_LOGOS: Record<string, string> = {
  apple: "https://cdn.simpleicons.org/apple/000000",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const url = EXTERNAL_LOGOS[name];
  if (!url) {
    return new NextResponse(null, { status: 404 });
  }
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) {
    return new NextResponse(null, { status: 502 });
  }
  const blob = await res.blob();
  const contentType = res.headers.get("Content-Type") ?? "image/svg+xml";
  return new NextResponse(blob, {
    status: 200,
    headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=86400" },
  });
}
