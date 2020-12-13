import { Component } from '@angular/core';

import { PlayerService } from '../player/player.service'


@Component({
  selector: "player-targets",
  templateUrl: "./player-targets.component.html",
  styleUrls: ["./player-targets.component.css"]
})

export class PlayerTargetsComponent {

  constructor(public _playerService: PlayerService) {
  }
}
