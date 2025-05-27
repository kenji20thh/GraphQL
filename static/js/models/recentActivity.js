import { QueryModel } from "./query.js";

const recentProject_query = `query recentActivities($userId: Int!, $campus: String!) {
  lastProjects: group(
    where: {members: {userId: {_eq: $userId}}, campus: {_eq: $campus}, _not: {pathByPath: {path_archives: {status: {_eq: deleted}}}}}
    order_by: {updatedAt: desc}
    limit: 3
  ) {
    path
    status
    object {
      groupMax: attrs(path: "groupMax")
      groupMin: attrs(path: "groupMin")
    }
    captainLogin
    members {
      userLogin
    }
    updatedAt
    eventId
    results(order_by: [{updatedAt: desc}]) {
      grade
    }
  }
  audit(
    where: {auditedAt: {_is_null: false}, auditorId: {_eq: $userId}}
    order_by: {auditedAt: desc}
    limit: 4
  ) {
    closureType
    auditedAt
    group {
      path
      captainLogin
    }
  }
  waitingAudits: audit(
    where: {group: {campus: {_eq: $campus}}, grade: {_is_null: true}, resultId: {_is_null: true}, auditorId: {_eq: $userId}, private: {code: {_is_null: false}}}
    order_by: {endAt: asc_nulls_last, createdAt: asc}
  ) {
    closureType
    auditedAt
    group {
      path
      captainLogin
    }
    private {
      code
    }
  }
}`;

export class recentProject extends QueryModel {
  static query = recentProject_query;

  #lastProjects = [
    {
      groupMax: 2,
      groupMin: 2,
      captainLogin: "srm",
      members: [
        {
          userLogin: "helbadao",
        },
        {
          userLogin: "srm",
        },
      ],
      path: "/oujda/module/typing-in-progress",
      updatedAt: "2025-05-14T13:33:19.671335+00:00",
      eventId: 41,
      results: [
        {
          grade: 0,
        },
      ],
      status: "finished",
      attempts: [
        {
          createdAt: "2025-05-14T09:07:44.608327+00:00",
        },
      ],
    },
  ];
  audit = [
    {
      closureType: "succeeded",
      auditedAt: "2025-03-10T13:47:20.225+00:00",
      group: {
        path: "/oujda/module/net-cat",
        captainLogin: "mjait",
      },
    },
  ];
  waitingAudits = [
    {
      group: {
        path: "/oujda/module/net-cat",
        captainLogin: "someone",
      },
      private: {
        code: "?ag7h",
      },
    },
  ];
  get lastProjects() {
    return this.#lastProjects;
  }
  set lastProjects(v) {
    this.#lastProjects = v.map((p) => ({
      ...p,
      groupMin: p.object.groupMin,
      groupMax: p.object.groupMax,
    }));
  }
}
