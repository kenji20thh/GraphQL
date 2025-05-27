import { and } from "../bindjs/conditional.js";
import { div } from "../bindjs/native.js";
import { svg } from "./native/svg.js";
import { Tooltip } from "./Tooltip.js";

export const getProjectName = (project) => {
  const parts = project.path.split("/");
  return parts[parts.length - 1];
};

/**
 * @param {import('../models/recentActivity.js').recentProject['lastProjects'][number]} project
 */
export const Project = (project) => {
  const results = project.results;
  const attempts = results?.length;
  const status =
    project.status === "finished" && results[0].grade < 1
      ? "project_failed"
      : project.status;

  return div("project").add(
    div("name").add(Tooltip(svg(status), status), getProjectName(project)),
    div("extra").add(
      Tooltip(
        div("group").add(
          svg("group"),
          `${project.members.length}/${project.groupMax || "?"}`
        ),
        div("size", and(project.groupMin, `required: ${project.groupMin}`)),
        div("members").add(
          ...project.members.map((m) => {
            return div("member", m.userLogin);
          })
        )
      ),
      and(
        attempts,
        Tooltip(div("attempts").add(svg("refresh"), attempts), "attempts")
      )
    )
  );
};
