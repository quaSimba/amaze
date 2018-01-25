import { Component } from '@angular/core';
import { PlayerTargetsService } from '../player-targets/player-targets.service'


@Component({
  selector: "restart",
  templateUrl: "./restart.component.html",
  styleUrls: ["./restart.component.css"]
})

export class RestartComponent {

  constructor(private _playerTargetsService:PlayerTargetsService){
  }
}
