import { When } from "./conditional.js";

class Reference {}

export const useReference = (defaultValue, _defaultFallBack) => {
  const modifier = typeof defaultValue === "function" ? defaultValue : (v) => v;
  let value = modifier(_defaultFallBack ?? defaultValue);
  const triggers = new Set();

  const fn = function (newValue) {
    if (arguments.length === 0) {
      return value;
    }
    if (typeof newValue === "function") {
      value = modifier(newValue(value));
    } else {
      value = modifier(newValue);
    }

    for (const trigger of triggers) {
      trigger(value);
    }

    return this;
  };

  fn.addTrigger = (trigger) => {
    console.log(value);
    triggers.add(trigger);
    return trigger(value);
  };

  Object.setPrototypeOf(fn, Reference.prototype);
  return fn;
};
export const toggle = (a, b) => {
  const ref = useReference(a);
  const toggleFunc = () => {
    ref((prev) => (prev === a ? b : a));
  };

  const switchFunc = (first, second) =>
    When(ref, (v) => (a === v ? first : second));
  return { toggle: toggleFunc, switch: switchFunc, list: [a, b], ref };
};

export const isReference = (value) => value instanceof Reference;
