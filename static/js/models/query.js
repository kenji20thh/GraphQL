import { auth } from "../context/auth.js";
import { GRAPHQL_API } from "../index.js";
import { go } from "../router.js";

export class QueryModel {
  static query = "";
  static init(data) {
    return data;
  }
  assign(data) {
    for (const key in data) {
      if (this[key] === undefined) {
        return Error(`Response has invalid key ${key}`);
      }
      this[key] = data[key];
    }
  }
}
export const graphQuery = async (model, variables) => {
  const query = model.query;
  const body = JSON.stringify({ query, variables });
  let [resp, error] = await auth.fetch(GRAPHQL_API, {
    method: "POST",
    headers: { Authorization: `Bearer ${auth.jwt}` },
    body,
  });

  if (error) return [null, error];

  let { data, errors } = await resp.json();
  if (errors && errors[0].extensions.code === "invalid-jwt") {
    auth.jwt = null;
    go("/login");
    return [null, Error("invalid-jwt")];
  }
  if (!data) return [null, Error("Error fetching", { cause: errors })];
  data = model.init(data);  
  const result = new model();
  error = result.assign(data);
  if (error) return [null, error];
  return [result, null];
};
