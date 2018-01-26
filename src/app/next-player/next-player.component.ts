import { Component } from '@angular/core';
import { PlayerService } from '../player/player.service';

@Component({

  selector: "next-player",
  templateUrl: "./next-player.component.html",
  styleUrls: ["./next-player.component.css"],
})

export class NextPlayerComponent {

  playerService = null;
  constructor(private _player: PlayerService) {
    this.playerService = _player;
  }
}
