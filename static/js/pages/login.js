import { button, div, form, input } from "../bindjs/native.js";
import { useReference } from "../bindjs/reference.js";
import { img } from "../bindjs/native.js";
import { auth } from "../context/auth.js";
import { SIGNIN_API } from "../index.js";
import { go } from "../router.js";

export const LoginPage = () => {
  if (auth.jwt) return go("/");
  const modifer = (e) => e.target?.value;
  const login = useReference(modifer);
  const password = useReference(modifer);
  const feedback = useReference("Enter your credentials");

  const submit = async (e) => {
    e.preventDefault();
    const b64 = btoa(`${login()}:${password()}`);
    const resp = await fetch(SIGNIN_API, {
      method: "POST",
      headers: {
        Authorization: `Basic ${b64}`,
      },
    });
    if (!resp.ok) {
      const json = await resp.json();
      feedback(json.error);
      return;
    }
    const text = await resp.text();
    auth.jwt = text;
    go("/");
  };

  return form("LoginPage", { onsubmit: submit }).add(
    img("/static/images/z01oujda.png"),
    div("feedback", feedback),
    input("login", "Email or Username", true, "text", { oninput: login }),
    input("password", "Password", true, "password", { oninput: password }),
    button("submit", "login", "submit")
  );
};
