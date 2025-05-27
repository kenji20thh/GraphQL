import { times } from "../utils/index.js";
import { degreeToXY } from "../utils/math.js";
import { circle, line, polygon, svg, text } from "./native/svg.js";

export const RadarChart = (values) => {
  const angleStep = 360 / values.length;
  const circleCount = 4;
  const innerRadius = 10;
  const outterRadius = circleCount * innerRadius;
  const labelPadding = 5;

  return svg({ viewBox: "0 0 100 100" }).add(
    ...times(circleCount, (i) =>
      circle({
        cx: 50,
        cy: 50,
        r: (i + 1) * innerRadius,
        fill: "none",
        stroke: "gray",
        "stroke-width": 0.4,
        style: `animation-delay: ${0.3 + i * 0.1}s`,
      })
    ),
    polygon({
      fill: "rgba(0, 0, 255, 0.3)",
      stroke: "blue",
      "stroke-width": 0.5,
      points: values
        .map((v, i) => {
          const degree = (i + 1) * angleStep;
          const radius = (v.amount * outterRadius) / 100;
          const { x, y } = degreeToXY(degree, radius);
          return `${x},${y}`;
        })
        .join(" "),
    }),
    ...values.flatMap((v, i) => {
      const degree = (i + 1) * angleStep;
      const radius = (v.amount * outterRadius) / 100;
      const { x, y } = degreeToXY(degree, radius);
      const full = degreeToXY(degree, outterRadius);
      const label = degreeToXY(degree, outterRadius + labelPadding);

      return [
        text(v.label, {
          class: "label",
          x: label.x,
          y: label.y,
          "font-size": 5,
          "text-anchor": "middle",
        }),
        line({
          x1: x,
          x2: full.x,
          y1: y,
          y2: full.y,
          stroke: "gray",
          "stroke-width": 0.5,
        }),

        text(v.amount + "%", {
          class: "value",
          x: 50,
          y: 50,
          "font-size": 5,
          "text-anchor": "middle",
          fill: "none",
        }),
      ];
    })
  );
};
