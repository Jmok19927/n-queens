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
  var solution = undefined;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutions = [];
  var solutionCount = 0;
  // make the board of size n
  var board = new Board({n: n});
  //arguments board + row;
  var helper = function (boardState, currentRow, piecesPlaced) {
    var row = currentRow;
    var count = piecesPlaced;
    for (let i = 0; i < n; i++) {
    //with the new row, for each spot in the row, try to place a piece;
      boardState.togglePiece(row, i);
    //if piece is valid go down;
      if (boardState.hasAnyColConflicts()) {
        //if conflict, continue
        boardState.togglePiece(row, i);
        continue;
      } else {
        count++;
        if (count === n) {
          solutions.push(boardState);
          solutionCount++;
          boardState.togglePiece(row, i);
          continue;
        }
        helper(boardState, row + 1, count);
      }
    }
  }
  helper(board, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
