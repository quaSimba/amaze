import { Injectable } from '@angular/core';

import { Pad } from '../pads/pads';
import { PadsService } from '../pads/pads.service';
import { Player } from '../player/player';


@Injectable()
export class PathFinderService {

  private _reachablePads: Pad[];

  constructor(private _padsService: PadsService) {
  }

  updateReachablePads(players: Player[]) {
    this._padsService.resetReachableForPlayers();
    players.forEach((player, index) => {
      this.findReachablePads(player);
    });
  }

  findReachablePads(player: Player) {
    player.currentPad.reachableForPlayers.set(player.color, true);
    this._reachablePads = [];
    this._reachablePads.push(player.currentPad);
    this.checkNorthernRoute(player, player.currentPad);
    this.checkEasternRoute(player, player.currentPad);
    this.checkSouthernRoute(player, player.currentPad);
    this.checkWesternRoute(player, player.currentPad);
  }

  checkNorthernRoute(player: Player, pad: Pad) {
    let northernPad = this._padsService.allPads.filter((object) => {
      return (object.col === pad.col) && (object.row === (pad.row - 1));
    })[0];
    if (northernPad === undefined) return;
    if (northernPad.reachableForPlayers.get(player.color) === false) {
      if (pad.openDirections.get("north") && northernPad.openDirections.get("south")) {
        this._reachablePads.push(northernPad);
        northernPad.reachableForPlayers.set(player.color, true);
        this.checkNorthernRoute(player, northernPad);
        this.checkEasternRoute(player, northernPad);
        this.checkWesternRoute(player, northernPad);
      } else {
        northernPad.reachableForPlayers.set(player.color, false);
      }
    }
  }

  checkEasternRoute(player: Player, pad: Pad) {
    let easternPad = this._padsService.allPads.filter((object) => {
      return (object.col === (pad.col + 1)) && (object.row === pad.row);
    })[0];
    if (easternPad === undefined) return;
    if (easternPad.reachableForPlayers.get(player.color) === false) {
      if (pad.openDirections.get("east") && easternPad.openDirections.get("west")) {
        this._reachablePads.push(easternPad);
        easternPad.reachableForPlayers.set(player.color, true);
        this.checkEasternRoute(player, easternPad);
        this.checkSouthernRoute(player, easternPad);
        this.checkNorthernRoute(player, easternPad);
      } else {
        easternPad.reachableForPlayers.set(player.color, false);
      }
    }
  }

  checkSouthernRoute(player: Player, pad: Pad) {
    let southernPad = this._padsService.allPads.filter((object) => {
      return (object.col === pad.col) && (object.row === (pad.row + 1));
    })[0];
    if (southernPad === undefined) return;
    if (southernPad.reachableForPlayers.get(player.color) === false) {
      if (pad.openDirections.get("south") && southernPad.openDirections.get("north")) {
        this._reachablePads.push(southernPad);
        southernPad.reachableForPlayers.set(player.color, true);
        this.checkSouthernRoute(player, southernPad);
        this.checkWesternRoute(player, southernPad);
        this.checkEasternRoute(player, southernPad);
      } else {
        southernPad.reachableForPlayers.set(player.color, false);
      }
    }
  }

  checkWesternRoute(player: Player, pad: Pad) {
    let westernPad = this._padsService.allPads.filter((object) => {
      return (object.col === (pad.col - 1)) && (object.row === pad.row);
    })[0];
    if (westernPad === undefined) return;
    if (westernPad.reachableForPlayers.get(player.color) === false) {
      if (pad.openDirections.get("west") && westernPad.openDirections.get("east")) {
        this._reachablePads.push(westernPad);
        westernPad.reachableForPlayers.set(player.color, true);
        this.checkWesternRoute(player, westernPad);
        this.checkNorthernRoute(player, westernPad);
        this.checkSouthernRoute(player, westernPad);
      } else {
        westernPad.reachableForPlayers.set(player.color, false);
      }
    }
  }
}
