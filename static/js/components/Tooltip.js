import { div } from "../bindjs/native.js";

export const Tooltip = (node, ...tip) => {
  return div("tooltip-wrap").add(node, div("tooltip").add(...tip));
};
