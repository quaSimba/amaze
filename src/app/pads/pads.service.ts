import { Injectable } from '@angular/core';

import { Pad, IPad, LPad, TPad } from './pads';
import { TARGETS } from '../targets/mock-targets';
import { ShuffleService } from '../helper-services/shuffle-service';

declare var $: any;
declare var jquery: any;

@Injectable()
export class PadsService {
  private _spawns: LPad[];
  private _allPads: Pad[];
  private _fixedPads: Pad[];
  private _loosePads: Pad[];
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
  private _sparePadDragged: boolean;
  private _sparePadDropped: boolean;
  private _animDistance: number;
  private _animDuration: number;
  private _isMoving: boolean;
  private _isVisible: boolean;

  constructor(private _shuffleService: ShuffleService) {
    this._fixedPads = this.createFixedPads();
    this._loosePads = this.createLoosePads();
    this._allPads = this._fixedPads.concat(this._loosePads); //.slice(0,49);
    this._padsRow1 = [];
    this._padsRow2 = [];
    this._padsRow3 = [];
    this._padsCol1 = [];
    this._padsCol2 = [];
    this._padsCol3 = [];
    this.createGrid(7);
    this._sparePadDropped = false;
    this._animDuration = 500;
    this._isMoving = false;
    this._isVisible = false;
  }

  // Create all the pads that are fix on the board.
  createFixedPads(): Pad[] {
    let tempPads: Pad[] = [];

    // Create all spawns
    this._spawns = [new LPad, new LPad, new LPad, new LPad];
    this._spawns[0].playerSpawn = "red";
    this._spawns[0].imgSource = "././assets/img/pads/spawn-red@150px.png";
    this._spawns[1].playerSpawn = "blue";
    this._spawns[1].imgSource = "././assets/img/pads/spawn-blue@150px.png";
    this._spawns[1].rotationCase = 2;
    this._spawns[2].playerSpawn = "yellow";
    this._spawns[2].imgSource = "././assets/img/pads/spawn-yellow@150px.png";
    this._spawns[2].rotationCase = 1;
    this._spawns[3].playerSpawn = "green";
    this._spawns[3].imgSource = "././assets/img/pads/spawn-green@150px.png";
    this._spawns[3].rotationCase = 3;

    // Create all treasure pads
    let fixedTreasure: TPad[] = [new TPad, new TPad, new TPad, new TPad, new TPad, new TPad, new TPad, new TPad, new TPad, new TPad, new TPad, new TPad];
    fixedTreasure.forEach((treasure, index) => {
      if (index < 3) {
        return;
      } else if (index < 6) {
        treasure.rotationCase = 1;
      } else if (index < 9) {
        treasure.rotationCase = 2;
      } else if (index < 12) {
        treasure.rotationCase = 3;
      }
    });

    tempPads = [this._spawns[0], fixedTreasure[6], fixedTreasure[7], this._spawns[2], fixedTreasure[3], fixedTreasure[4], fixedTreasure[8], fixedTreasure[9], fixedTreasure[5], fixedTreasure[0], fixedTreasure[10], fixedTreasure[11], this._spawns[3], fixedTreasure[1], fixedTreasure[2], this._spawns[1]];

    // Assign the proper treasureID (see targets/mock-targets.ts) to each treasure and set the row and col
    let treasureID = 0;
    tempPads.forEach((pad, index) => {
      if (pad instanceof TPad) {
        pad.treasureID = treasureID;
        pad.imgSource = TARGETS.filter((pad, key) => {
          return pad.id === treasureID;
        })[0].padPath;
        treasureID++;
      };
      if (index < 4) {
        pad.row = 1;
        pad.col = index * 2 + 1;
      } else if (index < 8) {
        pad.row = 3;
        pad.col = (index - 4) * 2 + 1;
      } else if (index < 12) {
        pad.row = 5;
        pad.col = (index - 8) * 2 + 1;
      } else if (index < 16) {
        pad.row = 7;
        pad.col = (index - 12) * 2 + 1;
      }
    });

    return tempPads;
  }

