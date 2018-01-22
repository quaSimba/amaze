import { Component, OnInit } from '@angular/core';
import { ShuffleService } from './helper-services/shuffle-service';

import { PadsService } from './pads/pads.service';

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-root',
  providers: [ShuffleService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'the Labyrinth App';

  constructor() { }

  ngOnInit() {
  }
}
