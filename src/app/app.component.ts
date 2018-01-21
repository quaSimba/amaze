import { Component } from '@angular/core';
import { ShuffleService } from './helper-services/shuffle-service';

import { PadsService } from './pads/pads.service';

@Component({
  selector: 'app-root',
  providers: [ShuffleService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'the Labyrinth App';

  constructor() { }
}
