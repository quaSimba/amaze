import { Component } from '@angular/core';

import { PadsService } from './pads/pads.service';

@Component({
  selector: 'app-root',
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'the Labyrinth App';

  constructor() { }
}
