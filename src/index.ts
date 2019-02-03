export type Callee = () => any
export type VoidFunc = () => void

export interface Settings {
  exponentialBackoff: boolean
  timeout: number
  tries: number
  every: number
}

export interface PublicController {
  abort: VoidFunc
  pause: VoidFunc
  resume: VoidFunc
  isOngoing: VoidFunc
  isPaused: VoidFunc
}

class Trier {
  public fn: Callee
  public settings: Settings
  private __timerID: NodeJS.Timeout | null
  private __currentTryCount: number

  constructor(settings: Settings, fn: Callee) {
    this.fn = fn
    this.settings = settings

    this.__timerID = null
    this.__currentTryCount = this.settings.tries
  }

  private decrementTryCount(): void {
    if (this.__currentTryCount > 0) {
      this.__currentTryCount--
    }
  }

  public canStillTry(): boolean {
    return this.__currentTryCount > 0
  }

  public paused(): boolean {
    return this.__timerID == null && this.canStillTry()
  }

  public abort(): void {
    if (this.__timerID == null) {
      return
    }
    clearTimeout(this.__timerID)
    this.__currentTryCount = 0
    this.__timerID = null
  }

  public pause(): void {
    if (this.__timerID == null) {
      // timer has already stopped. Handle error here.
      return
    }
    clearTimeout(this.__timerID)
  }

  public resume(): void {
    if (this.__timerID != null) {
      // timer is already ongoing. Handle error here.
      return
    }
    this.execute()
  }

  public execute(): void {
    this.__timerID = setTimeout(() => {
      if (this.canStillTry() === false) {
        return
      }
      this.fn()
      this.decrementTryCount()
      this.execute()
    }, this.__currentTryCount)
  }
}

function trytrytry(settings: Settings, fn: Callee) {
  const defaultSettings: Settings = {
    exponentialBackoff: false,
    timeout: 10 * 1000,
    tries: 5,
    every: 200,
  }
  const userSettings: Settings = Object.assign({}, defaultSettings, settings)
  const trier: Trier = new Trier(userSettings, fn)
  trier.execute()
  const publicController: PublicController = {
    abort: trier.abort,
    pause: trier.pause,
    resume: trier.resume,
    isPaused: trier.paused,
    isOngoing: trier.canStillTry,
  }
  return publicController
}

export default trytrytry
