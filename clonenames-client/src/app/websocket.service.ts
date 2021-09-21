import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface GameState {
  turn: string;
  winner: string;
  points: number[];
  cells: Cells;
}

// {'turn': this.turn, 'winner': this.winner, 'points': this.points, 'cells': this.cells}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public observable?: Observable<unknown>;

  constructor(private socket: Socket) {}

  sendCellClick(cell: string) {
    this.socket.emit('cellClick', cell);
  }

  sendButton(button: string) {
    this.socket.emit('button', button);
  }

  getGameState() {
    return this.socket
        .fromEvent<GameState>('gamestate').pipe(
        map(data => data));
  }
}

export interface Cells {
  cell1: (string|boolean)[];
  cell2: (string|boolean)[];
  cell3: (string|boolean)[];
  cell4: (string|boolean)[];
  cell5: (string|boolean)[];
  cell6: (string|boolean)[];
  cell7: (string|boolean)[];
  cell8: (string|boolean)[];
  cell9: (string|boolean)[];
  cell10: (string|boolean)[];
  cell11: (string|boolean)[];
  cell12: (string|boolean)[];
  cell13: (string|boolean)[];
  cell14: (string|boolean)[];
  cell15: (string|boolean)[];
  cell16: (string|boolean)[];
  cell17: (string|boolean)[];
  cell18: (string|boolean)[];
  cell19: (string|boolean)[];
  cell20: (string|boolean)[];
  cell21: (string|boolean)[];
  cell22: (string|boolean)[];
  cell23: (string|boolean)[];
  cell24: (string|boolean)[];
  cell25: (string|boolean)[];
}