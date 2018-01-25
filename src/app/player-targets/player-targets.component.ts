import { Component } from '@angular/core';

import { PlayerTargetsService } from './player-targets.service'


@Component({
  selector: "player-targets",
  templateUrl: "./player-targets.component.html",
  styleUrls: ["./player-targets.component.css"]
})

export class PlayerTargetsComponent {

  constructor(private _playerTargetsService:PlayerTargetsService){
  }
}
