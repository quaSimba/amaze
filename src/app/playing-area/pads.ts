// In this file, all different types of tabs are defined as classes. IMPORTANT: There are several calsses in this file, not just one.

export class Pad {
  private _padType: number;
  private _rotationCase: number;
  private _isStart: boolean;
  private _isFixed: boolean;
  private _isTreasure: boolean;
  private _treasureName: string;
  private _imgSource: string;
  private _row: number;
  private _col: number;

  constructor() {
    this._rotationCase = 90;
    this._isStart = false;
    this._isFixed = false;
    this._isTreasure = false;
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

  get isStart(): boolean {
    return this._isStart;
  }
  set isStart(isStart: boolean) {
    this._isStart = isStart;
  }

  get isFixed(): boolean {
    return this._isFixed;
  }
  set isFixed(isFixed: boolean) {
    this._isFixed = isFixed;
  }

  get isTreasure(): boolean {
    return this._isTreasure;
  }
  set isTreasure(isTreasure: boolean) {
    this._isTreasure = isTreasure;
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
    this.imgSource = '../assets/img/I-Pad@150px.png';
  }
}

export class LPad extends Pad {
  constructor() {
    super();
    this.padType = 1;
    this.imgSource = '../assets/img/L-Pad@150px.png';
  }
}

export class TPad extends Pad {
  constructor() {
    super();
    this.padType = 2;
    this.isTreasure = true;
    this.imgSource = '../assets/img/T-Pad@150px.png';
  }
}
