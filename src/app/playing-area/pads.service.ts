// TODO: Funktionen zur Erstellung der Reihen und Spalten, sowie der fixen Pads schreiben.

import { Injectable } from '@angular/core';

import { Pad, IPad, LPad, TPad } from './pads';

@Injectable()
export class PadsService {
  private _pads: Pad[];
  private _padsRow1: Pad[];
  private _padsRow2: Pad[];
  private _padsRow3: Pad[];
  private _padsCol1: Pad[];
  private _padsCol2: Pad[];
  private _padsCol3: Pad[];
  private _gridRep: Pad[];
  private _sparePad: Pad;

  constructor() {
    this._pads = this.createPads();
    this._padsRow1 = [];
    this._padsRow2 = [];
    this._padsRow3 = [];
    this._padsCol1 = [];
    this._padsCol2 = [];
    this._padsCol3 = [];
    this._gridRep = [];
    this.createGrid(7);
  }

  createPads(): Pad[] {
    var tempPads = Array();

    // Create all the I-shaped pads
    for (var i = 0; i < 13; i++) {
      tempPads.push(new IPad);
    }

    // Create all the L-shaped pads, some with treasure
    var lPads = Array();
    for (var i = 0; i < 9; i++) {
      lPads.push(new LPad);
    }
    for (var i = 0; i < 6; i++) {
      var lPad = new LPad;
      lPad.isTreasure = true;
      lPads.push(lPad);
    }
    tempPads = tempPads.concat(lPads);

    // Create all the T-shaped pads
    var tPads = Array();
    for (var i = 0; i < 6; i++) {
      tPads.push(new TPad);
    }
    tempPads = tempPads.concat(tPads);

    return tempPads;
  }

  createGrid(length: number) {
    this._padsRow1 = this._pads.splice(0, length);
    this._padsRow2 = this._pads.splice(0, length);
    this._padsRow3 = this._pads.splice(0, length);
    this._padsCol1 = this.createColumn(1);
    this._padsCol2 = this.createColumn(2);
    this._padsCol3 = this.createColumn(3);
    this.updateGridRepresentation();
    this._sparePad = this._pads.splice(0, 1)[0];
  }

  updateGridRepresentation() {
    this._gridRep.push(this._padsCol1[0]);
    this._gridRep.push(this._padsCol2[0]);
    this._gridRep.push(this._padsCol3[0]);
    this._gridRep = this._gridRep.concat(this._padsRow1);
    this._gridRep.push(this._padsCol1[2]);
    this._gridRep.push(this._padsCol2[2]);
    this._gridRep.push(this._padsCol3[2]);
    this._gridRep = this._gridRep.concat(this._padsRow2);
    this._gridRep.push(this._padsCol1[4]);
    this._gridRep.push(this._padsCol2[4]);
    this._gridRep.push(this._padsCol3[4]);
    this._gridRep = this._gridRep.concat(this._padsRow3);
    this._gridRep.push(this._padsCol1[6]);
    this._gridRep.push(this._padsCol3[6]);
    this._gridRep.push(this._padsCol2[6]);

    this._gridRep.forEach((pad, index) => {
      if (index < 3) {
        pad.row = 1;
        pad.col = (index + 1) * 2;
      } else if ((3 <= index) && (index < 10)) {
        pad.row = 2;
        pad.col = index - 2;
      } else if ((10 <= index) && (index < 13)) {
        pad.row = 3;
        pad.col = (index - 9) * 2;
      } else if ((13 <= index) && (index < 20)) {
        pad.row = 4;
        pad.col = (index - 12);
      } else if ((20 <= index) && (index < 23)) {
        pad.row = 5;
        pad.col = (index - 19) * 2;
      } else if ((23 <= index) && (index < 30)) {
        pad.row = 6;
        pad.col = (index - 22);
      } else if ((30 <= index) && (index < 33)) {
        pad.row = 7;
        pad.col = (index - 29) * 2;
      }
    });
  }

  createColumn(columnNumber: number): Pad[] {
    return [this._pads.splice(1, 1)[0], this._padsRow1[columnNumber], this._pads.splice(1, 1)[0], this._padsRow2[columnNumber], this._pads.splice(1, 1)[0], this._padsRow3[columnNumber], this._pads.splice(1, 1)[0]];
  }

  get pads(): Pad[] {
    return this._pads;
  }
  set pads(newPads: Pad[]) {
    this._pads = newPads;
  }

  get padsRow1(): Pad[] {
    return this._padsRow1;
  }
  set padsRow1(newPadsRow: Pad[]) {
    this._padsRow1 = newPadsRow;
  }

  get padsRow2(): Pad[] {
    return this._padsRow1;
  }
  set padsRow2(newPadsRow: Pad[]) {
    this._padsRow2 = newPadsRow;
  }

  get padsRow3(): Pad[] {
    return this._padsRow1;
  }
  set padsRow3(newPadsRow: Pad[]) {
    this._padsRow3 = newPadsRow;
  }

  get padsCol1(): Pad[] {
    return this._padsCol1;
  }
  set padsCol1(newPadsCol: Pad[]) {
    this._padsCol1 = newPadsCol;
  }

  get padsCol2(): Pad[] {
    return this._padsRow1;
  }
  set padsCol2(newPadsCol: Pad[]) {
    this._padsCol2 = newPadsCol;
  }

  get padsCol3(): Pad[] {
    return this._padsCol1;
  }
  set padsCol3(newPadsCol: Pad[]) {
    this._padsCol3 = newPadsCol;
  }

  get gridRep(): Pad[] {
    return this._gridRep;
  }
  set gridRep(newGridRep: Pad[]) {
    this._gridRep = newGridRep;
  }

  get sparePad(): Pad {
    return this._sparePad;
  }
  set sparePad(newSparePad) {
    this._sparePad = newSparePad;
  }
}
