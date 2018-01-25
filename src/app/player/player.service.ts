import { Injectable } from '@angular/core';
import { Player } from './player';
import * as $ from 'jquery';
import { PlayerTargetsService } from '../player-targets/player-targets.service'
import { PadsService } from '../pads/pads.service';
import { Pad } from '../pads/pads';
import { PathFinderService } from '../path-finder/path-finder.service';

@Injectable()
export class PlayerService {

  private _playerOne: Player;
  private _playerTwo: Player;
  private _playerThree: Player;
  private _playerFour: Player;
  private _players: Player[];
  private _rowDistance;
  private _colDistance;
  private _currentPlayer: Player;
  private _hasPushed: boolean;
  private _hasMoved: boolean;

  playerTargetsService = null;
  padsService = null;

  constructor(private _playerTargets: PlayerTargetsService, private _pads: PadsService, private _pathFinderService: PathFinderService) {

    this._playerOne = new Player(this._pads.spawns[0], "#playerOne");
    this._playerTwo = new Player(this._pads.spawns[2], "#playerTwo");
    this._playerThree = new Player(this._pads.spawns[1], "#playerThree");
    this._playerFour = new Player(this._pads.spawns[3], "#playerFour");
    this._players = [this._playerOne, this._playerTwo, this._playerThree, this._playerFour];
    this.hasPushed = false;
    this.hasMoved = false;
    this._currentPlayer = this.players[0];
    this.playerTargetsService = _playerTargets;
    this.padsService = _pads;

    this._pathFinderService.updateReachablePads(this.players);
  }


  showLocation() {
    console.log("Row: " + this.playerOne.currentPad.row);
    console.log("Column: " + this.playerOne.currentPad.col);
  }

  prepareMove(player: Player, destination: Pad) {
    if (this._hasMoved === false && this._hasPushed === true) {
      if ((!destination.reachableForPlayers.get(player.color)) || destination === player.currentPad) {
        return;
      }
      this._pathFinderService.path = [];
      this._pathFinderService.findPath(player.currentPad, destination);

      // Shorten path so players move straight instead of pad by pad until they need to turn
      let path = [];
      let tempPath = this._pathFinderService.path;
      for (let i = 1; i < tempPath.length - 1; i++) {
        let pad = tempPath[i];
        let previousPad = tempPath[i - 1];
        let nextPad = tempPath[i + 1]
        if ((previousPad.row === pad.row && nextPad.row !== pad.row) || (previousPad.col === pad.col && nextPad.col !== pad.col)) {
          path.push(pad);
        }
      }
      path.push(destination);

      // Move
      path.forEach((pad) => {
        this.move(player, pad);
      });
      this._hasMoved = true;
    }
  }

