import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GameService, BoardDone } from '../../services/game.service';

@Component({
  selector: 'board',
  templateUrl: './board.html',
  styleUrls: ['./board.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {

  cells: string[];
  winnerCells: number[];
  winner: string;
  finished: boolean;

  @Input() id: number;
  @Input() disabled: boolean;
  @Input() player: string;
  @Output() done: EventEmitter<BoardDone> = new EventEmitter();
  @Output() nextStep: EventEmitter<number> = new EventEmitter();

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.restartGame$.subscribe(() => this.resetBoard());
    this.gameService.winningPositions$.subscribe((positions:number[])=>this.winnerCells = positions);
  }

  move(position) {

    if (this.disabled){
      return;
    }

    if (!this.winner && !this.cells[position] ) {

      this.cells[position] = this.player;

      if (this.gameService.isWinningMove(this.cells)) {
        this.winner = this.player;
        this.emitBoardDone();

      }else if (!this.cells.includes(null)){  // tie
        this.emitBoardDone();
      }

      this.nextStep.emit(position);
    }
  }

  get status(): string{
    if(this.winner){
      return `Player ${this.winner} has won!`;
    }else if(this.finished){
      return 'Tie!';
    }

    return `Player ${this.player}'s turn`;
  }

  private emitBoardDone(){
    this.done.emit({winner: this.winner, id: this.id});
    this.disabled = true;
    this.finished = true;
  }

  private resetBoard() {
    this.cells = Array(9).fill(null);
    this.winner = null;
    this.winnerCells = [];
    this.finished = false;
  }



  /*private isWinningMove(): boolean {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonal
    ];
      for (const condition of conditions) {
        if ( this.cells[condition[0]]
          && this.cells[condition[0]] === this.cells[condition[1]]
          && this.cells[condition[1]] === this.cells[condition[2]]) {
          this.winnerCells.push(condition[0], condition[1], condition[2]);
          return true;
        }
    }
    return false;
  }*/
}
