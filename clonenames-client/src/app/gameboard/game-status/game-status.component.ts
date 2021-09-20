import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-status',
  styleUrls: ['./game-status.component.scss'],
  template: `
    <div id="game-status">
      <div id="score">
          <span id=bluescore>7</span><span id="dash">-</span><span id=redscore>7</span> 
      </div>
      <div id="status">
          blue's turn
      </div>
      <div id="endturn">
          <button id="turnbutton">End Turn</button>
      </div>
    </div>
  `,
})
export class GameStatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
