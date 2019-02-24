import { Settings } from "./settings";

export type Callee = () => any;

/*
  no more deving on this class until you've tested the shit out of this:
*/

export default class SyncTrier {
  public callee: Callee;
  private __waitFor: number;
  private __intervalID: NodeJS.Timer;
  private __callCount: number;

  constructor(settings: Settings, callee: Callee) {
    this.callee = callee;
    this.__waitFor = settings.waitFor;
    this.__callCount = settings.callCount;

    this.tick = this.tick.bind(this);
    this.decrementCallCount = this.decrementCallCount.bind(this);

    this.__intervalID = setInterval(this.tick, this.__waitFor);
  }

  private tick() {
    if (this.__callCount === 0) {
      clearInterval(this.__intervalID);
      return;
    }
    this.callee();
    this.decrementCallCount();
  }

  private decrementCallCount() {
    this.__callCount--;
  }
}
