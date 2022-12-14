const playerFactory = function(char, name) {
  let wins = 0;
  return {char, name, wins}
}

const gameModule = (function (){
  const playerArray = [playerFactory('X'), playerFactory('O')]
  let turnIndex = 0;
  let playerIndex = 0;
  let currentPlayer = playerArray[turnIndex];
  let winner;
  const gridItems = Array.from(document.querySelectorAll('.grid-item'));

  const startGame = function() {
    addClickEvents();
    interfaceHandler.updateDisplay();
  }

  const resetGame = function() {
    addClickEvents();
    board.resetBoard();
    interfaceHandler.toggleReset();
    interfaceHandler.updateDisplay();
  }
  
  const rotatePlayers = function(index) {
    console.log(index);
    if (index != null) {
      turnIndex = index;
      currentPlayer = playerArray[turnIndex];
    } else {
      currentPlayer = playerArray[turnIndex = turnIndex == 0 ? 1 : 0];
    }
  }

  const interfaceHandler = (function() {
    const mainSection = document.querySelector('.main-section');
    const gameSection = document.querySelector('.game-section');
    const display = document.querySelector('.display');
    const resetButton = document.querySelector('.reset');
    const xWinDisplay = document.querySelector('.x');
    const oWinDisplay = document.querySelector('.o');
    const playerButton = document.querySelector('.player');
    const computerButton = document.querySelector('.computer');
    const selectXButton = document.querySelector('.select-x');
    const selectOButton = document.querySelector('.select-o');
  
    resetButton.addEventListener('click', resetGame);

    playerButton.addEventListener('click', () => {
      rotatePlayers(playerIndex);
      mainSection.classList.toggle('hidden')
      gameSection.classList.toggle('hidden')
      startGame();
    })

    selectXButton.addEventListener('click', () => {
      playerIndex = 0;
      if (selectXButton.classList.contains(".player-selected") != true) {
        selectXButton.classList.add('player-selected');
        selectOButton.classList.remove('player-selected');
      }
    });

    selectOButton.addEventListener('click', () => {
      playerIndex = 1;
      if (!selectOButton.classList.contains(".player-selected" != true)) {
        selectOButton.classList.add('player-selected');
        selectXButton.classList.remove('player-selected');
      }
    });

    const gameEnd = function(result) {
      toggleReset();
      if (result == 'tie') {
        display.textContent = "Tie";
      } else {
        display.textContent = `Winner: ${currentPlayer.char}`;
        xWinDisplay.textContent = `X: ${playerArray[0].wins}`;
        oWinDisplay.textContent = `O: ${playerArray[1].wins}`;
      }
    }

    const updateDisplay = function() {
      display.textContent = `${currentPlayer.char}\'s turn`;
    }

    const toggleReset = function() {
      resetButton.classList.toggle('hidden');
    }

    return {gameEnd, toggleReset, updateDisplay};
  })();

  const board = (function() {
    // the 9 array items represent 3 rows and 3 columns. Index of 0 is row and column 1. index of 2 is row 2, column 1
    const boardArray = Array(9);
    let round = 0;
  
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
      if (winner && !(round == 9)) {
        round = 0;
        return winner
      }
      round++;
      if (round == 9) {
        round = 0;
        return 'tie';
      }
    }
  
    const checkVertical = function() {
      for (let i = 0; i <= 2; i++) {
        let patternArr = [];
        for (let j = 0; j <= 6; j += 3) {
          patternArr.push(boardArray[i + j])
        }
  
        if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return true;
      }
    }
  
    const checkHorizontal = function() {
      for (let i = 0; i <= 6; i += 3) {
        let patternArr = [];
        for (let j = 0; j <= 2; j++) {
          patternArr.push(boardArray[i + j]);
        }
  
        if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return true;
      }
    }
  
    const checkDiagonal = function() {
      //Top left to bottom right
      let patternArr = [];
      for (let i = 0; i <= 8; i += 4) {
        patternArr.push(boardArray[i]);
      }
      if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return true;
      patternArr = [];
  
      //Top right to bottom left
      for (let i = 2; i <= 6; i += 2) {
        patternArr.push(boardArray[i]);
      }
      if (patternArr[0] && patternArr.every(x => x == patternArr[0])) return true;
    }
  
    const resetBoard = function() {
      for (let i = 0; i < boardArray.length; i++) {
        boardArray[i] = null;
      }
    }
  
    return {boardArray, markSquare, checkBoard, resetBoard};
  })();

  const addClickEvents = function() {
    gridItems.forEach((item) => {
      item.querySelector('p').textContent = '';
      item.addEventListener('click', markItemEvent, {once: true});
    });
  }

  const markItemEvent = function(e) {
    const char = currentPlayer.char;
    const item = e.target;

    item.querySelector('p').textContent = char;
    board.markSquare(char, gridItems.indexOf(item));

    const result = board.checkBoard();
    if (result) {
      console.log(result)
      gameEnd(result);
    } else {
      rotatePlayers();
      interfaceHandler.updateDisplay();
    }
  }

  const gameEnd = function(result) {
    removeItemEvents()
    if (result == true) {
      ++currentPlayer.wins;
    } else {
      rotatePlayers();
    }
    interfaceHandler.gameEnd(result);
  }

  const removeItemEvents = function() {
    gridItems.forEach((item, gridIndex) => {
      item.removeEventListener('click', markItemEvent);
    });
  }
})();