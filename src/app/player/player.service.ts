import { Injectable } from '@angular/core';
import { Player } from './player';
import * as $ from 'jquery';
import { PlayerTargetsService } from '../player-targets/player-targets.service'
import { PadsService } from '../pads/pads.service';
import { Pad } from '../pads/pads';

@Injectable()
export class PlayerService {

  playerOne: Player = new Player(this._pads.spawns[0], "#playerOne");
  playerTwo: Player = new Player(this._pads.spawns[2], "#playerTwo");
  playerThree: Player = new Player(this._pads.spawns[1], "#playerThree");
  playerFour: Player = new Player(this._pads.spawns[3], "#playerFour");
  players: Player[] = [this.playerOne, this.playerTwo, this.playerThree, this. playerFour];
  private _rowDistance ;
  private _colDistance;
  private _currentPlayer: number;
  private _hasPushed: boolean;
  private _hasMoved: boolean;

  playerTargetsService = null;
  padsService = null;

  constructor(private _playerTargets:PlayerTargetsService, private _pads: PadsService){

    this.hasPushed = false;
    this.hasMoved = false;
    this.currentPlayer = 1;
    this.playerTargetsService = _playerTargets;
    this.padsService = _pads;

  }

  move(target: Pad){

  if(this._hasMoved == false && this._hasPushed == true){
    switch(this.currentPlayer){

      case 1:

      this.colDistance = (target.col - this.playerOne.currentPad.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerOne.currentPad.row) * this.padsService.animDistance;

      this.playerOne.currentPad = target;

      $("#playerOne").animate({
          left: "+=" + this.colDistance
        });

      $("#playerOne").animate({
          top: "+=" + this.rowDistance
        });

      if (this.playerTargetsService.playerOneTargets.length != 0 &&
         target.treasureID == this.playerTargetsService.currentTargetOne.id)
      {
        console.log("Schatz eingesammelt")

        this.playerTargetsService.playerOneTargets.splice(0,1);
        this.playerTargetsService.currentTargetOne = this.playerTargetsService.playerOneTargets[0];
        console.log(this.playerTargetsService.playerOneTargets);
      }
      else if(this.playerTargetsService.playerOneTargets.length == 0
         && target.playerSpawn == "red")
      {
        console.log("Gewonnen")
      }
      break;

      case 2:

      this.colDistance = (target.col - this.playerTwo.currentPad.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerTwo.currentPad.row) * this.padsService.animDistance;

      $("#playerTwo").animate({
          left: "+=" + this.colDistance
        });

        $("#playerTwo").animate({
          top: "+=" + this.rowDistance
        });

        this.playerTwo.currentPad = target

      if (this.playerTargetsService.playerTwoTargets.length != 0 &&
         target.treasureID == this.playerTargetsService.currentTargetTwo.id){
        console.log("Schatz eingesammelt")
        this.playerTargetsService.playerTwoTargets.splice(0,1);
        this.playerTargetsService.currentTargetTwo = this.playerTargetsService.playerTwoTargets[0];
        console.log(this.playerTargetsService.playerTwoTargets);
      }
      else if(this.playerTargetsService.playerTwoTargets.length == 0 && target.playerSpawn == "blue")
      {
        console.log("Gewonnen")
      }
      break;

      case 3:

      this.colDistance = (target.col - this.playerThree.currentPad.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerThree.currentPad.row) * this.padsService.animDistance;


      $("#playerThree").animate({
          left: "+=" + this.colDistance
        });

        $("#playerThree").animate({
          top: "+=" + this.rowDistance
        });

      this.playerThree.currentPad = target;

      if (this.playerTargetsService.playerThreeTargets.length != 0 &&
         target.treasureID == this.playerTargetsService.currentTargetThree.id){
        console.log("Schatz eingesammelt")
        this.playerTargetsService.playerThreeTargets.splice(0,1);
        this.playerTargetsService.currentTargetThree = this.playerTargetsService.playerThreeTargets[0];
        console.log(this.playerTargetsService.playerThreeTargets);
      }
      else if(this.playerTargetsService.playerThreeTargets.length == 0 && target.playerSpawn == "yellow")
      {
        console.log("Gewonnen")
      }
      break;

      case 4:

      this.colDistance = (target.col - this.playerFour.currentPad.col) * this.padsService.animDistance;
      this.rowDistance = (target.row - this.playerFour.currentPad.row) * this.padsService.animDistance;

      $("#playerFour").animate({
          left: "+=" + this.colDistance
        });

        $("#playerFour").animate({
          top: "+=" + this.rowDistance
        });

      this.playerFour.currentPad = target;

      if (this.playerTargetsService.playerFourTargets.length != 0 &&
         target.treasureID == this.playerTargetsService.currentTargetFour.id){
        console.log("Schatz eingesammelt")
        this.playerTargetsService.playerFourTargets.splice(0,1);
        this.playerTargetsService.currentTargetFour = this.playerTargetsService.playerFourTargets[0];
        console.log(this.playerTargetsService.playerFourTargets);
      }
      else if(this.playerTargetsService.playerFourTargets.length == 0 && target.playerSpawn == "green")
      {
        console.log("Gewonnen")
      }
      break;
    }
    this._hasMoved = true;
  }
}

