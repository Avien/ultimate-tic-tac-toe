import {Component, OnInit} from '@angular/core';
import {GameService, Board} from './services/game.service';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit{

  boards: string[];
  winnerBoards: number[];
  gameWinner: string;
  currentBoard: number;
  player: string;
  enableAll: boolean;

  constructor(private gameService: GameService){

  }

  ngOnInit(){
    this.restartGame();
  }

  handleBoardDone(boardData: Board){
    this.boards[boardData.id] = boardData.winner;

    if(this.gameService.isWinningMove(this.boards)){
      alert(this.player + ' Has won the game!!!');
    }
  }

  handleNextStep(position:number){

    this.player = this.player === 'X' ? 'O' : 'X';

    if(this.boards[position]){
      this.enableAll = true;
    }else{
      this.enableAll = false;
      this.currentBoard = position;
    }
  }

  restartGame(){
    this.currentBoard = 4;
    this.enableAll = true;
    this.boards = Array(9).fill(null);
    this.player = 'X';
    this.gameService.restartGame();
  }
}
