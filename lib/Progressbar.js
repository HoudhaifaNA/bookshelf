import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 500,

  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function () {
  return null;
}
