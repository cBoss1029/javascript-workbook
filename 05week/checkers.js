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
    this.checkers = 24;
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

  playerStartingPositions() {
    const checker = new Checker();
    const p1 = checker.symbol2;
    const p2 = checker.symbol1;
    this.grid.forEach((row, index) => {
      if (index % 2 === 0 && index < 3) {
        this.grid[index] = [null, p1, null, p1, null, p1, null, p1];
      } else if (index > 2 && index < 5) {
        this.grid[index] = [null, null, null, null, null, null, null, null];
      } else if (index % 2 === 0 && index > 4) {
        this.grid[index] = [null, p2, null, p2, null, p2, null, p2];
      } else if (index % 2 !== 0 && index < 3) {
        this.grid[index] = [p1, null, p1, null, p1, null, p1, null];
      } else if (index % 2 !== 0 && index > 4) {
        this.grid[index] = [p2, null, p2, null, p2, null, p2, null];
      }
    })
    console.log(this.grid);
  }

}

class Game {
  constructor() {

    this.board = new Board();
    this.playerTurn = 'A';
    this.player1ClaimedPieces = 0;
    this.player2ClaimedPieces = 0;
  }
  start() {
    this.board.createGrid();

    // Your code here
    this.board.playerStartingPositions();

  }
  stringToNumber(str) {
    str = str.split('');
    str.forEach((item) => {
      parseInt(item);
    })
    return str;
  }
  moveChecker(whichPiece, toWhere) {
    whichPiece = whichPiece.split('').map(Number);
    toWhere = toWhere.split('').map(Number);
    if (this.isLegalMove(whichPiece, toWhere) && this.jumpedPiece(whichPiece, toWhere)) {
      if (this.playerTurn === 'A') {
        if (whichPiece[1] < toWhere[1]) {
          this.board.grid[toWhere[0]-1][toWhere[1]-1] = null;
        } else if (whichPiece[1] > toWhere[1]) {
          this.board.grid[toWhere[0]-1][toWhere[1]+1] = null;
        }
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.board.grid[toWhere[0]][toWhere[1]] = this.playerTurn;
        this.player1ClaimedPieces ++;
        this.playerTurn = 'B'
        console.log(this.board.grid);
        // console.log(game.board.checkers.length);
        console.log(this.player1ClaimedPieces);

      } else {
        if (whichPiece[1] < toWhere[1]) {
          this.board.grid[toWhere[0]+1][toWhere[1]-1] = null;
        } else if (whichPiece[1] > toWhere[1]) {
          this.board.grid[toWhere[0]+1][toWhere[1]+1] = null;
        }
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.board.grid[toWhere[0]][toWhere[1]] = this.playerTurn;
        this.player2ClaimedPieces ++;
        this.playerTurn = 'A'
        console.log(this.board.grid);
        console.log(this.player2ClaimedPieces);


      }
    } else if (this.isLegalMove(whichPiece, toWhere)) {
      if (this.playerTurn === 'A') {
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.board.grid[toWhere[0]][toWhere[1]] = this.playerTurn;
        this.playerTurn = 'B'
        console.log(this.board.grid);
        console.log(game.board.checkers.length);

      } else {
        this.board.grid[whichPiece[0]][whichPiece[1]] = null;
        this.board.grid[toWhere[0]][toWhere[1]] = this.playerTurn;
        this.playerTurn = 'A'
        console.log(this.board.grid);

      }
    }

  }
  jumpedPiece(whichPiece, toWhere) {
    if(this.playerTurn === 'A' &&
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
      console.log('Unable to move.', whichPiece[0], whichPiece);

      return false;
    }
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
