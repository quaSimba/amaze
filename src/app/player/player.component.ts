import { Component } from '@angular/core';
import { PlayerService } from './player.service';
import { PadsService } from '../pads/pads.service';

@Component({

  selector: "player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})

export class PlayerComponent {

  playerService = null;
  padsService = null;

  constructor(private _player:PlayerService, private _pads: PadsService){
    this.playerService = _player;
    this.padsService = _pads;
  }
}
