import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  styleUrls: ['./game-controls.component.scss'],
  template: `
  <div id="game-toggle">
    <button class="leftbuttons" id="player">Player</button>
    <button class="leftbuttons" id="spymaster">Spymaster</button>
    <button id="new-game">New Game</button>
  </div>
  `,
})
export class GameControlsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
