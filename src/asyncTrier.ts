import { Settings } from "./settings";

export type AnyPromise = Promise<any>;

export default class AsyncTrier {
  private __promise: AnyPromise;
  private __waitFor: number;

  constructor(promise: AnyPromise, settings: Settings) {
    this.__promise = promise;
    this.__waitFor = settings.waitFor;
  }

  wait(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, this.__waitFor);
    });
  }
}
