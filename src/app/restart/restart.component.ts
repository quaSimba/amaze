import { Component } from '@angular/core';
import { PlayerTargetsService } from '../player-targets/player-targets.service';
import { PadsService } from '../pads/pads.service';


@Component({
  selector: "restart",
  templateUrl: "./restart.component.html",
  styleUrls: ["./restart.component.css"]
})

export class RestartComponent {

  constructor(private _playerTargetsService:PlayerTargetsService, private _padsService: PadsService){
  }
  help(){
    if(this._padsService.isVisible == false) this._padsService.isVisible = true;
    else this._padsService.isVisible = false;
  }
}
