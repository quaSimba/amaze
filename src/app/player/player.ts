import { Pad } from '../pads/pads';
import { targets } from '../targets/targets'

export class Player {
  private _currentPad;
  private _color;
  private _cssID;
  private _reachablePads: Pad[];
  private _playerTargets: targets[];
  private _currentTarget;

  constructor(spawnPad: Pad, newCssID) {
    this._currentPad = spawnPad;
    this._color = spawnPad.playerSpawn;
    this.cssID = newCssID;
  }

  get currentTarget() {
    return this._currentTarget;
  }
  set currentTarget(a) {
    this._currentTarget = a;
  }
  get playerTargets(): targets[] {
    return this._playerTargets;
  }
  set playerTargets(a: targets[]) {
    this._playerTargets = a;
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
