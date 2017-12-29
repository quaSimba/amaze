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
  private padList: typeof Pad[];
  constructor(padsService: PadsService) {
    this.padList = padsService.pads;
    console.log(this.padList);
  };
}
