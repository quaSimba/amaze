// TODO: Funktionen zur Erstellung der fixen Pads schreiben.

import { Injectable } from '@angular/core';

import { Pad, IPad, LPad, TPad } from './pads';

declare var $: any;
declare var jquery: any;

@Injectable()
export class PadsService {
  private _pads: Pad[];
  private _padsRow1: Pad[];
  private _padsRow2: Pad[];
  private _padsRow3: Pad[];
  private _padsCol1: Pad[];
  private _padsCol2: Pad[];
  private _padsCol3: Pad[];
  private _padsRowList: Array<Pad[]>;
  private _padsColList: Array<Pad[]>;
  private _gridRep: Pad[];
  private _sparePad: Pad;
  private _animDistance: number;
  private _animDuration: number;
  private _isMoving: boolean;

  constructor() {
    this._pads = this.createPads();
    this._padsRow1 = [];
    this._padsRow2 = [];
    this._padsRow3 = [];
    this._padsCol1 = [];
    this._padsCol2 = [];
    this._padsCol3 = [];
    this.createGrid(7);
    this._animDuration = 500;
    this._isMoving = false;
  }

  createPads(): Pad[] {
    let tempPads = Array();

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
    this._padsRowList = [
      this._padsRow1,
      this._padsRow2,
      this._padsRow3
    ]
    this._padsCol1 = this.createColumn(1);
    this._padsCol2 = this.createColumn(2);
    this._padsCol3 = this.createColumn(3);
    this._padsColList = [
      this._padsCol1,
      this._padsCol2,
      this._padsCol3
    ]
    this._sparePad = this._pads.splice(0, 1)[0];
    this.updateGridRepresentation();
  }

  updateGridRepresentation() {
    this._gridRep = [];
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
    this._gridRep.push(this._padsCol2[6]);
    this._gridRep.push(this._padsCol3[6]);

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
    let index = columnNumber + (columnNumber - 1);
    return [this._pads.splice(0, 1)[0], this._padsRow1[index], this._pads.splice(0, 1)[0], this._padsRow2[index], this._pads.splice(0, 1)[0], this._padsRow3[index], this._pads.splice(0, 1)[0]];
  }

  pushRowRight(row: Pad[]) {
    if (!this._isMoving) {
      this._isMoving = true;

      let movingRow = row;
      // Insert the sparePad at the start of the movingRow and move the row.
      movingRow.splice(0, 0, this._sparePad);
      this.moveRow("row" + movingRow[4].row, "+=" + this._animDistance);

      // Declare the last item in movingRow the new sparePad with a delay
      setTimeout(() => {
        this._sparePad = this.createSparePad(movingRow.splice(movingRow.length - 1, 1)[0]);
        this.updateCrossedCols(movingRow);
        this.updateGridRepresentation();
        this._isMoving = false;
      }, this._animDuration);
    }
  }

  pushRowLeft(row: Pad[]) {
    if (!this._isMoving) {
      this._isMoving = true;

      let movingRow = row;
      // Insert the sparePad at the end of the movingRow and move the row.
      movingRow.splice(movingRow.length, 0, this._sparePad);
      this.moveRow("row" + movingRow[4].row, "-=" + this._animDistance);

      // Declare the first item in movingRow the new sparePad with a delay
      setTimeout(() => {
        this._sparePad = this.createSparePad(movingRow.splice(0, 1)[0]);
        this.updateCrossedCols(movingRow);
        this.updateGridRepresentation();
        this._isMoving = false;
      }, this._animDuration);
    }
  }

  pushColUp(col: Pad[]) {
    if (!this._isMoving) {
      this._isMoving = true;

      let movingCol = col;
      // Insert the sparePad at the end of the movingCol and  move the column.
      movingCol.splice(movingCol.length, 0, this._sparePad);
      this.moveCol("col" + movingCol[4].col, "-=" + this._animDistance);

      // Declare the first item in movingCol the new sparePad with a delay
      setTimeout(() => {
        this._sparePad = this.createSparePad(movingCol.splice(0, 1)[0]);
        this.updateCrossedRows(movingCol);
        this.updateGridRepresentation();
        this._isMoving = false;
      }, this._animDuration);
    }
  }

  pushColDown(col: Pad[]) {
    if (!this._isMoving) {
      this._isMoving = true;

      let movingCol = col;
      // Insert the sparePad at the start of the movingCol and  move the column.
      movingCol.splice(0, 0, this._sparePad);
      this.moveCol("col" + movingCol[4].col, "+=" + this._animDistance);

      // Declare the last item in movingCol the new sparePad with a delay
      setTimeout(() => {
        this._sparePad = this.createSparePad(movingCol.splice(movingCol.length - 1, 1)[0]);
        this.updateCrossedRows(movingCol);
        this.updateGridRepresentation();
        this._isMoving = false;
      }, this._animDuration);
    }
  }

  updateCrossedCols(movingRow: Pad[]) {
    let index = this._padsRowList.indexOf(movingRow);
    index += index + 1;
    for (var i = 1; i < movingRow.length; i += 2) {
      this._padsCol1[index] = movingRow[1];
      this._padsCol2[index] = movingRow[3];
      this._padsCol3[index] = movingRow[5];
    }
  }

  updateCrossedRows(movingCol: Pad[]) {
    let index = this._padsColList.indexOf(movingCol);
    index += index + 1;
    for (var i = 1; i < movingCol.length; i += 2) {
      this._padsRow1[index] = movingCol[1];
      this._padsRow2[index] = movingCol[3];
      this._padsRow3[index] = movingCol[5];
    }
  }

  moveRow(row: string, distance: string) {
    $("." + row + "," + " .sparePad").animate({ left: distance }, this._animDuration);
  }

  moveCol(col: string, distance: string) {
    $("." + col + "," + " .sparePad").animate({ top: distance }, this._animDuration);
  }

  createSparePad(newSparePad: Pad): Pad {
    newSparePad.col = undefined;
    newSparePad.row = undefined;
    return newSparePad;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    return this._padsRow2;
  }
  set padsRow2(newPadsRow: Pad[]) {
    this._padsRow2 = newPadsRow;
  }

  get padsRow3(): Pad[] {
    return this._padsRow3;
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
    return this._padsCol2;
  }
  set padsCol2(newPadsCol: Pad[]) {
    this._padsCol2 = newPadsCol;
  }

  get padsCol3(): Pad[] {
    return this._padsCol3;
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

  get animDistance(): number {
    return this._animDistance;
  }
  set animDistance(newAnimDistance: number) {
    this._animDistance = newAnimDistance;
  }

  get animDuration(): number {
    return this._animDuration;
  }
  set animDuration(newAnimDuration: number) {
    this._animDuration = newAnimDuration;
  }
}
