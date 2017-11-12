import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GameService, BoardDone, Winning } from '../../services/game.service';

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

    this.gameService.winningPositions$.subscribe((winning:Winning)=>{
        if(winning.id === this.id){
            this.winnerCells = winning.cells;
        }
    });
  }

  move(position) {

    if (this.disabled){
      return;
    }

    if (!this.winner && !this.cells[position] ) {

      this.cells[position] = this.player;

      if (this.gameService.isWinningMove(this.cells, this.id)) {
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
}
