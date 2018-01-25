import { Injectable } from '@angular/core';
import { Player } from './player';
import * as $ from 'jquery';
import { TargetAreaService } from '../target-area/target-area.service';
import { PadsService } from '../pads/pads.service';
import { Pad } from '../pads/pads';
import { PathFinderService } from '../path-finder/path-finder.service';

@Injectable()
export class PlayerService {

  playerOne: Player = new Player(this._pads.spawns[0], "#playerOne");
  playerTwo: Player = new Player(this._pads.spawns[2], "#playerTwo");
  playerThree: Player = new Player(this._pads.spawns[1], "#playerThree");
  playerFour: Player = new Player(this._pads.spawns[3], "#playerFour");
  players: Player[] = [this.playerOne, this.playerTwo, this.playerThree, this.playerFour];
  private _rowDistance;
  private _colDistance;
  private _currentColor;
  private _isMoving;

  targetAreaService = null;
  padsService = null;

  constructor(private _targetArea: TargetAreaService, private _pads: PadsService, private _pathFinderService: PathFinderService) {

    this._isMoving = false;
    this.targetAreaService = _targetArea;
    this.padsService = _pads;

    this._pathFinderService.updateReachablePads(this.players);
  }


  showLocation() {
    console.log("Row: " + this.playerOne.currentPad.row);
    console.log("Column: " + this.playerOne.currentPad.col);
  }

  tempMethod(destination: Pad) {

    if ((!destination.reachableForPlayers.get(this._currentColor)) || destination === this.playerOne.currentPad) {
      return;
    }
    this._pathFinderService.path = [];
    this._pathFinderService.findPath(this.playerOne.currentPad, destination);
    this._pathFinderService.path.forEach((pad) => {
      if ((pad !== null) && (pad !== this.playerOne.currentPad))
        this.move(pad);
    })
  }

  move(destination: Pad) {

    switch (this.currentColor) {

      case "red":

        this.colDistance = (destination.col - this.playerOne.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerOne.currentPad.row) * this.padsService.animDistance;

        this.playerOne.currentPad = destination;

        $("#playerOne").animate({
          left: "+=" + this.colDistance
        }, 200, "linear");

        $("#playerOne").animate({
          top: "+=" + this.rowDistance
        }, 200, "linear");

        if (this.targetAreaService.playerOneTargets.length != 0 &&
          destination.treasureID == this.targetAreaService.currentTargetOne.id) {
          console.log("Schatz eingesammelt")

          this.targetAreaService.playerOneTargets.splice(0, 1);
          this.targetAreaService.currentTargetOne = this.targetAreaService.playerOneTargets[0];
          console.log(this.targetAreaService.playerOneTargets);
        }
        else if (this.targetAreaService.playerOneTargets.length == 0
          && destination.playerSpawn == "red") {
          console.log("Gewonnen")
        }
        break;

      case "blue":

        this.colDistance = (destination.col - this.playerTwo.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerTwo.currentPad.row) * this.padsService.animDistance;

        $("#playerTwo").animate({
          left: "+=" + this.colDistance
        }, 200, "linear");

        $("#playerTwo").animate({
          top: "+=" + this.rowDistance
        }, 200, "linear");

        this.playerTwo.currentPad = destination

        if (this.targetAreaService.playerTwoTargets.length != 0 &&
          destination.treasureID == this.targetAreaService.currentTargetTwo.id) {
          console.log("Schatz eingesammelt")
          this.targetAreaService.playerTwoTargets.splice(0, 1);
          this.targetAreaService.currentTargetTwo = this.targetAreaService.playerTwoTargets[0];
          console.log(this.targetAreaService.playerTwoTargets);
        }
        else if (this.targetAreaService.playerTwoTargets.length == 0 && destination.playerSpawn == "blue") {
          console.log("Gewonnen")
        }
        break;

      case "yellow":

        this.colDistance = (destination.col - this.playerThree.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerThree.currentPad.row) * this.padsService.animDistance;


        $("#playerThree").animate({
          left: "+=" + this.colDistance
        }, 200, "linear");

        $("#playerThree").animate({
          top: "+=" + this.rowDistance
        }, 200, "linear");

        this.playerThree.currentPad = destination;

        if (this.targetAreaService.playerThreeTargets.length != 0 &&
          destination.treasureID == this.targetAreaService.currentTargetThree.id) {
          console.log("Schatz eingesammelt")
          this.targetAreaService.playerThreeTargets.splice(0, 1);
          this.targetAreaService.currentTargetThree = this.targetAreaService.playerThreeTargets[0];
          console.log(this.targetAreaService.playerThreeTargets);
        }
        else if (this.targetAreaService.playerThreeTargets.length == 0 && destination.playerSpawn == "yellow") {
          console.log("Gewonnen")
        }
        break;

      case "green":

        this.colDistance = (destination.col - this.playerFour.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerFour.currentPad.row) * this.padsService.animDistance;

        $("#playerFour").animate({
          left: "+=" + this.colDistance
        }, 200, "linear");

        $("#playerFour").animate({
          top: "+=" + this.rowDistance
        }, 200, "linear");

        this.playerFour.currentPad = destination;

        if (this.targetAreaService.playerFourTargets.length != 0 &&
          destination.treasureID == this.targetAreaService.currentTargetFour.id) {
          console.log("Schatz eingesammelt")
          this.targetAreaService.playerFourTargets.splice(0, 1);
          this.targetAreaService.currentTargetFour = this.targetAreaService.playerFourTargets[0];
          console.log(this.targetAreaService.playerFourTargets);
        }
        else if (this.targetAreaService.playerFourTargets.length == 0 && destination.playerSpawn == "green") {
          console.log("Gewonnen")
        }
        break;
    }
  }

