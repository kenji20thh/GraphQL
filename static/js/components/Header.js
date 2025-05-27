import { div } from "../bindjs/native.js";
import { auth } from "../context/auth.js";
import { getUserPic } from "../index.js";
import { go } from "../router.js";
import { img } from "../bindjs/native.js";
import { useReference } from "../bindjs/reference.js";
import { svg } from "./native/svg.js";
const logout = () => {
  auth.jwt = null;
  go("/login");
};
const Info = (user, className) => {
  return div(`info section ${className}`).add(
    div("fullname", `${user.firstName} ${user.lastName} (${user.login})`),
    div("phone", user.phone),
    div("email", user.email)
  );
};
export const Header = async (user) => {
  const activeIcon = useReference((e) => e.target?.classList.toggle("active"));
  return div("header").add(
    img("/static/images/01.png"),
    div("campus", user.campus),
    div("|", "|"),
    div("login", user.login),
    div("icon").add(
      Info(user, "placeholder"),
      img(getUserPic(user.login), "icon", { onclick: activeIcon }),
      div("dropDown").add(
        Info(user),
        div("logout", "Logout", { onclick: logout }).add(svg("exit"))
      )
    )
  );
};
