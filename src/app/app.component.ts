import { Component, OnInit } from '@angular/core';
import { GameService, BoardDone } from './services/game.service';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit{

  boards: string[];
  gameWinner: string;
  currentBoard: number;
  player: string;
  enableAll: boolean;

  constructor(private gameService: GameService){

  }

  ngOnInit(){
    this.restartGame();
  }

  handleBoardDone(boardData: BoardDone){
    this.boards[boardData.id] = boardData.winner;

    if(this.gameService.isWinningMove(this.boards)){
      this.gameWinner = this.player;
    }
  }

  handleNextStep(position:number){

    if(this.gameWinner){
      setTimeout(()=>alert(this.player + ' Has won the game!!!'));
      return;
    }

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
    this.gameWinner = null;
    this.gameService.restartGame();
  }
}
