import { Injectable } from '@angular/core';

import { Pad, TPad } from '../pads/pads';
import { PadsService } from '../pads/pads.service';
import { Player } from '../player/player';


@Injectable()
export class PathFinderService {

  private _reachablePads: Map<string, Pad[]>;
  private _path: Pad[];

  constructor(private _padsService: PadsService) {
    this._reachablePads = new Map<string, Pad[]>();
    this._path = [null];
  }

  updateReachablePads(players: Player[]) {
    this._padsService.resetReachableForPlayers();
    players.forEach((player, index) => {
      this.findReachablePads(player);
    });
    /*for (let i = 0; i < this._reachablePads.get("red").length; i++) {
      let dublicates = this._reachablePads.get("red").filter((pad, key) => {
        return pad === this._reachablePads.get("red")[i];
      });
      console.log(dublicates);
    }
    this._padsService.allPads.forEach((pad) => {
      if (pad.reachableForPlayers.get("red")) {
        console.log(pad.row + ", " + pad.col);
        console.log(pad.openNeighbors);
      };
    })*/
  }

  findReachablePads(player: Player) {
    player.currentPad.reachableForPlayers.set(player.color, true);
    this._reachablePads.set(player.color, []);
    this._reachablePads.get(player.color).push(player.currentPad);
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

    let alreadyChecked = northernPad.reachableForPlayers.get(player.color);
    let open = pad.openDirections.get("north") && northernPad.openDirections.get("south");

    if (!open && !alreadyChecked) {
      return;
    } else if (open) {
      pad.openNeighbors.set("north", northernPad);
      northernPad.openNeighbors.set("south", pad);
      if (!alreadyChecked) {
        this._reachablePads.get(player.color).push(northernPad);
        northernPad.reachableForPlayers.set(player.color, true);
        this.checkNorthernRoute(player, northernPad);
        this.checkEasternRoute(player, northernPad);
        this.checkWesternRoute(player, northernPad);
      }
    }
  }

  checkEasternRoute(player: Player, pad: Pad) {
    let easternPad = this._padsService.allPads.filter((object) => {
      return (object.col === (pad.col + 1)) && (object.row === pad.row);
    })[0];
    if (easternPad === undefined) return;

    let alreadyChecked = easternPad.reachableForPlayers.get(player.color);
    let open = pad.openDirections.get("east") && easternPad.openDirections.get("west");

    if (!open && !alreadyChecked) {
      return;
    } else if (open) {
      pad.openNeighbors.set("east", easternPad);
      easternPad.openNeighbors.set("west", pad);
      if (!alreadyChecked) {
        this._reachablePads.get(player.color).push(easternPad);
        easternPad.reachableForPlayers.set(player.color, true);
        this.checkEasternRoute(player, easternPad);
        this.checkSouthernRoute(player, easternPad);
        this.checkNorthernRoute(player, easternPad);
      }
    }
  }

  checkSouthernRoute(player: Player, pad: Pad) {
    let southernPad = this._padsService.allPads.filter((object) => {
      return (object.col === pad.col) && (object.row === (pad.row + 1));
    })[0];
    if (southernPad === undefined) return;

    let alreadyChecked = southernPad.reachableForPlayers.get(player.color);
    let open = pad.openDirections.get("south") && southernPad.openDirections.get("north");

    if (!open && !alreadyChecked) {
      return;
    } else if (open) {
      pad.openNeighbors.set("south", southernPad);
      southernPad.openNeighbors.set("north", pad);
      if (!alreadyChecked) {
        this._reachablePads.get(player.color).push(southernPad);
        southernPad.reachableForPlayers.set(player.color, true);
        this.checkSouthernRoute(player, southernPad);
        this.checkWesternRoute(player, southernPad);
        this.checkEasternRoute(player, southernPad);
      }
    }
  }

  checkWesternRoute(player: Player, pad: Pad) {
    let westernPad = this._padsService.allPads.filter((object) => {
      return (object.col === (pad.col - 1)) && (object.row === pad.row);
    })[0];
    if (westernPad === undefined) return;

    let alreadyChecked = westernPad.reachableForPlayers.get(player.color);
    let open = pad.openDirections.get("west") && westernPad.openDirections.get("east");

    if (!open && !alreadyChecked) {
      return;
    } else if (open) {
      pad.openNeighbors.set("west", westernPad);
      westernPad.openNeighbors.set("east", pad);
      if (!alreadyChecked) {
        this._reachablePads.get(player.color).push(westernPad);
        westernPad.reachableForPlayers.set(player.color, true);
        this.checkWesternRoute(player, westernPad);
        this.checkNorthernRoute(player, westernPad);
        this.checkSouthernRoute(player, westernPad);
      }
    }
  }

  // Find a path to the destination. First call kickstarts a recursive proxess constisting of this function and processNeighbor() which end when the destination is found. Each pad being checked for destination is stored in this._path but gets poped if it is part of a branch not leading to the destination.
  findPath(pad, destination: Pad): boolean {
    this._path.push(pad);
    //console.log("Checke für " + pad.row + ", " + pad.col)
    if (pad !== destination) {
      let targetFound: boolean = false;

      let neighbors: Pad[] = [pad.openNeighbors.get("north"), pad.openNeighbors.get("east"), pad.openNeighbors.get("south"), pad.openNeighbors.get("west")];
      let i = 0;
      do {
        targetFound = this.processNeighbor(pad, neighbors[i], destination);
        i++;
        if (targetFound) {
          return true;
        }
      } while (!targetFound && i < neighbors.length);

      this._path.pop();
      //console.log("Check abgeschlossen für " + pad.row + ", " + pad.col)
      return false;
    } else {
      //console.log("Dieses pad ist es");
      return true;
    }
  }

  // Check if a neighbor of neighbor is the destination by calling findPath recursively
  processNeighbor(pad: Pad, neighbor: Pad, destination: Pad): boolean {
    //console.log("Nachbar schon gecheckt: " + this._path.includes(neighbor));
    if (neighbor === null || this._path.includes(neighbor)) {
      //console.log("Null oder gleiches Pad")
      return false;
    } else {
      let checkNeighbor = this.findPath(neighbor, destination);
      if (checkNeighbor === false) {
        //console.log("Nachbar ist es nicht")
        return false;
      } else if (checkNeighbor === true) {
        //console.log("Nachbar ist es")
        return true;
      }
    }
    return false;
  }

  get path(): Pad[] {
    return this._path;
  }
  set path(newPath: Pad[]) {
    this._path = newPath;
  }
}
