import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayingAreaComponent } from './playing-area/playing-area.component'
import { PlayingBoardComponent } from './playing-board/playing-board.component';
import { BorderAreaComponent } from './border-area/border-area.component';
import { PadsService } from './pads/pads.service';
import { ShuffleService } from './helper-services/shuffle-service';
import { TargetAreaComponent } from './target-area/target-area.component';
import { PlayerComponent } from './player/player.component';
import { TargetAreaService } from './target-area/target-area.service';
import { PlayerService } from './player/player.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayingAreaComponent,
    PlayingBoardComponent,
    BorderAreaComponent,
    TargetAreaComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [PadsService, ShuffleService, TargetAreaService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
