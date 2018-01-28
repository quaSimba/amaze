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
  private _rowDistance;
  private _colDistance;
  private _currentPlayer: Player;
  private _hasPushed: boolean;
  private _hasMoved: boolean;
  private _shuffledTargets;
  private _playerCount;

  constructor(private _padsService: PadsService, private _pathFinderService: PathFinderService, private _shuffle: ShuffleService) {
    this._playerOne = new Player(this._padsService.spawns[0], "playerOne");
    this._playerTwo = new Player(this._padsService.spawns[1], "playerTwo");
    this._playerThree = new Player(this._padsService.spawns[2], "playerThree");
    this._playerFour = new Player(this._padsService.spawns[3], "playerFour");
    this._players = [this._playerOne, this._playerTwo, this._playerThree, this._playerFour];
    this.hasPushed = false;
    this.hasMoved = false;
    this._currentPlayer = this.players[0];
    this._shuffledTargets = this._shuffle.shuffle(TARGETS.slice(0, TARGETS.length));
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
      let animDuration = 0;
      path.forEach((pad) => {
        animDuration += this.move(pad, player);
      });
      setTimeout(() => {
        this.checkForTarget(player);
        this._hasMoved = true;
      }, animDuration);
    }
  }

  move(destination: Pad, player: Player): number {
    let colDeviation;
    let rowDeviation
    let colFactor;
    let rowFactor;
    let animDuration;

    colDeviation = destination.col - player.currentPad.col;
    rowDeviation = destination.row - player.currentPad.row;
    colFactor = Math.abs(colDeviation);
    rowFactor = Math.abs(rowDeviation);
    this.colDistance = colDeviation * this._padsService.animDistance;
    this.rowDistance = rowDeviation * this._padsService.animDistance;

    $("#" + player.cssID).animate({
      left: "+=" + this.colDistance
    }, 200 * colFactor);

    $("#" + player.cssID).animate({
      top: "+=" + this.rowDistance
    }, 200 * rowFactor);

    player.currentPad = destination;

    animDuration = colFactor * 200 + rowFactor * 200;
    return animDuration;
  }

  checkForTarget(player: Player) {

    if (player.currentPad.treasureID == player.playerTargets[0].id) {
      player.playerTargets.splice(0, 1);
      player.currentPad.treasureID = null;
      if (player.currentPad.padType === 1) {
        player.currentPad.imgSource = "../../assets/img/pads/L-Pad@150px.png";
      } else {
        player.currentPad.imgSource = "../../assets/img/pads/T-Pad@150px.png"
      }
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
        $("#" + this.players[i].cssID).animate({
          top: "+=" + this._padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row == 7) {

        $("#" + this.players[i].cssID).animate({
          top: "-=" + this._padsService.animDistance * 6
        }, 500);
        if (currentCol == 2) this.players[i].currentPad = this._padsService.padsCol1[0];
        else if (currentCol == 4) this.players[i].currentPad = this._padsService.padsCol2[0];
        else if (currentCol == 6) this.players[i].currentPad = this._padsService.padsCol3[0];
      }
    }
  }

  pushColUp(currentCol: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row != 1) {
        $("#" + this.players[i].cssID).animate({
          top: "-=" + this._padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.col == currentCol && this.players[i].currentPad.row == 1) {

        $("#" + this.players[i].cssID).animate({
          top: "+=" + this._padsService.animDistance * 6
        }, 500);
        if (currentCol == 2) this.players[i].currentPad = this._padsService.padsCol1[this._padsService.padsCol1.length - 1];
        else if (currentCol == 4) this.players[i].currentPad = this._padsService.padsCol2[this._padsService.padsCol2.length - 1];
        else if (currentCol == 6) this.players[i].currentPad = this._padsService.padsCol3[this._padsService.padsCol3.length - 1];
      }
    }
  }

  pushRowRight(currentRow: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col != 7) {
        $("#" + this.players[i].cssID).animate({
          left: "+=" + this._padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col == 7) {
        $("#" + this.players[i].cssID).animate({
          left: "-=" + this._padsService.animDistance * 6
        }, 500);

        if (currentRow == 2) this.players[i].currentPad = this._padsService.padsRow1[0];
        else if (currentRow == 4) this.players[i].currentPad = this._padsService.padsRow2[0];
        else if (currentRow == 6) this.players[i].currentPad = this._padsService.padsRow3[0];
      }
    }
  }

  pushRowLeft(currentRow: number) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col != 1) {
        $("#" + this.players[i].cssID).animate({
          left: "-=" + this._padsService.animDistance
        }, 500);
      }
      else if (this.players[i].currentPad.row == currentRow && this.players[i].currentPad.col == 1) {

        $("#" + this.players[i].cssID).animate({
          left: "+=" + this._padsService.animDistance * 6
        }, 500);
        if (currentRow == 2) this.players[i].currentPad = this._padsService.padsRow1[this._padsService.padsRow1.length - 1];
        else if (currentRow == 4) this.players[i].currentPad = this._padsService.padsRow2[this._padsService.padsRow2.length - 1];
        else if (currentRow == 6) this.players[i].currentPad = this._padsService.padsRow3[this._padsService.padsRow3.length - 1];
      }
    }
  }

  setPlayerCount(count: number) {
    this._players.splice(count, this._players.length - count);
    this.playerCount = count;

    this._shuffle.shuffle(this._shuffledTargets);

    this._players.forEach((player, index) => {
      player.playerTargets = this._shuffledTargets.slice(index * 24 / count, (index + 1) * 24 / count);
    });
    this._pathFinderService.updateReachablePads(this._players);
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
  set players(newPlayers: Player[]) {
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

  get shuffledTargets() {
    return this._shuffledTargets;
  }
  set shuffledTargets(a) {
    this._shuffledTargets = a;
  }

  get playerCount() {
    return this._playerCount;
  }
  set playerCount(a) {
    this._playerCount = a;
  }
}
