import { Component } from '@angular/core';
import { PADS } from './mock-pads';
import { Pad } from './pad';
import { Player } from './player';
import { TargetAreaService } from '../target-area/target-area.service'
import * as $ from 'jquery';



@Component({

  selector: "player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})

export class PlayerComponent {


  playerBlue: Player = new Player(3 , 3, "blue");
  playerRed: Player = new Player(1 , 1, "red");
  playerYellow: Player = new Player(1 , 3, "yellow");
  playerGreen: Player = new Player(3 , 1, "green");
  pads = PADS;
  private _rowDistance ;
  private _colDistance;
  private _currentColor;

  targetAreaService = null;

  constructor(private _targetArea:TargetAreaService){
    this.targetAreaService = _targetArea;
  }

  move(target: Pad){
    switch(this.currentColor){
      case "red":
      this.colDistance = (target.col - this.playerRed.col) * (500/3);
      this.rowDistance = (target.row - this.playerRed.row) * (500/3);

      $("#playerRed").animate({
          left: "+=" + this.colDistance
        });

      $("#playerRed").animate({
          top: "+=" + this.rowDistance
        });

      this.playerRed.row = target.row;
      this.playerRed.col = target.col;

      console.log(target.treasureId);
      console.log(this.targetAreaService.currentTargetOne.id);
      break;

      case "blue":

      this.colDistance = (target.col - this.playerBlue.col) * (500/3);
      this.rowDistance = (target.row - this.playerBlue.row) * (500/3);

      $("#playerBlue").animate({
          left: "+=" + this.colDistance
        });

        $("#playerBlue").animate({
          top: "+=" + this.rowDistance
        });

      this.playerBlue.row = target.row;
      this.playerBlue.col = target.col;
      break;

      case "yellow":

      this.colDistance = (target.col - this.playerYellow.col) * (500/3);
      this.rowDistance = (target.row - this.playerYellow.row) * (500/3);


      $("#playerYellow").animate({
          left: "+=" + this.colDistance
        });

        $("#playerYellow").animate({
          top: "+=" + this.rowDistance
        });

      this.playerYellow.row = target.row;
      this.playerYellow.col = target.col;
      break;

      case "green":

      this.colDistance = (target.col - this.playerGreen.col) * (500/3);
      this.rowDistance = (target.row - this.playerGreen.row) * (500/3);

      $("#playerGreen").animate({
          left: "+=" + this.colDistance
        });

        $("#playerGreen").animate({
          top: "+=" + this.rowDistance
        });

      this.playerGreen.row = target.row;
      this.playerGreen.col = target.col;
      break;
    }
  }
  selectBlue(){
    this.currentColor="blue";
  }
  selectRed(){
    this.currentColor="red";
  }
  selectYellow(){
    this.currentColor="yellow";
  }
  selectGreen(){
    this.currentColor="green";
  }
  reset(){

    this.playerRed.col = 1;
    this.playerRed.row = 1;

    this.playerBlue.col = 3;
    this.playerBlue.row = 3;

    this.playerYellow.col = 3;
    this.playerYellow.row = 1;

    this.playerGreen.col = 1;
    this.playerGreen.row = 3;

    $("#playerRed").css(
        "left", "calc(100%/6 - 25px)"
      );
    $("#playerRed").css(
        "top", "calc(100%/6 - 25px)"
      );

    $("#playerBlue").css(
        "top", "calc(500%/6 - 25px)"
      );
    $("#playerBlue").css(
        "left", "calc(500%/6 - 25px)"
      );

    $("#playerYellow").css(
        "top", "calc(100%/6 - 25px)"
      );
    $("#playerYellow").css(
        "left", "calc(500%/6 - 25px)"
      );

    $("#playerGreen").css(
        "top", "calc(500%/6 - 25px)"
      );
    $("#playerGreen").css(
        "left", "calc(100%/6 - 25px)"
      );

  }

  get rowDistance(){
    return this._rowDistance;
  }
  set rowDistance(a: number){
    this._rowDistance = a;
  }
  get currentColor(){
    return this._currentColor;
  }
  set currentColor(a: string){
    this._currentColor = a;
  }
  get colDistance(){
    return this._colDistance;
  }
  set colDistance(a: number){
    this._colDistance = a;
  }
}
