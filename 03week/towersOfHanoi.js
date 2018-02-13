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

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Your code here
  const pieceToMove = stacks[startStack].pop();
  // console.log(pieceToMove);
  stacks[endStack].push(pieceToMove);

}

function isLegal(startStack, endStack) {
  // Your code here
  console.log('test');
  console.log(stacks[startStack][stacks[startStack].length-1])
  // console.log(stacks[endStack].length);
  // console.log(stacks[startStack].length);
  // const secondStack = stacks[endStack].length;
  // console.log(secondStack);
  if (stacks[endStack].length === 0){
    return true;
  } else if (stacks[startStack][stacks[startStack].length-1] >
    stacks[endStack][stacks[endStack].length-1]) {
      console.log('false dude');
    return false;
  } else if (stacks[startStack][stacks[startStack].length-1] <
  stacks[endStack][stacks[endStack].length-1]){
    console.log('true dude');
    return true;
  } else if (stacks[startStack].length === 0){
    console.log('nothing to move');
    return false;
  }
}

function checkForWin() {
  // Your code here
  

}

function towersOfHanoi(startStack, endStack) {
  // Your code here
  isLegal(startStack, endStack);
  movePiece(startStack,endStack)
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

getPrompt();
