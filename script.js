const boardSize = 15;
const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'black';
let gameActive = true;
const gameState = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', placeStone);
        board.appendChild(cell);
    }
}

function placeStone(event) {
    if (!gameActive) return;
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (gameState[row][col]) return;

    gameState[row][col] = currentPlayer;
    cell.classList.add(currentPlayer);

    const winningCells = checkWin(row, col);
    if (winningCells) {
        message.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`;
        gameActive = false;
        highlightWinningCells(winningCells);
    } else {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    }
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal \
           checkDirection(row, col, 1, -1);  // Diagonal /
}

function checkDirection(row, col, rowDelta, colDelta) {
    let count = 1;
    let winningCells = [{ row, col }];
    let r, c;

    // Check in the positive direction
    r = row + rowDelta;
    c = col + colDelta;
    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && gameState[r][c] === currentPlayer) {
        count++;
        winningCells.push({ row: r, col: c });
        r += rowDelta;
        c += colDelta;
    }

    // Check in the negative direction
    r = row - rowDelta;
    c = col - colDelta;
    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && gameState[r][c] === currentPlayer) {
        count++;
        winningCells.push({ row: r, col: c });
        r -= rowDelta;
        c -= colDelta;
    }

    return count >= 5 ? winningCells : null;
}

function highlightWinningCells(winningCells) {
    for (const cell of winningCells) {
        const cellElement = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
        cellElement.classList.add('winning-cell');
    }
}
