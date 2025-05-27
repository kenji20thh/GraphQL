import {div} from "../bindjs/native.js";
import { go } from "../router.js";

export const Page404 = () => {
  const back = div("back", "Back to Home");
  back.onclick = () => go("/")
  return div("notfound", "404 - page not found").add(back);
};
