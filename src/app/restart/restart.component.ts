import { Component } from '@angular/core';

import { PlayerService } from '../player/player.service';

@Component({
  selector: "restart",
  templateUrl: "./restart.component.html",
  styleUrls: ["./restart.component.css"]
})

export class RestartComponent {

  constructor(private _playerService: PlayerService) {
  }
}
