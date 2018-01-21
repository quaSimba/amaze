import { Component } from '@angular/core';
import { ShuffleService } from '../helper-services/shuffle-service';
import { TARGETS } from '../targets/mock-targets';
import { TargetAreaService } from './target-area.service'


@Component({
  selector: "target-area",
  templateUrl: "./target-area.component.html",
  styleUrls: ["./target-area.component.css"]
})

export class TargetAreaComponent {

  targetAreaService = null;

  constructor(private _targetArea:TargetAreaService){
    this.targetAreaService = _targetArea;
  }

}
