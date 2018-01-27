import { Injectable } from '@angular/core';

import { Pad, TPad } from '../pads/pads';
import { PadsService } from '../pads/pads.service';
import { Player } from '../player/player';


@Injectable()
export class PathFinderService {

  private _path: Pad[];

  constructor(private _padsService: PadsService) {
    this._path = [null];
  }

  updateReachablePads(players: Player[]) {
    this._padsService.resetReachableForPlayers();
    players.forEach((player, index) => {
      this.findReachablePads(player);
    });
  }

  findReachablePads(player: Player) {
    player.currentPad.reachableForPlayers.set(player.color, true);
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
    if (pad !== destination) {
      let targetFound: boolean = false;

      let tempNeighbors: Pad[] = [pad.openNeighbors.get("north"), pad.openNeighbors.get("east"), pad.openNeighbors.get("south"), pad.openNeighbors.get("west")];

      // Calculate the angle between the vector from pad to destination and the y-axis. It then is used to determine the order in neighbors. By doing so, the algorithm checks pads in the direction of destination first which makes it more likely to find the path faster. It also helps finding the shortest path if there is a circular subpath.
      let xDeviation = destination.col - pad.col;
      let yDeviation = destination.row - pad.row;
      let deviationVectorLength = Math.sqrt(Math.pow(xDeviation, 2) + Math.pow(yDeviation, 2));
      let dotProduct;
      let angle = 0;
      if (xDeviation < 0) {
        dotProduct = yDeviation;
        angle = 180;
      } else {
        dotProduct = -yDeviation;
      }
      angle += Math.floor(Math.acos(dotProduct / deviationVectorLength) * 180 / Math.PI)

      let neighbors = [];
      switch (Math.ceil(angle / 45)) {
        case 1:
          neighbors = [pad.openNeighbors.get("north"), pad.openNeighbors.get("east"), pad.openNeighbors.get("west"), pad.openNeighbors.get("south")];
          break;
        case 2:
          neighbors = [pad.openNeighbors.get("east"), pad.openNeighbors.get("north"), pad.openNeighbors.get("south"), pad.openNeighbors.get("west")];
          break;
        case 3:
          neighbors = [pad.openNeighbors.get("east"), pad.openNeighbors.get("south"), pad.openNeighbors.get("north"), pad.openNeighbors.get("west")];
          break;
        case 4:
          neighbors = [pad.openNeighbors.get("south"), pad.openNeighbors.get("east"), pad.openNeighbors.get("west"), pad.openNeighbors.get("north")];
          break;
        case 5:
          neighbors = [pad.openNeighbors.get("south"), pad.openNeighbors.get("west"), pad.openNeighbors.get("east"), pad.openNeighbors.get("north")];
          break;
        case 6:
          neighbors = [pad.openNeighbors.get("west"), pad.openNeighbors.get("south"), pad.openNeighbors.get("north"), pad.openNeighbors.get("east")];
          break;
        case 7:
          neighbors = [pad.openNeighbors.get("west"), pad.openNeighbors.get("north"), pad.openNeighbors.get("south"), pad.openNeighbors.get("east")];
          break;
        case 8:
          neighbors = [pad.openNeighbors.get("north"), pad.openNeighbors.get("west"), pad.openNeighbors.get("east"), pad.openNeighbors.get("south")];
          break;
        default:
          neighbors = [pad.openNeighbors.get("north"), pad.openNeighbors.get("east"), pad.openNeighbors.get("west"), pad.openNeighbors.get("south")];
          break;
      }

      // Process the Neighbors of pad.
      let i = 0;
      do {
        targetFound = this.processNeighbor(pad, neighbors[i], destination);
        i++;
        if (targetFound) {
          return true;
        }
      } while (!targetFound && i < neighbors.length);
      this._path.pop();
      return false;
    } else {
      return true;
    }
  }

  // Check if a neighbor of neighbor is the destination by calling findPath recursively
  processNeighbor(pad: Pad, neighbor: Pad, destination: Pad): boolean {
    if (neighbor === null || this._path.includes(neighbor)) {
      return false;
    } else {
      let checkNeighbor = this.findPath(neighbor, destination);
      if (checkNeighbor === false) {
        return false;
      } else if (checkNeighbor === true) {
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
