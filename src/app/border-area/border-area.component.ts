import { Component, OnInit } from '@angular/core';

import { Pad } from '../pads/pads';
import { PadsService } from '../pads/pads.service';

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'border-area',
  templateUrl: './border-area.component.html',
  styleUrls: ['../pads/pads.component.css', './border-area.component.css']
})

export class BorderAreaComponent {

  private _pia1: boolean;
  private _pia2: boolean;
  private _pia3: boolean;
  private _pia4: boolean;
  private _pia5: boolean;
  private _pia6: boolean;
  private _pia7: boolean;
  private _pia8: boolean;
  private _pia9: boolean;
  private _pia10: boolean;
  private _pia11: boolean;
  private _pia12: boolean;

  constructor(private _padsService: PadsService) {
    this._pia1 = true;
    this._pia2 = true;
    this._pia3 = true;
    this._pia4 = true;
    this._pia5 = true;
    this._pia6 = true;
    this._pia7 = true;
    this._pia8 = true;
    this._pia9 = true;
    this._pia10 = true;
    this._pia11 = true;
    this._pia12 = true;
  }

  enableDrop(event) {
    event.preventDefault();
  }

  prepareDrop() {
    this._padsService.sparePadDragged = false;
    this._pia1 = true;
    this._pia2 = true;
    this._pia3 = true;
    this._pia4 = true;
    this._pia5 = true;
    this._pia6 = true;
    this._pia7 = true;
    this._pia8 = true;
    this._pia9 = true;
    this._pia10 = true;
    this._pia11 = true;
    this._pia12 = true;
  }

  dropAbove1(event) {
    event.preventDefault();
    this.prepareDrop();
    let counterpart = "#pia-7";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(0, 2);
    this._padsService.pushColDown(this._padsService.padsCol1);
    this._pia7 = false;
    this.disableInsertionArea(counterpart);
  }

  dropAbove2(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-8";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(0, 4);
    this._padsService.pushColDown(this._padsService.padsCol2);
    this.disableInsertionArea(counterpart);
    this._pia8 = false;
    this.disableInsertionArea(counterpart);
  }

  dropAbove3(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-9";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(0, 6);
    this._padsService.pushColDown(this._padsService.padsCol3);
    this._pia9 = false;
    this.disableInsertionArea(counterpart);
  }

  dropRight1(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-10";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(2, 8);
    this._padsService.pushRowLeft(this._padsService.padsRow1);
    this._pia10 = false;
    this.disableInsertionArea(counterpart);
  }

  dropRight2(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-11";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(4, 8);
    this._padsService.pushRowLeft(this._padsService.padsRow2);
    this._pia11 = false;
    this.disableInsertionArea(counterpart);
  }

  dropRight3(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-12";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(6, 8);
    this._padsService.pushRowLeft(this._padsService.padsRow3);
    this._pia12 = false;
    this.disableInsertionArea(counterpart);
  }

  dropBeneath1(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-1";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(8, 2);
    this._padsService.pushColUp(this._padsService.padsCol1);
    this._pia8 = false;
    setTimeout(() => {
      this._pia1 = false;
    }, this._padsService.animDuration)
  }

  dropBeneath2(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-2";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(8, 4);
    this._padsService.pushColUp(this._padsService.padsCol2);
    this._pia2 = false;
    this.disableInsertionArea(counterpart);
  }

  dropBeneath3(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-3";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(8, 6);
    this._padsService.pushColUp(this._padsService.padsCol3);
    this._pia3 = false;
    this.disableInsertionArea(counterpart);
  }

  dropLeft1(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-4";
    $(counterpart).addClass("hide");
    $(counterpart).off("dragover");
    this._padsService.insertSparePad(2, 0);
    this._padsService.pushRowRight(this._padsService.padsRow1);
    this._pia4 = false;
    this.disableInsertionArea(counterpart);
  }

  dropLeft2(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-5";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(4, 0);
    this._padsService.pushRowRight(this._padsService.padsRow2);
    this._pia5 = false;
    this.disableInsertionArea(counterpart);
  }

  dropLeft3(event) {
    event.preventDefault();
    this.prepareDrop();
    this._padsService.sparePadDragged = false;
    let counterpart = "#pia-6";
    $(counterpart).addClass("hide");
    this._padsService.insertSparePad(6, 0);
    this._padsService.pushRowRight(this._padsService.padsRow3);
    this._pia6 = false;
    this.disableInsertionArea(counterpart);
  }

  disableInsertionArea(insertionAreaSelector: string) {
    setTimeout(() => {
      $(insertionAreaSelector).removeClass("hide");
    }, this._padsService.animDuration)
  }

  ngOnInit() {
  }
}
