const playerFactory = function(char) {
  let losses = 0;
  let wins = 0;
  return {char, losses, wins}
}

const boardModule = (function() {
  // the 9 array items represent 3 rows and 3 columns. Index of 0 is row and column 1. index of 2 is row 2, column 1
  const boardArray = Array(9);

  const markSquare = function(strChar, intIndex) {
    if (intIndex <= 8 && boardArray[intIndex] == null) {
      boardArray[intIndex] = strChar;
      return boardArray;
    } else {
      console.log(`Index ${intIndex} not found or claimed already.`);
    }
  }

  const checkBoard = function() {
    let winner = checkHorizontal() || checkVertical() || checkDiagonal();
    return winner;
  }

  const checkVertical = function() {
    for (let i = 0; i <= 2; i++) {
      let patternArr = [];
      for (let j = 0; j <= 6; j += 3) {
        patternArr.push(boardArray[i + j])
      }

      if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return patternArr[0];
    }
  }

  const checkHorizontal = function() {
    for (let i = 0; i <= 6; i += 3) {
      let patternArr = [];
      for (let j = 0; j <= 2; j++) {
        patternArr.push(boardArray[i + j]);
      }

      if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return patternArr[0];
    }
  }

  const checkDiagonal = function() {
    //Top left to bottom right
    let patternArr = [];
    for (let i = 0; i <= 8; i += 4) {
      patternArr.push(boardArray[i]);
    }
    if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return patternArr[0];
    patternArr = [];

    //Top right to bottom left
    for (let i = 2; i <= 6; i += 2) {
      patternArr.push(boardArray[i]);
    }
    if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return patternArr[0];
  }

  const resetBoard = () => boardArray = [];

  return {boardArray, markSquare, checkBoard};
})();

const gameModule = (function (){
  const playerOne = playerFactory('X');
  const playerTwo = playerFactory('O');
  const board = boardModule;

  const initiateGame = function() {

  }

  return {initiateGame, board};
})();

const game = gameModule;
game.initiateGame();