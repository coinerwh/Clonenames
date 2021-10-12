import { Component, OnInit } from '@angular/core';
import { GameState, WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-game-status',
  styleUrls: ['./game-status.component.scss'],
  template: `
    <div id="game-status">
      <div id="score">
          <span id=bluescore>{{this.points[0]}}</span><span id="dash">-</span><span id=redscore>{{this.points[1]}}</span> 
      </div>
      <div id="status">
        {{this.turn}}'s turn
      </div>
      <div id="endturn">
          <button id="turnbutton">End Turn</button>
      </div>
    </div>
  `,
})
export class GameStatusComponent implements OnInit {
  turn = "blue";
  points: number[];
  winner?: string;

  constructor(socket: WebsocketService) {
    this.points = [0,0];
    socket.getGameState().subscribe(state => {
      console.log(state);
      this.turn = state.turn;
      if (state.points != undefined) {
        this.points = state.points;
        console.log(this.points);
      }
      this.winner = this.winner;
    });
   }

  ngOnInit(): void {
  }

}
