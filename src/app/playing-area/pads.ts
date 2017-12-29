// In this file, all different types of tabs are defined as classes. IMPORTANT: There are several calsses in this file, not just one.

export class Pad {
  private _padType: number;
  private _padRotation: number;
  private _isStart: boolean;
  private _isFixed: boolean;
  private _isTreasure: boolean;
  private _treasureName: string;
  private _imgSource: string;

  constructor() {
    this._padType = 0;
    this._padRotation = 0;
    this._isStart = false;
    this._isFixed = false;
    this._isTreasure = false;
    this._imgSource = '../assets/img/37zn4gru.bmp';
  }

  get padType(): number {
    return this._padType;
  }
  set padType(newType: number) {
    this._padType = newType;
  }

  get padRotation(): number {
    return this._padRotation;
  }
  set padRotation(newRotation: number) {
    this._padRotation = newRotation;
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
}

export class IPad extends Pad {
  constructor() {
    super();
  }
}

export class LPad extends Pad {
  constructor() {
    super();
    this.padType = 1;
  }
}

export class TPad extends Pad {
  constructor() {
    super();
    this.padType = 2;
    this.isTreasure = true;
  }
}
