import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const response = req.cookies.get("token");
  console.log(response);
  return NextResponse.next();
}

export const config = {
  matcher: "/login",
};
