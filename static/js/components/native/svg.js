import { asyncAppend } from "../../bindjs/native.js";
import { importSvg } from "../../utils/index.js";
const svgCache = new Map();
const parser = new DOMParser();
const createSvg = (tag, attrs = {}) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const key in attrs) {
    svg.setAttribute(key, attrs[key]);
  }
  svg.add = asyncAppend.bind(svg);
  return svg;
};
export const rect = (attrs) => createSvg("rect", attrs);
export const circle = (attrs) => createSvg("circle", attrs);
export const line = (attrs) => createSvg("line", attrs);
export const polygon = (attrs) => createSvg("polygon", attrs);
export const text = (text, attrs) => {
  const elm = createSvg("text", attrs);
  elm.textContent = text;
  return elm;
};
export const title = (text, attrs) => {
  const elm = createSvg("title", attrs);
  elm.textContent = text;
  return elm;
};
export const svg = (name, attr = {}) => {
  if (typeof name === "object") return createSvg("svg", name);
  const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const replaceSvg = async (parsedSvg) => {
    await parsedSvg.promise;
    const clonedSvg = parsedSvg.cloneNode(true);
    for (const key of clonedSvg.getAttributeNames()) {
      svgElem.setAttribute(key, clonedSvg.getAttribute(key));
    }
    for (const [key, value] of Object.entries(attr)) {
      if (key.startsWith("on") && typeof value === "function") {
        svgElem[key] = value;
      } else {
        svgElem.setAttribute(key, value);
      }
    }
    svgElem.append(...clonedSvg.children);
  };

  svgElem.classList.add(name);
  const url = importSvg(name);
  const cachedSvg = svgCache.get(url);

  if (!cachedSvg) {
    const promise = fetchAndParseSvg(url, name);
    promise.then(replaceSvg);
    svgCache.set(url, promise);
  } else if (cachedSvg instanceof Promise) {
    cachedSvg.then(replaceSvg);
  } else {
    replaceSvg(cachedSvg);
  }

  return svgElem;
};
const fetchAndParseSvg = async (url) => {
  try {
    const resp = await fetch(url);

    const text = await resp.text();
    const svgDoc = parser.parseFromString(text, "image/svg+xml");
    const parsedSvg = svgDoc.querySelector("svg");
    svgCache.set(url, parsedSvg.cloneNode(true));
    return parsedSvg;
  } catch (error) {
    return createSvg("svg", { width: 24, height: 24 }).add(
      createSvg("text", {
        x: 10,
        y: 15,
      }).add("X")
    );
  }
};
