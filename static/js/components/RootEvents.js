import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";
import { getProjectName } from "./Project.js";

export const RootEvents = async (user) => {
  return div("RootEvents section").add(
    ...user.levels.map(({ event, amount }) => {
      const name = getProjectName(event);
      return div("event").add(
        div("name", name),
        div("level").add(svg("stat_2"), `level ${amount}`)
      );
    })
  );
};
