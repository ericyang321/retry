import { Callee } from "./index";

export function isPromise(object: any) {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) == object;
  }
  return false;
}

export function isFunc(object: any) {
  return typeof object === "function";
}
