import { Settings, PayloadFunc } from "./settings";
import { isHash, isFunc } from "./identifiers";

export type Callee = () => any;

export default class SyncTrier {
  public callee: Callee;
  private __waitFor: number;
  private __intervalID: NodeJS.Timer | null;
  private __callCount: number;
  private __onSuccess?: PayloadFunc;

  constructor(settings: Settings, callee: Callee) {
    this.callee = callee;
    this.__waitFor = settings.waitFor;
    this.__callCount = settings.maxTries;
    this.__onSuccess = settings.success;

    this.__intervalID = setInterval(this.tick, this.__waitFor);
  }

  private tick = (): void => {
    if (this.__callCount <= 0) {
      this.stopTimer();
      return;
    }
    const result = this.callee();
    if (isHash(result) && result.success === true) {
      this.stopTimer();
      if (typeof this.__onSuccess === "function") {
        if (result.payload) {
          this.__onSuccess(result.payload);
        } else {
          this.__onSuccess();
        }
      }
      return;
    }
    this.decrementCallCount();
  };

  private stopTimer = (): void => {
    if (!this.__intervalID) {
      return;
    }
    clearInterval(this.__intervalID);
    this.__intervalID = null;
  };

  private decrementCallCount = (): void => {
    if (this.__callCount > 0) {
      this.__callCount--;
    }
  };

  public isPaused = (): boolean => {
    return this.__intervalID == null && this.__callCount > 0;
  };

  public pause = (): void => {
    if (!this.__intervalID) {
      return;
    }
    clearInterval(this.__intervalID);
    this.__intervalID = null;
  };

  public resume = (): void => {
    if (this.__intervalID) {
      return;
    }
    this.__intervalID = setInterval(this.tick, this.__waitFor);
  };
}
