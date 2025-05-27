import { Page404 } from "./pages/404.js";
import { HomePage } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { AddRoute, go } from "./router.js";

export const JWT_KEY = "zone01-jwt";
export let domain = "zone01oujda.ma";
export const changeOrigin = (v) => (domain = v);
export const baseUrl = `https://learn.${domain}/api/`;
export const SIGNIN_API = new URL(baseUrl + "auth/signin");
export const GRAPHQL_API = new URL(baseUrl + "graphql-engine/v1/graphql");
const PICTURE_URL =
"https://discord.zone01oujda.ma/assets/pictures/${login}.jpg";
export const getUserPic = (login) => PICTURE_URL.replace("${login}", login);

AddRoute("/", HomePage);
AddRoute("/login", LoginPage);
AddRoute("404", Page404);
const main = () => {
  go(location.pathname);
};

main();
