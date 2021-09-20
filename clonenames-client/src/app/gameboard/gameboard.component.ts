import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameboard',
  styleUrls: ['./gameboard.component.scss'],
  template: `
  <div id="app">
    <div id="topbar">
      <h1>
          <a href="index.html">clonenames</a>
      </h1>
    </div>
    
    <div id="game">
      <app-game-status></app-game-status>
      <app-board></app-board>
      <app-game-controls></app-game-controls>
    </div>
  </div>  
  <div id="rules"><a href="https://en.wikipedia.org/wiki/Codenames_(board_game)#Rules" target="_blank">rules</a></div>
  <div id="github"><a href="https://github.com/coinerwh/Clonenames" target="_blank"><i class="fa fa-github fa_custom fa-4x"></i></a></div>
  `,
})
export class GameboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}