  move(player: Player, destination: Pad) {

    let colDeviation;
    let rowDeviation
    let colFactor;
    let rowFactor;

    switch (this.currentPlayer) {

      case this._playerOne:

        colDeviation = destination.col - this.playerOne.currentPad.col;
        rowDeviation = destination.row - this.playerOne.currentPad.row;
        colFactor = Math.abs(colDeviation);
        rowFactor = Math.abs(rowDeviation);
        this.colDistance = colDeviation * this.padsService.animDistance;
        this.rowDistance = rowDeviation * this.padsService.animDistance;

        $("#playerOne").animate({
          left: "+=" + this.colDistance
        }, 200 * colFactor);

        $("#playerOne").animate({
          top: "+=" + this.rowDistance
        }, 200 * rowFactor);

        this.playerOne.currentPad = destination;

        if (this.playerTargetsService.playerOneTargets.length != 0 &&
          destination.treasureID == this.playerTargetsService.currentTargetOne.id) {
          console.log("Schatz eingesammelt")

          this.playerTargetsService.playerOneTargets.splice(0, 1);
          this.playerTargetsService.currentTargetOne = this.playerTargetsService.playerOneTargets[0];
          console.log(this.playerTargetsService.playerOneTargets);
        }
        else if (this.playerTargetsService.playerOneTargets.length == 0
          && destination.playerSpawn == "red") {
          console.log("Gewonnen")
        }
        break;

      case this._playerTwo:

        colDeviation = destination.col - this.playerTwo.currentPad.col;
        rowDeviation = destination.row - this.playerTwo.currentPad.row;
        colFactor = Math.abs(colDeviation);
        rowFactor = Math.abs(rowDeviation);
        this.colDistance = (destination.col - this.playerTwo.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerTwo.currentPad.row) * this.padsService.animDistance;

        $("#playerTwo").animate({
          left: "+=" + this.colDistance
        }, 200 * colFactor);

        $("#playerTwo").animate({
          top: "+=" + this.rowDistance
        }, 200 * rowFactor);

        this.playerTwo.currentPad = destination

        if (this.playerTargetsService.playerTwoTargets.length != 0 &&
          destination.treasureID == this.playerTargetsService.currentTargetTwo.id) {
          console.log("Schatz eingesammelt")
          this.playerTargetsService.playerTwoTargets.splice(0, 1);
          this.playerTargetsService.currentTargetTwo = this.playerTargetsService.playerTwoTargets[0];
          console.log(this.playerTargetsService.playerTwoTargets);
        }
        else if (this.playerTargetsService.playerTwoTargets.length == 0 && destination.playerSpawn == "blue") {
          console.log("Gewonnen")
        }
        break;

      case this._playerThree:

        colDeviation = destination.col - this.playerThree.currentPad.col;
        rowDeviation = destination.row - this.playerThree.currentPad.row;
        this.colDistance = (destination.col - this.playerThree.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerThree.currentPad.row) * this.padsService.animDistance;


        $("#playerThree").animate({
          left: "+=" + this.colDistance
        }, 200 * colFactor);

        $("#playerThree").animate({
          top: "+=" + this.rowDistance
        }, 200 * rowFactor);

        this.playerThree.currentPad = destination;

        if (this.playerTargetsService.playerThreeTargets.length != 0 &&
          destination.treasureID == this.playerTargetsService.currentTargetThree.id) {
          console.log("Schatz eingesammelt")
          this.playerTargetsService.playerThreeTargets.splice(0, 1);
          this.playerTargetsService.currentTargetThree = this.playerTargetsService.playerThreeTargets[0];
          console.log(this.playerTargetsService.playerThreeTargets);
        }
        else if (this.playerTargetsService.playerThreeTargets.length == 0 && destination.playerSpawn == "yellow") {
          console.log("Gewonnen")
        }
        break;

      case this._playerFour:

        colDeviation = destination.col - this.playerFour.currentPad.col;
        rowDeviation = destination.row - this.playerFour.currentPad.row;
        this.colDistance = (destination.col - this.playerFour.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerFour.currentPad.row) * this.padsService.animDistance;

        $("#playerFour").animate({
          left: "+=" + this.colDistance
        }, 200 * colFactor);

        $("#playerFour").animate({
          top: "+=" + this.rowDistance
        }, 200 * rowFactor);

        this.playerFour.currentPad = destination;

        if (this.playerTargetsService.playerFourTargets.length != 0 &&
          destination.treasureID == this.playerTargetsService.currentTargetFour.id) {
          console.log("Schatz eingesammelt")
          this.playerTargetsService.playerFourTargets.splice(0, 1);
          this.playerTargetsService.currentTargetFour = this.playerTargetsService.playerFourTargets[0];
          console.log(this.playerTargetsService.playerFourTargets);
        }
        else if (this.playerTargetsService.playerFourTargets.length == 0 && destination.playerSpawn == "green") {
          console.log("Gewonnen")
        }
        break;
    }

  }

  nextPlayer() {
    if (this._players.indexOf(this.currentPlayer) + 1 !== this.playerTargetsService.playerCount) this._currentPlayer = this.players[this.players.indexOf(this._currentPlayer) + 1];
    else this.currentPlayer = this.players[0];
    this.hasPushed = false;
    this.hasMoved = false;
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

  get playerOne(): Player {
    return this._playerOne;
  }
  set playerOne(newPlayer: Player) {
    this._playerOne = newPlayer;
  }

  get playerTwo(): Player {
    return this._playerTwo;
  }
  set playerTwo(newPlayer: Player) {
    this._playerTwo = newPlayer;
  }

  get playerThree(): Player {
    return this._playerThree;
  }
  set playerThree(newPlayer: Player) {
    this._playerThree = newPlayer;
  }

  get playerFour(): Player {
    return this._playerFour;
  }
  set playerFour(newPlayer: Player) {
    this._playerFour = newPlayer;
  }

  get players(): Player[] {
    return this._players;
  }
  set player(newPlayers: Player[]) {
    this._players = newPlayers;
  }

  get hasMoved() {
    return this._hasMoved;
  }
  set hasMoved(newHasMoved: boolean) {
    this._hasMoved = newHasMoved;
  }

  get hasPushed() {
    return this._hasPushed;
  }
  set hasPushed(newHasPushed: boolean) {
    this._hasPushed = newHasPushed;
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

  get currentPlayer() {
    return this._currentPlayer;
  }
  set currentPlayer(a: Player) {
    this._currentPlayer = a;
  }
}
