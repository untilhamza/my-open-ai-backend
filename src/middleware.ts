import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["http://localhost:3000", "https://yoursite.com"]
    : ["http://localhost:3000"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  console.log("origin in middleware ", origin);
  console.log("request in middleware ", request);

  // if (origin && !allowedOrigins.includes(origin)) {
  //   return new NextResponse(null, {
  //     status: 400,
  //     statusText: "Bad Request",
  //     headers: {
  //       "Content-Type": "text/plain",
  //     },
  //   });
  // }

  console.log("Middleware!");

  console.log("req method in middleware  ", request.method);
  console.log("request url in middleware ", request.url);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
