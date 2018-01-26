import { Component } from '@angular/core';
import { PlayerTargetsService } from '../player-targets/player-targets.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: "target-area",
  templateUrl: "./target-area.component.html",
  styleUrls: ["./target-area.component.css"]
})

export class TargetAreaComponent{

  constructor(private _playerTargetsService:PlayerTargetsService, private _playerService:PlayerService){

  }

}
