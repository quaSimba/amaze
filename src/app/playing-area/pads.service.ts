// TODO: Funktionen zur Erstellung der Reihen und Spalten, sowie der fixen Pads schreiben.

import { Injectable } from '@angular/core';

import { Pad, IPad, LPad, TPad } from './pads';

@Injectable()
export class PadsService {
  private _pads: typeof Pad[];

  constructor() {
    this._pads = this.createPads();
  }

  createPads() {
    var tempPads = Array();

    // Create all the Ishaped pads
    for (var i = 0; i < 13; i++) {
      tempPads.push(this.createIPad());
    }

    // Create all the L-shaped pads, some with treasure and others as starting pads
    var lPads = Array();
    for (var i = 0; i < 9; i++) {
      lPads.push(this.createLPad());
    }
    for (var i = 0; i < 6; i++) {
      var lPad = this.createLPad();
      lPad.isTreasure = true;
      lPads.push(lPad);
    }
    for (var i = 0; i < 4; i++) {
      var startPad = this.createLPad();
      startPad.isStart = true;
      startPad.isFixed = true;
      lPads.push(startPad);
    }
    tempPads = tempPads.concat(lPads);

    // Create all the T-shaped pads, some fixed
    var tPads = Array();
    for (var i = 0; i < 6; i++) {
      tPads.push(this.createTPad());
    }
    for (var i = 0; i < 12; i++) {
      var fixedTPad = this.createTPad();
      fixedTPad.isFixed = true;
      tPads.push(fixedTPad);
    }
    tempPads = tempPads.concat(tPads);

    return tempPads;
  }

  createIPad() {
    return new IPad;
  }
  createLPad() {
    return new LPad;
  }
  createTPad() {
    return new TPad;
  }

  get pads(): typeof Pad[] {
    return this._pads;
  }
  set pads(newPads: typeof Pad[]) {
    this._pads = newPads;
  }
}
