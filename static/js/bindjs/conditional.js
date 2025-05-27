export const and = (first, last) => (first ? last : "");
export const eq = (comparable, result) => (reference) =>
  and(reference === comparable, result);

export const When = (reference, resolver) => {
  let element = {};
  reference.addTrigger(async (value) => {
    const resolvedElement = resolver(value);
    element.active?.replaceWith(resolvedElement);
    element.active = resolvedElement;
  });
  element.active = resolver(reference());
  return element.active;
};
