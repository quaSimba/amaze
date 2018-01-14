import { Component } from '@angular/core';
import { ShuffleService } from '../helper-services/shuffle-service';
import { TARGETS } from '../targets/mock-targets';


@Component({
  selector: "target-area",
  templateUrl: "./target-area.component.html",
  styleUrls: ["./target-area.component.css"]
})

export class TargetAreaComponent{

  private _playerCount = 0;
  private _playerOneTargets;
  private _playerTwoTargets;
  private _playerThreeTargets;
  private _playerFourTargets;
  private _currentTargetOne;
  private _currentTargetTwo;
  private _currentTargetThree;
  private _currentTargetFour;

  constructor(shuffleService: ShuffleService){

    shuffleService.shuffle(TARGETS);
  }

  setPlayerCountOne(){
    this.playerCount = 1;
    this.playerOneTargets = TARGETS;
    this.currentTargetOne = TARGETS[0];
  }

  setPlayerCountTwo(){
    this.playerCount = 2;
    this.playerOneTargets = TARGETS.slice(0, 12);
    this.playerTwoTargets = TARGETS.slice(12, 24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
  }

  setPlayerCountThree(){
    this.playerCount = 3;
    this.playerOneTargets = TARGETS.slice(0,8);
    this.playerTwoTargets = TARGETS.slice(8,16);
    this.playerThreeTargets = TARGETS.slice(16,24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
    this.currentTargetThree = this.playerThreeTargets[0];
  }

  setPlayerCountFour(){
    this.playerCount = 4;
    this.playerOneTargets = TARGETS.slice(0,6);
    this.playerTwoTargets = TARGETS.slice(6,12);
    this.playerThreeTargets = TARGETS.slice(12,18);
    this.playerFourTargets = TARGETS.slice(18,24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
    this.currentTargetThree = this.playerThreeTargets[0];
    this.currentTargetFour = this.playerFourTargets[0];
  }

  get currentTargetOne(){
    return this._currentTargetOne;
  }
  set currentTargetOne(a){
    this._currentTargetOne = a;
  }

  get currentTargetTwo(){
    return this._currentTargetTwo;
  }
  set currentTargetTwo(a){
    this._currentTargetTwo = a;
  }

  get currentTargetThree(){
    return this._currentTargetThree;
  }
  set currentTargetThree(a){
    this._currentTargetThree = a;
  }

  get currentTargetFour(){
    return this._currentTargetFour;
  }
  set currentTargetFour(a){
    this._currentTargetFour = a;
  }

  get playerOneTargets(){
    return this._playerOneTargets;
  }
  set playerOneTargets(a){
    this._playerOneTargets = a;
  }

  get playerTwoTargets(){
    return this._playerTwoTargets;
  }
  set playerTwoTargets(a){
    this._playerTwoTargets = a;
  }

  get playerThreeTargets(){
    return this._playerThreeTargets;
  }
  set playerThreeTargets(a){
    this._playerThreeTargets = a;
  }

  get playerFourTargets(){
    return this._playerFourTargets;
  }
  set playerFourTargets(a){
    this._playerFourTargets = a;
  }

  get playerCount(){
    return this._playerCount;
  }
  set playerCount(a){
    this._playerCount = a;
  }

}
