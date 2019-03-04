import { Settings } from "./settings";

export type AnyPromise = Promise<any>;
export type PromiseCallee = () => AnyPromise;

export default class AsyncTrier {
  public callee: PromiseCallee;
  private __waitFor: number;
  private __timeoutID: NodeJS.Timer | null;
  private __callCount: number;
  private __onSuccess?: (payload: any) => any;

  constructor(settings: Settings, promiseCallee: PromiseCallee) {
    this.callee = promiseCallee;
    this.__waitFor = settings.waitFor;
    this.__timeoutID = null;
    this.__callCount = settings.maxTries;
    this.__onSuccess = settings.success;
    this.executePromise();
  }

  private executePromise = (): void => {
    if (this.__callCount <= 0) {
      this.__timeoutID = null;
      return;
    }
    this.callee()
      .then(this.returnAndStop)
      .catch(() => {
        this.__timeoutID = setTimeout(this.executePromise, this.__waitFor);
        this.decrementCallCount();
      });
  };

  private returnAndStop = (payload: any): void => {
    if (typeof this.__onSuccess === "function") {
      this.__onSuccess(payload);
    }
  };

  private decrementCallCount = (): void => {
    if (this.__callCount > 0) {
      this.__callCount--;
    }
  };
}

/*
  given a promise
  call promise
  wait for promise to come back.
    If its a .then, return the .then value.
    If its a .catch, wait for __waitFor, and call promise again

*/
