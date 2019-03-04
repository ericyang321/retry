import { isPromise, isFunc } from "./identifiers";
import SyncTrier, { Callee } from "./syncTrier";
import { Settings, defaultSettings } from "./settings";
import AsyncTrier, { PromiseCallee } from "./asyncTrier";

export interface Trier {
  pause(): void;
  resume(): void;
  isPaused(): boolean;
}

function getTrier(settings: Settings, callee: Callee | PromiseCallee): typeof SyncTrier | typeof AsyncTrier {
  if (isFunc(callee) && settings.async) {
    return AsyncTrier;
  } else if (isFunc(callee)) {
    return SyncTrier;
  }
  throw new Error(
    `trytrytry error: cannot accept ${typeof callee} as a repeatable callee.
     trytrytry only accepts functions.`
  );
}

export default function trytrytry(settings: Settings, callee: Callee | PromiseCallee) {
  const Trier = <any>getTrier(settings, callee);
  return new Trier(Object.assign({}, defaultSettings, settings), callee);
}

/*
  trytrytry({
    waitFor: 20,
    maxTries: 2,
    onSuccess: () => {},
  }, () => {
    return { success: true, payload: {} }
  })

  trytrytry({
    waitFor: 20,
    maxTries: 2,
  }, fetch.get("https://www.google.com"))


*/
