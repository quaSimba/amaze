import { Injectable } from '@angular/core';
import { Player } from './player';
import * as $ from 'jquery';
import { TargetAreaService } from '../target-area/target-area.service'
import { PadsService } from '../pads/pads.service';
import { Pad } from '../pads/pads';

@Injectable()
export class PlayerService {

  playerBlue: Player = new Player( 7, 7, "blue");
  playerRed: Player = new Player(1 , 1, "red");
  playerYellow: Player = new Player(1 , 7, "yellow");
  playerGreen: Player = new Player(7 , 1, "green");
  private _rowDistance ;
  private _colDistance;
  private _currentColor;

  targetAreaService = null;
  padsService = null;

  constructor(private _targetArea:TargetAreaService, private _pads: PadsService){
    this.targetAreaService = _targetArea;
    this.padsService = _pads;

    console.log(_pads.allPads)
  }

  move(target: Pad){
    console.log("move");
    switch(this.currentColor){
      case "red":
      this.colDistance = (target.col - this.playerRed.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerRed.row) * this.padsService.animDistance;

      $("#playerRed").animate({
          left: "+=" + this.colDistance
        });

      $("#playerRed").animate({
          top: "+=" + this.rowDistance
        });

      this.playerRed.row = target.row;
      this.playerRed.col = target.col;

      console.log(target.treasureID);
      console.log(this.targetAreaService.currentTargetOne.id);
      break;

      case "blue":

      this.colDistance = (target.col - this.playerBlue.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerBlue.row) * this.padsService.animDistance;

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

      this.colDistance = (target.col - this.playerYellow.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerYellow.row) * this.padsService.animDistance;


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

      this.colDistance = (target.col - this.playerGreen.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerGreen.row) * this.padsService.animDistance;

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

    this.playerBlue.col = 7;
    this.playerBlue.row = 7;

    this.playerYellow.col = 7;
    this.playerYellow.row = 1;

    this.playerGreen.col = 1;
    this.playerGreen.row = 7;

    $("#playerRed").css(
        "left", "calc(50%/7 - 15px)"
      );
    $("#playerRed").css(
        "top", "calc(50%/7- 15px)"
      );

    $("#playerBlue").css(
        "top", "calc(650%/7 - 15px)"
      );
    $("#playerBlue").css(
        "left", "calc(650%/7 - 15px)"
      );

    $("#playerYellow").css(
        "top", "calc(50%/7 - 15px)"
      );
    $("#playerYellow").css(
        "left", "calc(650%/7 - 15px)"
      );

    $("#playerGreen").css(
        "top", "calc(650%/7 - 15px)"
      );
    $("#playerGreen").css(
        "left", "calc(50%/7 - 15px)"
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
