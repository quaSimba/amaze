import { Component } from '@angular/core';
import { PlayerService } from './player.service';
import { PadsService } from '../pads/pads.service';
import { PlayerTargetsService } from '../player-targets/player-targets.service'

@Component({

  selector: "player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})

export class PlayerComponent {

  playerTargetsService = null;
  playerService = null;
  padsService = null;

  constructor(private _player:PlayerService, private _pads: PadsService, private _playerTargets: PlayerTargetsService){
    this.playerService = _player;
    this.padsService = _pads;
    this.playerTargetsService = _playerTargets;
  }
}
