/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from "next/server";
const handler = async (req) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/user/isLoggedIn?token=${req.cookies.auth_token}`
    );
    const data = await res.json();

    console.log(data, req.url);
    if (
      data.currentUser &&
      (req.url === "/login" ||
        req.url.startsWith("/confirm") ||
        req.url === "/")
    ) {
      return NextResponse.redirect("/mylibrary");
    } else if (
      !data.currentUser &&
      (req.url === "/mylibrary" || req.url === "/logout")
    ) {
      return NextResponse.redirect("/login");
    }
  } catch (err) {
    return NextResponse.next();
  }
};

export default handler;
