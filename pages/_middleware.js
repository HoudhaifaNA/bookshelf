/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from "next/server";
const handler = async (req, event) => {
  if (req.cookies.auth_token) {
    const res = await fetch(
      `http://localhost:3000/api/user/isLoggedIn?token=${req.cookies.auth_token}`
    );
    if (
      res.status === 200 &&
      (req.url === "/login" || req.url.startsWith("/confirm"))
    ) {
      return NextResponse.redirect("/");
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};

export default handler;
