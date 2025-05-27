import { and } from "../bindjs/conditional.js";
import { div } from "../bindjs/native.js";
import { toggle } from "../bindjs/reference.js";
import { svg } from "./native/svg.js";
import { getProjectName } from "./Project.js";
import { Tooltip } from "./Tooltip.js";

export const Audit = (audit) => {
  const { toggle: toggleView, ref: auditClass } = toggle(
    "auditWrap",
    "auditWrap show"
  );

  const closureType = audit.closureType || "waiting";
  return div(auditClass).add(
    div("audit").add(
      and(
        audit.private?.code,
        svg("arrow_drop_down", {
          onclick: toggleView,
        })
      ),
      Tooltip(svg(closureType), closureType),
      div("name", getProjectName(audit.group)),
      div("-", "-"),
      div("captain", audit.group.captainLogin)
    ),
    and(audit.private?.code, div("code").add(svg("key"), audit.private?.code))
  );
};
