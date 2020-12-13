import { Component, OnInit } from '@angular/core';

import { Pad } from '../pads/pads';
import { PadsService } from '../pads/pads.service';
import { PlayerService } from '../player/player.service';

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'playing-board',
  templateUrl: './playing-board.component.html',
  styleUrls: ['../pads/pads.component.css', './playing-board.component.css']
})
export class PlayingBoardComponent implements OnInit {

  constructor(public _padsService: PadsService, private _playerService: PlayerService){
  }

  ngOnInit() {
    this._padsService.animDistance = $(".playing-board").height() / 7;
  }
}
