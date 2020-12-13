import { Component } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { PadsService } from '../pads/pads.service';

@Component({
  selector: "success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.css"]
})

export class SuccessComponent{

  constructor(public _playerService:PlayerService, public _padsService:PadsService){

  }

}
