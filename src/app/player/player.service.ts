import { Injectable } from '@angular/core';
import { Player } from './player';
import * as $ from 'jquery';
import { PadsService } from '../pads/pads.service';
import { Pad } from '../pads/pads';
import { PathFinderService } from '../path-finder/path-finder.service';
import { ShuffleService } from '../helper-services/shuffle-service';
import { TARGETS } from '../targets/mock-targets';

@Injectable()
export class PlayerService {

  private _playerOne: Player;
  private _playerTwo: Player;
  private _playerThree: Player;
  private _playerFour: Player;
  private _players: Player[];
  private _activePlayers: Player[];
  private _rowDistance;
  private _colDistance;
  private _currentPlayer: Player;
  private _hasPushed: boolean;
  private _hasMoved: boolean;
  private _shuffledTargets;
  private _playerCount;
  private _playerOneTargets;
  private _playerTwoTargets;
  private _playerThreeTargets;
  private _playerFourTargets;
  private _currentTargetOne;
  private _currentTargetTwo;
  private _currentTargetThree;
  private _currentTargetFour;

  padsService = null;

  constructor(private _pads: PadsService, private _pathFinderService: PathFinderService, private _shuffle: ShuffleService) {

    this._playerOne = new Player(this._pads.spawns[0], "#playerOne");
    this._playerTwo = new Player(this._pads.spawns[2], "#playerTwo");
    this._playerThree = new Player(this._pads.spawns[1], "#playerThree");
    this._playerFour = new Player(this._pads.spawns[3], "#playerFour");
    this._players = [this._playerOne, this._playerTwo, this._playerThree, this._playerFour];
    this.hasPushed = false;
    this.hasMoved = false;
    this._currentPlayer = this.players[0];
    this.padsService = _pads;
    this._shuffledTargets = this._shuffle.shuffle(TARGETS.slice(0, TARGETS.length));
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

      // Move along the path
      path.forEach((pad) => {
        this.move(pad);
      });
      this.checkForTarget();
      this._hasMoved = true;
    }
  }

  move(destination: Pad) {

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

        break;

      case this._playerThree:

        colDeviation = destination.col - this.playerThree.currentPad.col;
        rowDeviation = destination.row - this.playerThree.currentPad.row;
        colFactor = Math.abs(colDeviation);
        rowFactor = Math.abs(rowDeviation);
        this.colDistance = (destination.col - this.playerThree.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerThree.currentPad.row) * this.padsService.animDistance;


        $("#playerThree").animate({
          left: "+=" + this.colDistance
        }, 200 * colFactor);

        $("#playerThree").animate({
          top: "+=" + this.rowDistance
        }, 200 * rowFactor);

        this.playerThree.currentPad = destination;

        break;

      case this._playerFour:

        colDeviation = destination.col - this.playerFour.currentPad.col;
        rowDeviation = destination.row - this.playerFour.currentPad.row;
        colFactor = Math.abs(colDeviation);
        rowFactor = Math.abs(rowDeviation);
        this.colDistance = (destination.col - this.playerFour.currentPad.col) * this.padsService.animDistance;
        this.rowDistance = (destination.row - this.playerFour.currentPad.row) * this.padsService.animDistance;

        $("#playerFour").animate({
          left: "+=" + this.colDistance
        }, 200 * colFactor);

        $("#playerFour").animate({
          top: "+=" + this.rowDistance
        }, 200 * rowFactor);

        this.playerFour.currentPad = destination;

        break;
    }
  }

  checkForTarget() {
    switch (this.currentPlayer) {
      case this.playerOne:
        if (this.playerOneTargets.length != 0 &&
          this.playerOne.currentPad.treasureID == this.currentTargetOne.id) {
          console.log("Schatz eingesammelt")
          this.playerOneTargets.splice(0, 1);
          this.playerOne.currentPad.treasureID = null;
          this.currentTargetOne = this.playerOneTargets[0];
          console.log(this.playerOneTargets);
        } else if (this.playerOneTargets.length == 0
          && this.playerOne.currentPad.playerSpawn == "red") {
          console.log("Gewonnen")
        }
        break;
      case this.playerTwo:
        if (this.playerTwoTargets.length != 0 &&
          this.playerTwo.currentPad.treasureID == this.currentTargetTwo.id) {
          console.log("Schatz eingesammelt")
          this.playerTwoTargets.splice(0, 1);
          this.playerTwo.currentPad.treasureID = null;
          this.currentTargetTwo = this.playerTwoTargets[0];
          console.log(this.playerTwoTargets);
        } else if (this.playerTwoTargets.length == 0 && this.playerTwo.currentPad.playerSpawn == "blue") {
          console.log("Gewonnen")
        }
        break;
      case this.playerThree:
        if (this.playerThreeTargets.length != 0 &&
          this.playerThree.currentPad.treasureID == this.currentTargetThree.id) {
          console.log("Schatz eingesammelt")
          this.playerThreeTargets.splice(0, 1);
          this.playerThree.currentPad.treasureID = null;
          this.currentTargetThree = this.playerThreeTargets[0];
          console.log(this.playerThreeTargets);
        } else if (this.playerThreeTargets.length == 0 && this.playerThree.currentPad.playerSpawn == "yellow") {
          console.log("Gewonnen")
        }
        break;
      case this.playerFour:
        if (this.playerFourTargets.length != 0 &&
          this.playerFour.currentPad.treasureID == this.currentTargetFour.id) {
          console.log("Schatz eingesammelt")
          this.playerFourTargets.splice(0, 1);
          this.playerFour.currentPad.treasureID = null;
          this.currentTargetFour = this.playerFourTargets[0];
          console.log(this.playerFourTargets);
        } else if (this.playerFourTargets.length == 0 && this.playerFour.currentPad.playerSpawn == "green") {
          console.log("Gewonnen")
        }
        break;
    }
  }

  nextPlayer() {
    if (this._players.indexOf(this.currentPlayer) + 1 !== this.playerCount) this._currentPlayer = this.players[this.players.indexOf(this._currentPlayer) + 1];
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

  setPlayerCountTwo() {

    this.playerCount = 2;
    this._shuffle.shuffle(this._shuffledTargets);
    this.playerOneTargets = this._shuffledTargets.slice(0, 12);
    this.playerTwoTargets = this._shuffledTargets.slice(12, 24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];

    this._activePlayers = this._players.slice(0, this._playerCount);
    this._pathFinderService.updateReachablePads(this._activePlayers);
  }

  setPlayerCountThree() {
    this.playerCount = 3;
    this._shuffle.shuffle(this._shuffledTargets);
    this.playerOneTargets = this._shuffledTargets.slice(0, 8);
    this.playerTwoTargets = this._shuffledTargets.slice(8, 16);
    this.playerThreeTargets = this._shuffledTargets.slice(16, 24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
    this.currentTargetThree = this.playerThreeTargets[0];

    this._activePlayers = this._players.slice(0, this._playerCount);
    this._pathFinderService.updateReachablePads(this._activePlayers);
  }

  setPlayerCountFour() {
    this.playerCount = 4;
    this._shuffle.shuffle(this._shuffledTargets);
    this.playerOneTargets = this._shuffledTargets.slice(0, 6);
    this.playerTwoTargets = this._shuffledTargets.slice(6, 12);
    this.playerThreeTargets = this._shuffledTargets.slice(12, 18);
    this.playerFourTargets = this._shuffledTargets.slice(18, 24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
    this.currentTargetThree = this.playerThreeTargets[0];
    this.currentTargetFour = this.playerFourTargets[0];

    this._activePlayers = this._players.slice(0, this._playerCount);
    this._pathFinderService.updateReachablePads(this._activePlayers);
  }

  restart() {
    location.reload();
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

  get activePlayers(): Player[] {
    return this._activePlayers;
  }
  set activePlayers(newActivePlayers: Player[]) {
    this._activePlayers = newActivePlayers;
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

  get shuffledTargets() {
    return this._shuffledTargets;
  }
  set shuffledTargets(a) {
    this._shuffledTargets = a;
  }
  get currentTargetOne() {
    return this._currentTargetOne;
  }
  set currentTargetOne(a) {
    this._currentTargetOne = a;
  }

  get currentTargetTwo() {
    return this._currentTargetTwo;
  }
  set currentTargetTwo(a) {
    this._currentTargetTwo = a;
  }

  get currentTargetThree() {
    return this._currentTargetThree;
  }
  set currentTargetThree(a) {
    this._currentTargetThree = a;
  }

  get currentTargetFour() {
    return this._currentTargetFour;
  }
  set currentTargetFour(a) {
    this._currentTargetFour = a;
  }

  get playerOneTargets() {
    return this._playerOneTargets;
  }
  set playerOneTargets(a) {
    this._playerOneTargets = a;
  }

  get playerTwoTargets() {
    return this._playerTwoTargets;
  }
  set playerTwoTargets(a) {
    this._playerTwoTargets = a;
  }

  get playerThreeTargets() {
    return this._playerThreeTargets;
  }
  set playerThreeTargets(a) {
    this._playerThreeTargets = a;
  }

  get playerFourTargets() {
    return this._playerFourTargets;
  }
  set playerFourTargets(a) {
    this._playerFourTargets = a;
  }

  get playerCount() {
    return this._playerCount;
  }
  set playerCount(a) {
    this._playerCount = a;
  }
}
