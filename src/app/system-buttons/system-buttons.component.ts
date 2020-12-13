import { Component } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { PadsService } from '../pads/pads.service';


@Component({
  selector: "system-buttons",
  templateUrl: "./system-buttons.component.html",
  styleUrls: ["./system-buttons.component.css"]
})

export class SystemButtonsComponent {

  constructor(public _playerService:PlayerService, private _padsService: PadsService){
  }
  help(){
    if(this._padsService.isVisible == false) this._padsService.isVisible = true;
    else this._padsService.isVisible = false;
  }
}
