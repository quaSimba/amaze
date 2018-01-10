import { Component } from '@angular/core';

import { Pad } from './pads';
import { PadsService } from './pads.service';

@Component({
  selector: 'playing-board',
  providers: [PadsService],
  templateUrl: './playing-board.component.html',
  styleUrls: ['./playing-board.component.css']
})
export class PlayingBoardComponent {
  private _grid: Pad[];
  private _sparePad: Pad;
  constructor(padsService: PadsService) {
    this._grid = padsService.gridRep;
    this._sparePad = padsService.sparePad;
  };
}
