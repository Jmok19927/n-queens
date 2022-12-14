/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution;
  //arguments board + row;
  var helper = function (boardState, currentRow, piecesPlaced, conflictRows, conflictCols) {
    var rowCheck = conflictRows || new Array(n);
    var colCheck = conflictCols || new Array(n);
    var row = currentRow;
    var count = piecesPlaced;
    for (let col = 0; col < n; col++) {
    //with the new row, for each spot in the row, try to place a piece;
      boardState.togglePiece(row, col);
    //if piece is valid go down;
      if (rowCheck[row] || colCheck[col]) {
        //if conflict, take off the piece, and continue to the next column
        boardState.togglePiece(row, col);
        continue;
      } else {
        count++;
        if (count === n) {
          solution = boardState.rows();
          break;
        }
        rowCheck[row] = 1;
        colCheck[col] = 1;
        helper(boardState, row + 1, count, rowCheck, colCheck);
      }
    }
  }
  helper(board, 0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //var solutions = []; unecessary memory for just counting, but good for visualizing all boards
  var solutionCount = 0;
  // make the board of size n
  var board = new Board({n: n});
  //arguments board + row;
  var helper = function (boardState, currentRow, piecesPlaced, conflictRows, conflictCols) {
    var rowCheck = conflictRows || new Array(n);
    var colCheck = conflictCols || new Array(n);
    var row = currentRow;
    var count = piecesPlaced;
    for (let col = 0; col < n; col++) {
    //with the new row, for each spot in the row, try to place a piece;
      boardState.togglePiece(row, col);
    //if piece is valid go down;
      if (rowCheck[row] || colCheck[col]) {
        //if conflict, take off the piece, and continue to the next column
        boardState.togglePiece(row, col);
        continue;
      } else {
        count++;
        if (count === n) {
          //var newBoard = {...boardState};
          //solutions.push(newBoard); unecessary memory for just counting, but good for visualizing all boards
          solutionCount++;
          boardState.togglePiece(row, col);
          count--;
          continue;
        }
        rowCheck[row] = 1;
        colCheck[col] = 1;
        helper(boardState, row + 1, count, rowCheck, colCheck);
        rowCheck[row] = 0;
        colCheck[col] = 0;
        boardState.togglePiece(row, col);
        count--;
      }
    }
  }
  helper(board, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution;
  if (n === 0) {
    return [];
  }
  let queenHelper = function (boardState, currentRow, piecesPlaced, conflictRows, conflictCols, conflictMajor, conflictMinor) {
    var rowCheck = conflictRows || new Array(n);
    var colCheck = conflictCols || new Array(n);
    var maxDiagIndex = (2 * n) - 1;
    var majorCheck = conflictMajor || new Array(maxDiagIndex);
    var minorCheck = conflictMinor || new Array(maxDiagIndex);
    var row = currentRow;
    var count = piecesPlaced;
    for (let col = 0; col < n; col++) {
      var majorIndex = col - row + n - 1;
      var minorIndex = col + row;
    //with the new row, for each spot in the row, try to place a piece;
      boardState.togglePiece(row, col);
    //if piece is valid go down;
      if (rowCheck[row] || colCheck[col] || majorCheck[majorIndex] || minorCheck[minorIndex]) {
        //if conflict, take off the piece, and continue to the next column
        boardState.togglePiece(row, col);
        continue;
      } else {
        count++;
        if (count === n) {
          solution = boardState.rows();
          break;
        }
        rowCheck[row] = 1;
        colCheck[col] = 1;
        majorCheck[majorIndex] = 1;
        minorCheck[minorIndex] = 1;
        queenHelper(boardState, row + 1, count, rowCheck, colCheck, majorCheck, minorCheck);
        if (solution === undefined){
          rowCheck[row] = 0; //add major minor back to 0;
          colCheck[col] = 0;
          majorCheck[majorIndex] = 0;
          minorCheck[minorIndex] = 0;
          boardState.togglePiece(row, col);
          count--;
        }
      }
    }
  }
  queenHelper(board, 0, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution || new Board({n : n}).rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  if (n === 0) {
    return 1;
  }
  // make the board of size n
  var board = new Board({n: n});
  //arguments board + row;
  var queenHelper = function (boardState, currentRow, piecesPlaced, conflictRows, conflictCols, conflictMajor, conflictMinor) { // add minor major
    var rowCheck = conflictRows || new Array(n);
    var colCheck = conflictCols || new Array(n);
    var maxDiagIndex = (2 * n) - 1;
    var majorCheck = conflictMajor || new Array(maxDiagIndex);
    var minorCheck = conflictMinor || new Array(maxDiagIndex);
    // add two new arrays for minor major
    var row = currentRow;
    var count = piecesPlaced;
    for (let col = 0; col < n; col++) {
      var majorIndex = col - row + n - 1;
      var minorIndex = col + row;
      //with the new row, for each spot in the row, try to place a piece;
      boardState.togglePiece(row, col);
      //if piece is valid go down;
      if (rowCheck[row] || colCheck[col] || majorCheck[majorIndex] || minorCheck[minorIndex]) { //add or for major and minor check
        //if conflict, take off the piece, and continue to the next column
        boardState.togglePiece(row, col);
        continue;
      } else {
        count++;
        if (count === n) {
          solutionCount++;
          boardState.togglePiece(row, col);
          count--;
          continue;
        }
        rowCheck[row] = 1;
        colCheck[col] = 1; // assign major and minor diagonal to 1
        majorCheck[majorIndex] = 1;
        minorCheck[minorIndex] = 1;
        queenHelper(boardState, row + 1, count, rowCheck, colCheck, majorCheck, minorCheck); // add major and minor as well
        rowCheck[row] = 0; //add major minor back to 0;
        colCheck[col] = 0;
        majorCheck[majorIndex] = 0;
        minorCheck[minorIndex] = 0;
        boardState.togglePiece(row, col);
        count--;
      }
    }
  }
  queenHelper(board, 0, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
