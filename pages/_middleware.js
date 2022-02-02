/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from "next/server";
const handler = async (req) => {
  let url = req.url.split("app")[1];
  console.log(`URL ----------------------- ${url}`);

  if (req.cookies.auth_token) {
    const res = await fetch(
      `https://bookshelf.vercel.app/api/user/isLoggedIn?token=${req.cookies.auth_token}`
    );
    let data = await res.json();
    if (
      data.currentUser &&
      (url === "/login" || url.startsWith("/confirm") || url === "/")
    ) {
      return NextResponse.redirect("/mylibrary");
    } else if (
      !data.currentUser &&
      (url === "/mylibrary" || url === "/logout")
    ) {
      return NextResponse.redirect("/login");
    }
  } else {
    if (url === "/mylibrary" || url === "/logout") {
      return NextResponse.redirect("/login");
    }
  }
};

export default handler;
