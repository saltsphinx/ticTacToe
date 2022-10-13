const gameModule = (function (){
  const playerFactory = function(name, char) {
    let losses = 0;
    let wins = 0;
    return {name, char, losses, wins}
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
      //m stands for multiple and represents the row, and increments by 3 for the horiziontal pattern
      let m = 0;
      let patternArr = [];

      while (m <= 6) {
        // i stands for increment(1) and represents the column
        for (let i = 0; i <= 2; i++) {
          patternArr.push(boardArray[m + i]);
        }

        console.log(patternArr);
        if (patternArr[0] && patternArr.every(x => x == patternArr[0])) console.log("win");
        patternArr = [];
        m += 3;
      }
    }

    return {boardArray, markSquare, checkBoard};
  })();

  const initiateGame = function() {

  }

  return {initiateGame, playerFactory, boardModule};
})();

const game = gameModule;
game.initiateGame();