import { Component } from '@angular/core';

import { PadsService } from '../pads/pads.service';

@Component({
  selector: 'border-area',
  templateUrl: './border-area.component.html',
  styleUrls: ['./border-area.component.css']
})

export class BorderAreaComponent {

  constructor(private _padsService: PadsService) {
  }
}