  // Create all pads that are loose.
  createLoosePads(): Pad[] {
    let tempPads: Pad[] = [];

    // Create all the I-shaped pads
    for (var i = 0; i < 13; i++) {
      tempPads.push(new IPad);
    }

    // Create all the T-shaped pads
    var tPads: Pad[] = [];
    for (var i = 0; i < 6; i++) {
      let tPad = new TPad;
      tPad.treasureID = 12 + i;
      tPad.imgSource = TARGETS[12 + i].padPath;
      tPads.push(tPad);
    }
    tempPads = tempPads.concat(tPads);

    // Create all the L-shaped pads, some with treasure
    var lPads: Pad[] = [];
    for (var i = 0; i < 9; i++) {
      lPads.push(new LPad);
    }
    for (var i = 0; i < 6; i++) {
      let lPad = new LPad;
      lPad.treasureID = 18 + i;
      lPad.imgSource = TARGETS[18 + i].padPath;
      lPads.push(lPad);
    }
    tempPads = tempPads.concat(lPads);

    // Shuffle pads and their rotation
    this._shuffleService.shuffle(tempPads)
    tempPads.forEach((pad, index) => {
      pad.rotationCase = Math.floor(Math.random() * 4);
    })
    return tempPads;
  }

  createGrid(length: number) {
    this._padsRow1 = this._loosePads.splice(0, length);
    this._padsRow2 = this._loosePads.splice(0, length);
    this._padsRow3 = this._loosePads.splice(0, length);
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
    this._sparePad = this._loosePads.splice(0, 1)[0];
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
    return [this._loosePads.splice(0, 1)[0], this._padsRow1[index], this._loosePads.splice(0, 1)[0], this._padsRow2[index], this._loosePads.splice(0, 1)[0], this._padsRow3[index], this._loosePads.splice(0, 1)[0]];
  }

  insertSparePad(targetRow: number, targetCol: number) {
    this.sparePadDropped = true;
    this.sparePad.row = targetRow;
    this.sparePad.col = targetCol;
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
        // Set the sparePadDropped false (since it might be set to true in  border-area.component) to render the <spare-pad> invisible
        this._sparePadDropped = false;
        this._sparePadDragged = false;
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
        // Set the sparePadDropped false (since it might be set to true in  border-area.component) to render the <spare-pad> invisible
        this._sparePadDropped = false;
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
        // Set the sparePadDropped false (since it might be set to true in  border-area.component) to render the <spare-pad> invisible
        this._sparePadDropped = false;
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
        // Set the sparePadDropped false (since it might be set to true in  border-area.component) to render the <spare-pad> invisible
        this._sparePadDropped = false;
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
    setTimeout(() => {
      $("." + row + ", .spare-pad").animate({ left: distance }, this._animDuration);
    }, 0);
  }

  moveCol(col: string, distance: string) {
    setTimeout(() => {
      $("." + col + ", .spare-pad").animate({ top: distance }, this._animDuration);
    }, 0);
  }

  createSparePad(newSparePad: Pad): Pad {
    newSparePad.col = undefined;
    newSparePad.row = undefined;
    return newSparePad;
  }

  rotatePad(pad: Pad) {
    if (pad.rotationCase < 3) {
      pad.rotationCase++;
    } else {
      pad.rotationCase = 0;
    }
  }

  resetReachableForPlayers() {
    this._allPads.forEach((pad, index) => {
      pad.reachableForPlayers.forEach((value, key) => {
        pad.reachableForPlayers.set(key, false);
      })
      pad.openNeighbors.forEach((value, key) => {
        pad.openNeighbors.set(key, null);
      })
    });
  }

  get spawns(): LPad[] {
    return this._spawns;
  }
  set spawns(newSpawns: LPad[]) {
    this._spawns = newSpawns;
  }
  get allPads(): Pad[] {
    return this._allPads;
  }
  set allPads(newAllPads: Pad[]) {
    this._allPads = newAllPads;
  }
  get loosePads(): Pad[] {
    return this._loosePads;
  }
  set loosePads(newLoosePads: Pad[]) {
    this._loosePads = newLoosePads;
  }
  get fixedPads(): Pad[] {
    return this._fixedPads;
  }
  set fixedPads(newFixedPads: Pad[]) {
    this._fixedPads = newFixedPads;
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

  get sparePadDragged(): boolean {
    return this._sparePadDragged;
  }
  set sparePadDragged(isDragged: boolean) {
    this._sparePadDragged = isDragged;
  }

  get sparePadDropped(): boolean {
    return this._sparePadDropped;
  }
  set sparePadDropped(isDropped: boolean) {
    this._sparePadDropped = isDropped;
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

  get isMoving(): boolean {
    return this._isMoving;
  }
  set isMoving(isMoving: boolean) {
    this._isMoving = isMoving;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }
  set isVisible(isMoving: boolean) {
    this._isVisible = isMoving;
  }
}
