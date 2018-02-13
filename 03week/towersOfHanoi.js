'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
const movePiece = (startStack, endStack) => {
  // Your code here
  const pieceToMove = stacks[startStack].pop();
  stacks[endStack].push(pieceToMove);

}

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

getPrompt();
