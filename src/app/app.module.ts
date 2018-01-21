import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ShuffleService } from './helper-services/shuffle-service';

import { AppComponent } from './app.component';
import { TargetAreaComponent } from './target-area/target-area.component';
import { PlayerComponent } from './player/player.component';
import { TargetAreaService } from './target-area/target-area.service';

@NgModule({
  declarations: [
    AppComponent,
    TargetAreaComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [ShuffleService, TargetAreaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
