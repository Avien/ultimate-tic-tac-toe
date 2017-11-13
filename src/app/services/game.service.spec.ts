import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {

  let gameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
  });

  beforeEach(
    inject([GameService], (_gameService) => {
      gameService = _gameService;
    }),
  );

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  it('should return true for these winning conditions', ()=>{
    let grid = Array(9).fill(null);
    grid[0] = grid[1] = grid[2] = 'X';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeTruthy();

    grid = Array(9).fill(null);
    grid[3] = grid[4] = grid[5] = 'O';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeTruthy();

    grid = Array(9).fill(null);
    grid[2] = grid[4] = grid[6] = 'O';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeTruthy();

    grid = Array(9).fill(null);
    grid[2] = grid[5] = grid[8] = 'X';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeTruthy();
  });

  it('should return false for these winning conditions', ()=>{
    let grid = Array(9).fill(null);
    grid[0] = grid[1] = grid[3] = 'X';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeFalsy();

    grid = Array(9).fill(null);
    grid[3] = grid[4] = grid[6] = 'O';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeFalsy();

    grid = Array(9).fill(null);
    grid[1] = grid[4] = grid[6] = 'O';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeFalsy();

    grid = Array(9).fill(null);
    grid[2] = grid[6] = grid[8] = 'X';
    console.log(grid);
    expect(gameService.isWinningMove(grid)).toBeFalsy();
  });
});
