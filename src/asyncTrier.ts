import { Settings } from "./settings";

export type AnyPromise = Promise<any>;

export default class AsyncTrier {
  private __promise: AnyPromise;
  private __waitFor: number;

  constructor(settings: Settings, promise: AnyPromise) {
    this.__promise = promise;
    this.__waitFor = settings.waitFor;
  }

  private wait(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, this.__waitFor);
    });
  }

  public isPaused = (): boolean => {
    return true;
  };

  public pause = (): void => {};

  public resume = (): void => {};
}