  nextPlayer(){

    if (this.currentPlayer != this.playerTargetsService.playerCount) this._currentPlayer ++;
    else this.currentPlayer = 1;
    this.hasPushed = false;
    this.hasMoved = false;

  }

  pushColDown(currentCol: number){
  for (var i = 0; i < this.players.length; i++){
    if(this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row != 7)
    {
          $(this.players[i].cssID).animate({
          top: "+=" + this.padsService.animDistance
          },500);
    }
    else if(this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row == 7)
    {

          $(this.players[i].cssID).animate({
            top: "-=" + this.padsService.animDistance * 6
          },500);
        if ( currentCol == 2 ) this.players[i].currentPad = this.padsService.padsCol1[0];
        else if ( currentCol == 4 ) this.players[i].currentPad = this.padsService.padsCol2[0];
        else if ( currentCol == 6 ) this.players[i].currentPad = this.padsService.padsCol3[0];
        }
      }
    }
  pushColUp(currentCol: number){
  for (var i = 0; i < this.players.length; i++){
    if(this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row != 1)
    {
          $(this.players[i].cssID).animate({
          top: "-=" + this.padsService.animDistance
          },500);
    }
    else if(this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row == 1)
    {

          $(this.players[i].cssID).animate({
            top: "+=" + this.padsService.animDistance * 6
          },500);
        if ( currentCol == 2 ) this.players[i].currentPad = this.padsService.padsCol1[this.padsService.padsCol1.length - 1];
        else if ( currentCol == 4 ) this.players[i].currentPad = this.padsService.padsCol2[this.padsService.padsCol1.length - 1];
        else if ( currentCol == 6 ) this.players[i].currentPad = this.padsService.padsCol3[this.padsService.padsCol1.length - 1];
        }
      }
  }
  pushRowRight(currentRow: number){
  for (var i = 0; i < this.players.length; i++){
    if(this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col != 7)
    {
          $(this.players[i].cssID).animate({
          left: "+=" + this.padsService.animDistance
          },500);
    }
    else if(this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col == 7)
    {
        $(this.players[i].cssID).animate({
          left: "-=" + this.padsService.animDistance * 6
        },500);

        if ( currentRow == 2 ) this.players[i].currentPad = this.padsService.padsRow1[0];
        else if ( currentRow == 4 ) this.players[i].currentPad = this.padsService.padsRow2[0];
        else if ( currentRow == 6 ) this.players[i].currentPad = this.padsService.padsRow3[0];
        }
      }
  }
  pushRowLeft(currentRow: number){
  for (var i = 0; i < this.players.length; i++){
    if(this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col != 1)
    {
          $(this.players[i].cssID).animate({
          left: "-=" + this.padsService.animDistance
          },500);
    }
    else if(this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col == 1)
    {

          $(this.players[i].cssID).animate({
            left: "+=" + this.padsService.animDistance * 6
          },500);
        if      ( currentRow == 2) this.players[i].currentPad = this.padsService.padsRow1[this.padsService.padsRow1.length - 1];
        else if ( currentRow == 4 ) this.players[i].currentPad = this.padsService.padsRow2[this.padsService.padsRow2.length - 1];
        else if ( currentRow == 6 ) this.players[i].currentPad = this.padsService.padsRow3[this.padsService.padsRow3.length - 1];
        }
      }
  }
  get hasMoved (){
    return this._hasMoved;
  }
  set hasMoved (newHasMoved: boolean){
    this._hasMoved = newHasMoved;
  }
  get hasPushed (){
    return this._hasPushed;
  }
  set hasPushed (newHasPushed: boolean){
    this._hasPushed = newHasPushed;
  }
  get rowDistance(){
    return this._rowDistance;
  }
  set rowDistance(a: number){
    this._rowDistance = a;
  }
  get colDistance(){
    return this._colDistance;
  }
  set colDistance(a: number){
    this._colDistance = a;
  }
  get currentPlayer(){
    return this._currentPlayer;
  }
  set currentPlayer(a: number){
    this._currentPlayer = a;
  }
}
