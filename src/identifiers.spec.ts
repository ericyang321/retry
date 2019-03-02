import { isPromise, isFunc } from "./identifiers";

describe("isPromise", () => {
  it("returns true for a promise", () => {
    expect(isPromise(new Promise(() => {}))).toBe(true);
  });

  it("returns true for a resolved promise", () => {
    expect(isPromise(Promise.resolve(""))).toBe(true);
  });

  it("returns true for a rejected promise", () => {
    expect(isPromise(Promise.reject("").catch(() => {}))).toBe(true);
  });

  const nonPromiseTypes = ["str", true, 4, function() {}, () => {}, {}, []];

  nonPromiseTypes.forEach(type => {
    it(`returns false for ${type.toString()}`, () => {
      expect(isPromise(type)).toBe(false);
    });
  });
});

describe("isFunc", () => {
  it("returns true for a function", () => {
    expect(isFunc(function() {})).toBe(true);
  });

  it("returns true for a bound arrow function", () => {
    expect(isFunc(() => {})).toBe(true);
  });

  const nonFunctionTypes = [
    "str",
    true,
    4,
    new Promise(() => {}),
    Promise.resolve(""),
    Promise.reject("").catch(() => {}),
  ];

  nonFunctionTypes.forEach(type => {
    it(`returns false for ${type.toString()}`, () => {
      expect(isFunc(type)).toBe(false);
    });
  });
});
