import { div } from "../bindjs/native.js";
import { RadarChart } from "./RadarChart.js";

export const Skills = (user) => {
  return div("skills section").add(
    div("title", "Skills"),
    RadarChart(user.skills)
  );
};
