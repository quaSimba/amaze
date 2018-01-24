import { Component } from '@angular/core';
import { ShuffleService } from '../helper-services/shuffle-service';
import { TARGETS } from '../targets/mock-targets';
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
