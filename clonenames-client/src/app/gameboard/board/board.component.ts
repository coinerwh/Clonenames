import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  styleUrls: ['./board.component.scss'],
  template: `
    <div class="board">
      <div id='cell1' class="cell hidden"></div>
      <div id='cell2' class="cell hidden"></div>
      <div id='cell3' class="cell hidden"></div>
      <div id='cell4' class="cell hidden"></div>
      <div id='cell5' class="cell hidden"></div>
      <div id='cell6' class="cell hidden"></div>
      <div id='cell7' class="cell hidden"></div>
      <div id='cell8' class="cell hidden"></div>
      <div id='cell9' class="cell hidden"></div>
      <div id='cell10' class="cell hidden"></div>
      <div id='cell11' class="cell hidden"></div>
      <div id='cell12' class="cell hidden"></div>
      <div id='cell13' class="cell hidden"></div>
      <div id='cell14' class="cell hidden"></div>
      <div id='cell15' class="cell hidden"></div>
      <div id='cell16' class="cell hidden"></div>
      <div id='cell17' class="cell hidden"></div>
      <div id='cell18' class="cell hidden"></div>
      <div id='cell19' class="cell hidden"></div>
      <div id='cell20' class="cell hidden"></div>
      <div id='cell21' class="cell hidden"></div>
      <div id='cell22' class="cell hidden"></div>
      <div id='cell23' class="cell hidden"></div>
      <div id='cell24' class="cell hidden"></div>
      <div id='cell25' class="cell hidden"></div>
    </div>
  `,
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
