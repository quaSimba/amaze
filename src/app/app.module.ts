import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayingAreaComponent } from './playing-area/playing-area.component'
import { PlayingBoardComponent } from './playing-board/playing-board.component';
import { BorderAreaComponent } from './border-area/border-area.component';
import { PadsService } from './pads/pads.service';
import { ShuffleService } from './helper-services/shuffle-service';
import { TargetAreaComponent } from './target-area/target-area.component';
import { SparePadAreaComponent } from './spare-pad-area/spare-pad-area.component';
//import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayingAreaComponent,
    PlayingBoardComponent,
    BorderAreaComponent,
    TargetAreaComponent,
    SparePadAreaComponent,
    //PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PadsService, ShuffleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
