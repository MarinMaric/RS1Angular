import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { GameDetailsComponent } from './game-details/game-details.component';
import { ViewGamesComponent } from './view-games/view-games.component';
import { RouterModule } from '@angular/router';
import { UploadGameComponent } from './upload-game/upload-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailsComponent,
    ViewGamesComponent,
    UploadGameComponent,
    EditGameComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
          {path: 'view-games', component: ViewGamesComponent},
          {path: 'game-details/:igraID', component: GameDetailsComponent},
          {path: 'upload-game', component: UploadGameComponent},
          {path: 'edit-game/:igraID', component: EditGameComponent},
        ]),
        FormsModule,
      CommonModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
