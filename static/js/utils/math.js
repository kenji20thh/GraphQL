export const degToRad = (degree) => {
  const degToRadUnit = Math.PI / 180;
  return degToRadUnit * degree;
};
export const degreeToXY = (degree, radius) => {
  const radian = degToRad(degree);
  const x = 50 + radius * Math.cos(radian);
  const y = 50 + radius * Math.sin(radian);
  return { x, y };
};
