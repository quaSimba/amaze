// In this file, all different types of tabs are defined as classes. IMPORTANT: There are several calsses in this file, not just one.

export class Pad {
  private _padType: number;
  private _rotationCase: number;
  private _playerSpawn: string;
  private _treasureID: number;
  private _imgSource: string;
  private _row: number;
  private _col: number;

  constructor() {
    this._padType = null
    this._rotationCase = 0;
    this._playerSpawn = null;
    this._treasureID = null;
  }

  get padType(): number {
    return this._padType;
  }
  set padType(newType: number) {
    this._padType = newType;
  }

  get rotationCase(): number {
    return this._rotationCase;
  }
  set rotationCase(newRotationCase: number) {
    this._rotationCase = newRotationCase;
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
}

export class IPad extends Pad {
  constructor() {
    super();
    this.padType = 0;
    this.imgSource = '../assets/img/pads/I-Pad@150px.png';
  }
}

export class LPad extends Pad {
  constructor() {
    super();
    this.padType = 1;
    this.imgSource = '../assets/img/pads/L-Pad@150px.png';
  }
}

export class TPad extends Pad {
  constructor() {
    super();
    this.padType = 2;
    this.treasureID = 0;
    this.imgSource = '../assets/img/pads/T-Pad@150px.png';
  }
}
