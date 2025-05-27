export const importSvg = (svgName) =>
  svgName ? "/static/svg/" + svgName + ".svg" : "";

export const times = (num, func) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(func(i));
  }
  return result;
};
