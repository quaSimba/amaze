import { Component } from '@angular/core';

import { PadsService } from '../pads/pads.service';
import { PlayerTargetsService } from '../player-targets/player-targets.service'

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'spare-pad-area',
  templateUrl: './spare-pad-area.component.html',
  styleUrls: ['../pads/pads.component.css', './spare-pad-area.component.css']
})
export class SparePadAreaComponent {

  private _isDragged: boolean;

  constructor(private _padsService: PadsService, private _playerTargetsService: PlayerTargetsService) {
  }

  drag(event) {
    $(".spare-pad").css("opacity","0");
    this._padsService.sparePadDragged = true;
  }

  endDrag() {
    setTimeout(function(){
      $(".spare-pad").css("opacity","1")}, 500 );
    this._padsService.sparePadDragged = false;
  }
}
