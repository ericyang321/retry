export function isPromise(object: any): boolean {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) == object;
  }
  return false;
}

export function isFunc(object: any): boolean {
  return typeof object === "function";
}
