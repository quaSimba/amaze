import { Component } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { PlayerTargetsService } from '../player-targets/player-targets.service';

@Component({

  selector: "next-player",
  templateUrl: "./next-player.component.html",
  styleUrls: ["./next-player.component.css"],
})

export class NextPlayerComponent {

  targetAreaService = null;
  playerTargetsService = null;
  playerService = null;
  constructor(private _player:PlayerService, private _playerTargets: PlayerTargetsService){
    this.playerService = _player;
    this.playerTargetsService = _playerTargets;
  }
}
