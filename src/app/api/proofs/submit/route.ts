import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real implementation, you would authenticate the user here
    // using the provided token from the headers, and forward the request
    // to the backend securely.

    // For this prototype, we'll just forward the request.
    const DRP_BACKEND_URL =
      process.env.DRP_BACKEND_URL || "http://localhost:8000";

    const response = await fetch(`${DRP_BACKEND_URL}/api/verify/reading`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
