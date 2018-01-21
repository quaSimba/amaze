export class Player{
  private _row;
  private _col;
  private _color;

constructor (row: number, col: number, color: string){
  this.row = row;
  this.col = col;
  this.color = color;
}

  get color(){
    return this._color;
  }
  set color(a: string){
    this._color = a;
  }
  get row(){
    return this._row;
  }
  set row(a: number){
    this._row = a;
  }
  get col(){
    return this._col;
  }
  set col(a: number){
    this._col = a;
  }
}
