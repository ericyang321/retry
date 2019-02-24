import { Settings } from "./settings";

export type Callee = () => any;

/*
  pausing mechanism
*/

export default class SyncTrier {
  public callee: Callee;
  private __waitFor: number;
  private __intervalID: NodeJS.Timer | null;
  private __callCount: number;

  constructor(settings: Settings, callee: Callee) {
    this.callee = callee;
    this.__waitFor = settings.waitFor;
    this.__callCount = settings.callCount;
    this.__intervalID = null;

    this.tick = this.tick.bind(this);
    this.decrementCallCount = this.decrementCallCount.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);

    this.__intervalID = setInterval(this.tick, this.__waitFor);
  }

  private tick(): void {
    if (this.__callCount <= 0) {
      this.stopTimer();
      return;
    }
    this.callee();
    this.decrementCallCount();
  }

  private stopTimer(): void {
    if (!this.__intervalID) return;
    clearInterval(this.__intervalID);
    this.__intervalID = null;
  }

  private decrementCallCount(): void {
    if (this.__callCount > 0) {
      this.__callCount--;
    }
  }

  public isPaused(): boolean {
    return this.__intervalID == null && this.__callCount > 0;
  }

  public pause(): void {
    if (!this.__intervalID) {
      // there isn't currently a setInterval going
      return;
    }
    clearInterval(this.__intervalID);
    this.__intervalID = null;
  }

  public resume(): void {
    if (this.__intervalID) {
      // theres already a setInterval going
      return;
    }
    this.__intervalID = setInterval(this.tick, this.__waitFor);
  }
}
