import { Component } from '@angular/core';
import { PlayerService } from './player.service';
import { PadsService } from '../pads/pads.service';
import { TargetAreaService } from '../target-area/target-area.service';

@Component({

  selector: "player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})

export class PlayerComponent {

  targetAreaService = null;
  playerService = null;
  padsService = null;

  constructor(private _player:PlayerService, private _pads: PadsService, private _targetArea: TargetAreaService){
    this.playerService = _player;
    this.padsService = _pads;
    this.targetAreaService = _targetArea;
  }
}
