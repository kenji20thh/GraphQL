import { JWT_KEY } from "../index.js";

export const auth = {
  get jwt() {
    return localStorage.getItem(JWT_KEY);
  },
  set jwt(value) {
    if (value === null) {
      localStorage.removeItem(JWT_KEY);
      return;
    }
    localStorage.setItem(JWT_KEY, value.slice(1, -1));
  },
  /**
   * @param {RequestInfo | URL} input
   * @param {RequestInit} init
   * @returns {Promise<[ Response?, Error? ]>}
   */
  async fetch(...params) {
    const err = Error("Invalid JWT auth token");
    if (!auth.jwt) {
      return [null, err];
    }
    try {
      const resp = await fetch(...params);
      if (resp.status === 401) {
        this.auth = null;
        return [resp, err];
      }
      return [resp, null];
    } catch (error) {
      return [null, Error("network error", { cause: error })];
    }
  },
};
