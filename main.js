"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// An object that represents the three stacks of Towers of Hanoi;
// each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

// Function to print the current state of stacks
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

// Function to move a piece from one stack to another
const movePiece = (startStack, endStack) => {
  // Pop the piece from the start stack and push it onto the end stack
  let piece = stacks[startStack].pop();
  stacks[endStack].push(piece);
};

// Function to check if the move is legal
const isLegal = (startStack, endStack) => {
  // Get the last piece on the start and end stacks
  let startPiece = stacks[startStack][stacks[startStack].length - 1];
  let endPiece = stacks[endStack][stacks[endStack].length - 1];

  // A move is legal if the start stack is not empty and
  // (the end stack is empty or the top piece of the end stack is larger than the piece being moved)
  if (!startPiece) {
    return false;
  }
  if (!endPiece || startPiece < endPiece) {
    return true;
  } else {
    return false;
  }
};

// Function to check for a win
const checkForWin = () => {
  // The player wins if stack b or stack c has all the pieces in the correct order
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    return true;
  } else {
    return false;
  }
};

// Main function to play the game
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    if (checkForWin()) {
      console.log("You win!");
      process.exit(); // Exit the game after a win
    }
  } else {
    console.log("Invalid move. Try again.");
  }
};

// Function to get user input and start the game
const getPrompt = () => {
  printStacks();
  rl.question("start stack: ", (startStack) => {
    rl.question("end stack: ", (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// Tests
if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      stacks = { a: [4, 3, 2, 1], b: [], c: [] };
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });

  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
