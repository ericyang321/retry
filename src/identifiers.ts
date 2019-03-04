export function isPromise(object: any): boolean {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) == object;
  }
  return false;
}

export function isFunc(object: any): boolean {
  return typeof object === "function";
}

export function isHash(val: any): boolean {
  if (val === null) {
    return false;
  } else if (Array.isArray(val)) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}
