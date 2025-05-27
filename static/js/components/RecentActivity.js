import { div } from "../bindjs/native.js";
import { graphQuery } from "../models/query.js";
import { recentProject } from "../models/recentActivity.js";
import { Audit } from "./Audit.js";
import { Project } from "./Project.js";

export const RecentActivity = async (user) => {
  const variables = { userId: user.id, campus: user.campus };
  const [projects, error] = await graphQuery(recentProject, variables);
  if (error) return div("RecentActivity section", error);
  const { lastProjects, audit, waitingAudits } = projects;

  return div("RecentActivity section").add(
    div("title", "Recent Activities"),
    div("projects", "projects:").add(
      ...lastProjects.map((project) => Project(project))
    ),
    div("audits", "audits:").add(
      ...waitingAudits.map((a) => Audit(a)),
      ...audit.map((a) => Audit(a))
    )
  );
};
