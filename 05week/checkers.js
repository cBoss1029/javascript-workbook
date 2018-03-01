'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  // Your code here
  constructor() {
    this.symbol1 = 'B';
    this.symbol2 = 'A';
  }

}

class Board {
  constructor() {

    this.grid = [];
    this.checkers = [];

    // creates an 8x8 array, filled with null values

  }
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        const checker = new Checker();


        this.grid[row].push(null);


      }

    }
  }

  // prints out the board
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";

    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array

          rowOfCheckers.push(this.grid[row][column]);


        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }

      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  //Everything works, but I am aware it is in need of some serious refactoring.
  //which I will do in the future.  I am very tired.
  playerStartingPositions() {
    const checker = new Checker();

    this.grid.forEach((row, index1) => {
      row.forEach((column, index2) => {
        if (index1 % 2 === 0 && index1 < 3) {
          if (index2 % 2 !== 0) {
            this.grid[index1][index2] = checker.symbol1;
            this.checkers.push(this.grid[index1][index2]);
          }
        } else if (index1 % 2 !== 0 && index1 < 3) {
          if (index2 % 2 === 0) {
            this.grid[index1][index2] = checker.symbol1;
            this.checkers.push(this.grid[index1][index2])
          }
        } else if (index1 % 2 === 0 && index1 > 4) {
          if (index2 % 2 !== 0) {
            this.grid[index1][index2] = checker.symbol2;
            this.checkers.push(this.grid[index1][index2])
          }
        } else if (index1 % 2 !== 0 && index1 > 4) {
          if (index2 % 2 === 0) {
            this.grid[index1][index2] = checker.symbol2;
            this.checkers.push(this.grid[index1][index2])
          }
        }
      })

    })

  }
}

class Game {
  constructor() {

    this.board = new Board();
    this.playerTurn = 'B';
    /*be aware (and I'm not sure how this happened) player 'B' is player 1 and is represented
                                 on the board as 'A', and vice versa.*/
    this.player1ClaimedPieces = 0;
    this.player2ClaimedPieces = 0;
    this.player1IllegalMoves = 0;
    this.player2IllegalMoves = 0;
  }
  start() {
    this.board.createGrid();

    // Your code here
    this.board.playerStartingPositions();

  }

  moveChecker(whichPiece, toWhere) {
    whichPiece = whichPiece.split('').map(Number);
    toWhere = toWhere.split('').map(Number);
    if (this.isLegalMove(whichPiece, toWhere) && this.jumpedPiece(whichPiece, toWhere)) {
      if (this.playerTurn === 'A') { //if player 2 jumps. . .
        if (whichPiece[1] < toWhere[1]) { //. . .down and to the right
          this.board.grid[toWhere[0] - 1][toWhere[1] - 1] = null;
        } else if (whichPiece[1] > toWhere[1]) { //. . .or down and to the left
          this.board.grid[toWhere[0] - 1][toWhere[1] + 1] = null;
        }
        this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]];
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.player2ClaimedPieces++;
        this.board.checkers.shift();
        this.playerTurn = 'B'
        this.player2IllegalMoves = 0;


      } else { // player 1
        if (whichPiece[1] < toWhere[1]) { //. . .up and to the right
          this.board.grid[toWhere[0] + 1][toWhere[1] - 1] = null;
        } else if (whichPiece[1] > toWhere[1]) { //. . .up and to the left
          this.board.grid[toWhere[0] + 1][toWhere[1] + 1] = null;
        }
        this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]];
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.player1ClaimedPieces++;
        this.board.checkers.shift();
        this.playerTurn = 'A'
        this.player1IllegalMoves = 0;


      }
    } else if (this.isLegalMove(whichPiece, toWhere)) {
      if (this.playerTurn === 'A') {
        this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]];
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.playerTurn = 'B'
        this.player2IllegalMoves = 0;

      } else {
        this.board.grid[toWhere[0]][toWhere[1]] = this.board.grid[whichPiece[0]][whichPiece[1]];
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.playerTurn = 'A'
        this.player1IllegalMoves = 0;

      }
    } else {
      console.log('Unable to move.');

      this.playerIllegalMoveCounter(whichPiece, toWhere);
      this.checkForWin();

    }

  }
  jumpedPiece(whichPiece, toWhere) {
    if (this.playerTurn === 'A' &&
      toWhere[0] - whichPiece[0] === 2 &&
      !this.board.grid[toWhere[0]][toWhere[1]]) {
      return true;
    } else if (this.playerTurn === 'B' &&
      whichPiece[0] - toWhere[0] === 2 &&
      !this.board.grid[toWhere[0]][toWhere[1]]) {
      return true;
    } else {
      return false;
    }
  }
  isLegalMove(whichPiece, toWhere) {
    if (this.playerTurn === 'A' &&
      whichPiece[0] < toWhere[0] &&
      !this.board.grid[toWhere[0]][toWhere[1]]) {
      return true;
    } else if (this.playerTurn === 'B' &&
      whichPiece[0] > toWhere[0] &&
      !this.board.grid[toWhere[0]][toWhere[1]]) {
      return true;
    } else {

      return false;
    }
  }
  playerIllegalMoveCounter(whichPiece, toWhere) {
    const legalMove = this.isLegalMove(whichPiece, toWhere);
    if (this.playerTurn === 'A' && !legalMove) {
      this.player2IllegalMoves++;
      console.log(this.player2IllegalMoves, 'p2 illegal moves');
    } else if (this.playerTurn === 'B' && !legalMove) {
      this.player1IllegalMoves++;
      console.log(this.player1IllegalMoves, 'p1 illegal moves');

    }
  }
  checkForWin() {
    if (this.playerTurn === 'A' && this.player2ClaimedPieces === 12) {
      console.log('Player 2 wins!!');
      this.resetGame();
    } else if (this.playerTurn === 'A' && this.player2IllegalMoves === 12 - this.player1ClaimedPieces) {
      console.log('Player 1 wins!!');
      this.resetGame();
    } else if (this.playerTurn === 'B' && this.player1ClaimedPieces === 12) {
      console.log('Player 1 wins!!');
      this.resetGame();
    } else if (this.playerTurn === 'B' && this.player1IllegalMoves === 12 - this.player2ClaimedPieces) {
      console.log('Player 2 wins!!');
      this.resetGame();
    }
  }
  resetGame() {
    this.playerTurn = 'B';
    this.player1ClaimedPieces = 0;
    this.player2ClaimedPieces = 0;
    this.player1IllegalMoves = 0;
    this.player2IllegalMoves = 0;
    this.board.createGrid();
    this.board.playerStartingPositions();

  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function() {
    it('should move a checker', function() {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
