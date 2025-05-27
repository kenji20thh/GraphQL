import { div } from "../bindjs/native.js";
import { Header } from "../components/Header.js";
import { Overview } from "../components/Overview.js";
import { RecentActivity } from "../components/RecentActivity.js";
import { Skills } from "../components/Skills.js";
import { auth } from "../context/auth.js";
import { graphQuery } from "../models/query.js";
import { User } from "../models/user.js";
import { go } from "../router.js";
class UserId extends User {
  static query = `query getId {
  user {
    id
    campus
  }
}`;
}

export const HomePage = async () => {
  if (!auth.jwt) return go("/login");
  let [user, error] = await graphQuery(UserId);
  if (error) return div("HomePage", error);
  if (!user.campus)
    return div("HomePage").add(
      div("section", "This user is not a student! No data to show")
    );
  [user, error] = await graphQuery(User, {
    userId: user.id,
    campus: user.campus,
  });
  if (error) return div("HomePage", error);
  localStorage.setItem("campus", user.campus);
  return div().add(
    Header(user),
    div("HomePage").add(Overview(user), Skills(user), RecentActivity(user))
  );
};
