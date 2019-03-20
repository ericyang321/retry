import { Settings } from "./settings";
import { isPromise } from "./identifiers";

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
    const callee = this.callee();
    if (!isPromise(callee)) {
      throw new Error("trytrytry: settings[async] is true while passed function does not return a promise.");
    }
    callee.then(this.returnAndStop).catch(() => {
      this.__timeoutID = setTimeout(this.executePromise, this.__waitFor);
      this.decrementCallCount();
    });
  };

  private returnAndStop = (payload: any): void => {
    this.__callCount = 0;
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
