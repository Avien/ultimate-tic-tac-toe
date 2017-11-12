import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonal
];

export class BoardDone{
  winner:string;
  id: number;
}

export class Winning{
  cells: number[];
  id?: number;
}

@Injectable()
export class GameService {

  restartGame$: Observable<any>;
  private restartGameSource = new BehaviorSubject<void>(null);

  winningPositions$: Observable<any>;
  private winningPositionsSource = new Subject<Winning>();

  constructor() {
    this.restartGame$ = this.restartGameSource.asObservable();
    this.winningPositions$ = this.winningPositionsSource.asObservable();

  }

  restartGame() {
    this.restartGameSource.next(null);
  }

  isWinningMove(grid: string[], boardId?: number): boolean {
    for (const condition of winningConditions) {
      if (grid[condition[0]]
        && grid[condition[0]] === grid[condition[1]]
        && grid[condition[1]] === grid[condition[2]]) {

        this.winningPositionsSource.next({
           cells:[condition[0], condition[1], condition[2]],
           id:boardId
        });

        return true;
      }
    }
    return false;
  }
}
