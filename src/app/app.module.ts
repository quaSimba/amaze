import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayingAreaComponent } from './playing-area/playing-area.component'
import { PlayingBoardComponent } from './playing-area/playing-board.component';
import { BorderAreaComponent } from './playing-area/border-area.component';
import { PadsService } from './playing-area/pads.service';
import { ShuffleService } from './helper-services/shuffle-service';

@NgModule({
  declarations: [
    AppComponent,
    PlayingAreaComponent,
    PlayingBoardComponent,
    BorderAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PadsService, ShuffleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
