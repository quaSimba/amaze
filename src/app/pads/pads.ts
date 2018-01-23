// In this file, all different types of tabs are defined as classes. IMPORTANT: There are several calsses in this file, not just one.

export class Pad {
  private _padType: number;
  private _rotationCase: number;
  private _openDirections: Map<string, boolean>;
  private _playerSpawn: string;
  private _treasureID: number;
  private _imgSource: string;
  private _row: number;
  private _col: number;
  private _reachableForPlayers: Map<string, boolean>;

  constructor() {
    this._padType = null
    this._openDirections = new Map<string, boolean>();
    this._openDirections.set("north", false);
    this._openDirections.set("east", false);
    this._openDirections.set("south", false);
    this._openDirections.set("west", false);
    this._rotationCase = 0;
    this._playerSpawn = null;
    this._treasureID = null;
    this._reachableForPlayers = new Map<string, boolean>();
    this._reachableForPlayers.set("red", false);
    this._reachableForPlayers.set("blue", false);
    this._reachableForPlayers.set("yellow", false);
    this._reachableForPlayers.set("green", false);
  }

  updateOpenDirections() { }

  get padType(): number {
    return this._padType;
  }
  set padType(newType: number) {
    this._padType = newType;
  }

  get rotationCase(): number {
    return this._rotationCase;
  }
  // Leverage setter to also change openDirections on change of rotationCase
  set rotationCase(newRotationCase: number) {
    this._rotationCase = newRotationCase;
    this.updateOpenDirections();
  }

  get openDirections(): Map<string, boolean> {
    return this._openDirections;
  }
  set openDirections(newopenDirections: Map<string, boolean>) {
    this._openDirections = newopenDirections;
  }

  get playerSpawn(): string {
    return this._playerSpawn;
  }
  set playerSpawn(newPlayerSpawn: string) {
    this._playerSpawn = newPlayerSpawn;
  }

  get treasureID(): number {
    return this._treasureID;
  }
  set treasureID(newTreasureID: number) {
    this._treasureID = newTreasureID;
  }

  get imgSource(): string {
    return this._imgSource;
  }
  set imgSource(imgSource: string) {
    this._imgSource = imgSource;
  }

  get row(): number {
    return this._row;
  }
  set row(newRow: number) {
    this._row = newRow;
  }

  get col(): number {
    return this._col;
  }
  set col(newCol: number) {
    this._col = newCol;
  }

  get reachableForPlayers(): Map<string, boolean> {
    return this._reachableForPlayers;
  }
  set reachableForPlayers(newReachable: Map<string, boolean>) {
    this._reachableForPlayers = newReachable;
  }
}

export class IPad extends Pad {
  constructor() {
    super();
    this.padType = 0;
    this.openDirections.set("east", true);
    this.openDirections.set("west", true);
    this.imgSource = '../assets/img/pads/I-Pad@150px.png';
  }

  updateOpenDirections() {
    switch (this.rotationCase) {
      case 0:
      case 2:
        this.openDirections.set("north", false);
        this.openDirections.set("east", true);
        this.openDirections.set("south", false);
        this.openDirections.set("west", true);
        break;
      case 1:
      case 3:
        this.openDirections.set("north", true);
        this.openDirections.set("east", false);
        this.openDirections.set("south", true);
        this.openDirections.set("west", false);
        break;
      default:
        break;
    }
  }
}

export class LPad extends Pad {
  constructor() {
    super();
    this.padType = 1;
    this.openDirections.set("east", true);
    this.openDirections.set("south", true);
    this.imgSource = '../assets/img/pads/L-Pad@150px.png';
  }

  updateOpenDirections() {
    switch (this.rotationCase) {
      case 0:
        this.openDirections.set("north", false);
        this.openDirections.set("east", true);
        this.openDirections.set("south", true);
        this.openDirections.set("west", false);
        break;
      case 1:
        this.openDirections.set("north", false);
        this.openDirections.set("east", false);
        this.openDirections.set("south", true);
        this.openDirections.set("west", true);
        break;
      case 2:
        this.openDirections.set("north", true);
        this.openDirections.set("east", false);
        this.openDirections.set("south", false);
        this.openDirections.set("west", true);
        break;
      case 3:
        this.openDirections.set("north", true);
        this.openDirections.set("east", true);
        this.openDirections.set("south", false);
        this.openDirections.set("west", false);
        break;
      default:
        break;
    }
  }
}

export class TPad extends Pad {
  constructor() {
    super();
    this.padType = 2;
    this.openDirections.set("north", true);
    this.openDirections.set("east", true);
    this.openDirections.set("west", true);
    this.treasureID = 0;
    this.imgSource = '../assets/img/pads/T-Pad@150px.png';
  }
  updateOpenDirections() {
    switch (this.rotationCase) {
      case 0:
        this.openDirections.set("north", true);
        this.openDirections.set("east", true);
        this.openDirections.set("south", false);
        this.openDirections.set("west", true);
        break;
      case 1:
        this.openDirections.set("north", true);
        this.openDirections.set("east", true);
        this.openDirections.set("south", true);
        this.openDirections.set("west", false);
        break;
      case 2:
        this.openDirections.set("north", false);
        this.openDirections.set("east", true);
        this.openDirections.set("south", true);
        this.openDirections.set("west", true);
        break;
      case 3:
        this.openDirections.set("north", true);
        this.openDirections.set("east", false);
        this.openDirections.set("south", true);
        this.openDirections.set("west", true);
        break;
      default:
        break;
    }
  }
}
