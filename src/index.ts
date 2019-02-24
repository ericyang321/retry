import { isPromise, isFunc } from "./identifiers";
import SyncTrier, { Callee } from "./syncTrier";
import AsyncTrier from "./asyncTrier";

function getTrier(callee: Callee) {
  if (isPromise(callee)) {
    return AsyncTrier;
  } else if (isFunc(callee)) {
    return SyncTrier;
  } else {
    throw new Error(
      `trytrytry error: cannot accept ${typeof callee} as a repeatable callee.
       trytrytry accepts a Promise or a Function`
    );
  }
}

export default function trytrytry(callee: Callee) {
  const defaultSettings = {};
  const trier = getTrier(callee);
}
