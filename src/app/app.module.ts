import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayingAreaComponent } from './playing-area/playing-area.component'
import { PlayingBoardComponent } from './playing-board/playing-board.component';
import { BorderAreaComponent } from './border-area/border-area.component';
import { PadsService } from './pads/pads.service';
import { SparePadAreaComponent } from './spare-pad-area/spare-pad-area.component';
import { ShuffleService } from './helper-services/shuffle-service';
import { TargetAreaComponent } from './target-area/target-area.component';
import { PlayerComponent } from './player/player.component';
import { NextPlayerComponent } from './next-player/next-player.component';
import { PlayerService } from './player/player.service';
import { PlayerTargetsComponent } from './player-targets/player-targets.component'
import { SystemButtonsComponent }from "./system-buttons/system-buttons.component";
import { PathFinderService } from './path-finder/path-finder.service';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayingAreaComponent,
    PlayingBoardComponent,
    BorderAreaComponent,
    TargetAreaComponent,
    PlayerComponent,
    NextPlayerComponent,
    SparePadAreaComponent,
    PlayerTargetsComponent,
    SystemButtonsComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [PadsService, ShuffleService, PlayerService, PathFinderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
