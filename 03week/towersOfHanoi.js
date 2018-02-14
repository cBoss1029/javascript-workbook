'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* objective: move 4 stacked pieces from one 'tower' to another ending in the same order they started.
rules:
-can only move one piece at a time
-can only stack a piece on top another piece of higher value
-game is over when whole stack is moved to another 'tower' and is in the same
order it started as [4, 3, 2, 1]*/

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
const resetStacks = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

/*move pieces:
-take two parameters (startStack, endStack)
-.pop() last value off of startStack, store it
-.push() stored value to endStack*/
const movePiece = (startStack, endStack) => {
  // Your code here
  const pieceToMove = stacks[startStack].pop();
  stacks[endStack].push(pieceToMove);

}

/*check if move is legal:
-two parameters (startStack, endStack)
-if endStack is empty, return true
-if endStack is not empty, compare values of the last object in startStack
 and the last value of endStack. If the last value of endStack
 is greater than the last value of startStack, return true. Otherwise return false.*/
const isLegal = (startStack, endStack) => {
  // Your code here
  if (stacks[endStack].length === 0) {
    return true;
  } else if (stacks[startStack][stacks[startStack].length - 1] >
    stacks[endStack][stacks[endStack].length - 1]) {
    return false;
  } else if (stacks[startStack][stacks[startStack].length - 1] <
    stacks[endStack][stacks[endStack].length - 1]) {
    return true;
  } else if (stacks[startStack].length === 0) {
    return false;
  }
}

/*Assuming all moves are legal, a win happens when all four pieces are in either
stack b or c. To check for a win, check the length of stacks b and c.  If the length
of either one is equal to the number of pieces (4), then the game is won.*/
const checkForWin = () => {
  // Your code here
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    resetStacks();
    return 'You win!';


  }

}

const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
  } else {
    return 'Invalid input';
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}


// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should move a piece from one stack to another', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
    it('should make sure a move is legal', () => {
      stacks = { a: [4, 3, 2], b: [1], c: [] }
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should check for a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), 'You win!');
    });
  });
} else {

  getPrompt();

}
