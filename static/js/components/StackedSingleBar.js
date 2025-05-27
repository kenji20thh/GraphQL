import { div } from "../bindjs/native.js";
import { rect, svg } from "./native/svg.js";

export const StackedSingleBar = (totalUp, totalDown, formatFunction) => {
  const max = Math.max(totalUp, totalDown);
  const up = (totalUp * 50) / max;

  return div("graph").add(
    div("head").add(
      div("up").add(svg("trending_up"), formatFunction(totalUp)),
      div("down").add(formatFunction(totalDown), svg("trending_down"))
    ),
    svg({ viewBox: "0 0 100 5" }).add(
      rect({ x: 0, y: 0, width: up, height: 5, fill: "blue" }),
      rect({
        x: up,
        y: 0,
        width: 100 - up,
        height: 5,
        fill: "red",
      })
    )
  );
};
