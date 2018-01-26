import { Injectable } from '@angular/core';
import { ShuffleService } from '../helper-services/shuffle-service';
import { TARGETS } from '../targets/mock-targets';

@Injectable()
export class PlayerTargetsService {

shuffleService = null;

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

  constructor(private _shuffle:ShuffleService) {
    this.shuffleService = _shuffle;
    this._shuffledTargets = this.shuffleService.shuffle(TARGETS.slice(0, TARGETS.length));
   }
  setPlayerCountTwo(){

    this.playerCount = 2;
    this.shuffleService.shuffle(this._shuffledTargets);
    this.playerOneTargets = this._shuffledTargets.slice(0, 12);
    this.playerTwoTargets = this._shuffledTargets.slice(12, 24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
  }

  setPlayerCountThree(){
    this.playerCount = 3;
    this.shuffleService.shuffle(this._shuffledTargets);
    this.playerOneTargets = this._shuffledTargets.slice(0,8);
    this.playerTwoTargets = this._shuffledTargets.slice(8,16);
    this.playerThreeTargets = this._shuffledTargets.slice(16,24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
    this.currentTargetThree = this.playerThreeTargets[0];
  }

  setPlayerCountFour(){
    this.playerCount = 4;
    this.shuffleService.shuffle(this._shuffledTargets);
    this.playerOneTargets = this._shuffledTargets.slice(0,6);
    this.playerTwoTargets = this._shuffledTargets.slice(6,12);
    this.playerThreeTargets = this._shuffledTargets.slice(12,18);
    this.playerFourTargets = this._shuffledTargets.slice(18,24);

    this.currentTargetOne = this.playerOneTargets[0];
    this.currentTargetTwo = this.playerTwoTargets[0];
    this.currentTargetThree = this.playerThreeTargets[0];
    this.currentTargetFour = this.playerFourTargets[0];
  }
  restart(){
    location.reload();
  }

  get shuffledTargets(){
    return this._shuffledTargets;
  }
  set shuffledTargets(a){
    this._shuffledTargets = a;
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