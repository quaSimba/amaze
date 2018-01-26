import { Component } from '@angular/core';

import { PadsService } from '../pads/pads.service';
import { PlayerService } from '../player/player.service';

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'spare-pad-area',
  templateUrl: './spare-pad-area.component.html',
  styleUrls: ['../pads/pads.component.css', './spare-pad-area.component.css']
})
export class SparePadAreaComponent {

  private _isDragged: boolean;

  constructor(private _padsService: PadsService, private _playerService: PlayerService) {
  }

  drag(event) {
    this._padsService.sparePadDragged = true;
  }

  endDrag() {
    this._padsService.sparePadDragged = false;
  }
}
