import { Pad } from '../pads/pads';

export class Player {
  private _currentPad;
  private _color;
  private _cssID;
  private _reachablePads: Pad[];

  constructor(spawnPad: Pad, newCssID) {
    this._currentPad = spawnPad;
    this._color = spawnPad.playerSpawn;
    this.cssID = newCssID;
  }

  get currentPad(): Pad {
    return this._currentPad;
  }
  set currentPad(a: Pad) {
    this._currentPad = a;
  }
  get color() {
    return this._color;
  }
  set color(a: string) {
    this._color = a;
  }
  get cssID() {
    return this._cssID;
  }
  set cssID(a: string) {
    this._cssID = a;
  }
}
