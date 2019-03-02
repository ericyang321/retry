import { isPromise, isFunc } from "./identifiers";
import SyncTrier from "./syncTrier";
import { Settings, defaultSettings } from "./settings";
import AsyncTrier from "./asyncTrier";

function getTrier(callee: any) {
  if (isPromise(callee)) {
    return AsyncTrier;
  } else if (isFunc(callee)) {
    return SyncTrier;
  }
  throw new Error(
    `trytrytry error: cannot accept ${typeof callee} as a repeatable callee.
     trytrytry accepts a Promise or a Function`
  );
}

export default function trytrytry(settings: Settings, callee: any) {
  const Trier = <any>getTrier(callee);
  const endSettings = Object.assign({}, defaultSettings, settings);
  return new Trier(endSettings, callee);
}
