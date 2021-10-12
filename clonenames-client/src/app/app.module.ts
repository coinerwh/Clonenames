import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GameStatusComponent } from './gameboard/game-status/game-status.component';
import { BoardComponent } from './gameboard/board/board.component';
import { GameControlsComponent } from './gameboard/game-controls/game-controls.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

let port = (window.location.hostname === 'localhost') ? ':8000' : '';
let url = `${window.location.protocol}//${window.location.hostname}${port}`;
const config: SocketIoConfig = { url: url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    GameStatusComponent,
    BoardComponent,
    GameControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