  selectRed() {
    this.currentColor = this.playerOne.color;
  }
  selectBlue() {
    this.currentColor = this.playerTwo.color;
  }
  selectYellow() {
    this.currentColor = this.playerThree.color;
  }
  selectGreen() {
    this.currentColor = this.playerFour.color;
  }

  pushColDown(currentCol: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row != 7) {
        $(this.players[i].cssID).animate({
          top: "+=" + this.padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row == 7) {

        $(this.players[i].cssID).animate({
          top: "-=" + this.padsService.animDistance * 6
        }, 500);
        if (currentCol == 2) this.players[i].currentPad = this.padsService.padsCol1[0];
        else if (currentCol == 4) this.players[i].currentPad = this.padsService.padsCol2[0];
        else if (currentCol == 6) this.players[i].currentPad = this.padsService.padsCol3[0];
      }
    }
  }
  pushColUp(currentCol: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row != 1) {
        $(this.players[i].cssID).animate({
          top: "-=" + this.padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row == 1) {

        $(this.players[i].cssID).animate({
          top: "+=" + this.padsService.animDistance * 6
        }, 500);
        if (currentCol == 2) this.players[i].currentPad = this.padsService.padsCol1[this.padsService.padsCol1.length - 1];
        else if (currentCol == 4) this.players[i].currentPad = this.padsService.padsCol2[this.padsService.padsCol1.length - 1];
        else if (currentCol == 6) this.players[i].currentPad = this.padsService.padsCol3[this.padsService.padsCol1.length - 1];
      }
    }
  }
  pushRowRight(currentRow: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col != 7) {
        $(this.players[i].cssID).animate({
          left: "+=" + this.padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col == 7) {
        $(this.players[i].cssID).animate({
          left: "-=" + this.padsService.animDistance * 6
        }, 500);

        if (currentRow == 2) this.players[i].currentPad = this.padsService.padsRow1[0];
        else if (currentRow == 4) this.players[i].currentPad = this.padsService.padsRow2[0];
        else if (currentRow == 6) this.players[i].currentPad = this.padsService.padsRow3[0];
      }
    }
  }
  pushRowLeft(currentRow: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col != 1) {
        $(this.players[i].cssID).animate({
          left: "-=" + this.padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col == 1) {

        $(this.players[i].cssID).animate({
          left: "+=" + this.padsService.animDistance * 6
        }, 500);
        if (currentRow == 2) this.players[i].currentPad = this.padsService.padsRow1[this.padsService.padsRow1.length - 1];
        else if (currentRow == 4) this.players[i].currentPad = this.padsService.padsRow2[this.padsService.padsRow2.length - 1];
        else if (currentRow == 6) this.players[i].currentPad = this.padsService.padsRow3[this.padsService.padsRow3.length - 1];
      }
    }
  }
  get rowDistance() {
    return this._rowDistance;
  }
  set rowDistance(a: number) {
    this._rowDistance = a;
  }
  get colDistance() {
    return this._colDistance;
  }
  set colDistance(a: number) {
    this._colDistance = a;
  }
  get currentColor() {
    return this._currentColor;
  }
  set currentColor(a: string) {
    this._currentColor = a;
  }
}
