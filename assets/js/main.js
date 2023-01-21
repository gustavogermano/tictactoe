const board = document.querySelector('.container');
const allBtn = document.querySelectorAll('.btn');
const reset = document.querySelector('.button-reset');

let gameBoard = [
    ['null', 'null', 'null'],
    ['null', 'null', 'null'],
    ['null', 'null', 'null']
];

let count = 0;
let win;

function playerTurn(turn) {
    const players = ['x', 'o'];
    let player;
    for (let i = turn; turn <= 9; i++) {
        player = i % 2 === 0 ? players[1] : players[0];
        return player;
    }
    return resetGame();
}

function checkWinner(row, column, player) {
    gameBoard[row][column] = player === 'x' ? 1 : 0;
    const [row0, row1, row2] = [gameBoard[0].reduce((acum, valor) => acum += valor, 0),
    gameBoard[1].reduce((acum, valor) => acum += valor, 0), gameBoard[2].reduce((acum, valor) => acum += valor, 0)];
    let [column0, column1, column2] = [0, 0, 0];
    let [diagonal1, diagonal2] = [gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2], gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0]];
    for (let i = 0; i < 3; i++) {
        column0 += gameBoard[i][0];
        column1 += gameBoard[i][1];
        column2 += gameBoard[i][2];
    }
    for (let probabilitiesWins of [row0, row1, row2, column0, column1, column2, diagonal1, diagonal2]) {
        if ((probabilitiesWins === 3 || probabilitiesWins === 0) && player === 'x') {
            timerWinner(player);
            return true;
        }
        if ((probabilitiesWins === 3 || probabilitiesWins === 0) && player === 'o') {
            timerWinner(player);
            return true;
        }
    }
    return false;
}

function resetGame() {
    alert('Fim de jogo');
    allBtn.forEach((allBtn) => {
        allBtn.innerHTML = '';
    })
    gameBoard = [
        ['null', 'null', 'null'],
        ['null', 'null', 'null'],
        ['null', 'null', 'null']
    ];
    count = 0;

}

function timerWinner(player) {
    setTimeout(() => {
        alert(`Player ${player.toUpperCase()}  é o VENCEDOR!!`);
    }, 100);
}

function timer() {
    setTimeout(() => {
        if (win === true || count === 9) return resetGame();
    }, 100);
}

function move(el, row, column) {
    if (el.innerHTML === 'x' || el.innerHTML === 'o') return;
    count++;
    const player = playerTurn(count);
    el.innerHTML = player;
    win = checkWinner(row, column, player);
    timer();
}

board.addEventListener('click', (e) => {
    const el = e.target;

    if (el.classList.contains('btn-1')) {
        move(el, 0, 0);

    }
    if (el.classList.contains('btn-2')) {
        move(el, 0, 1);
    }
    if (el.classList.contains('btn-3')) {
        move(el, 0, 2);
    }
    if (el.classList.contains('btn-4')) {
        move(el, 1, 0);
    }
    if (el.classList.contains('btn-5')) {
        move(el, 1, 1);
    }
    if (el.classList.contains('btn-6')) {
        move(el, 1, 2);
    }
    if (el.classList.contains('btn-7')) {
        move(el, 2, 0);
    }
    if (el.classList.contains('btn-8')) {
        move(el, 2, 1);
    }
    if (el.classList.contains('btn-9')) {
        move(el, 2, 2);
    }
    if (el.classList.contains('button-reset')) {
        let conta = 0;
        allBtn.forEach((allBtn) => {
            if (allBtn.innerHTML === '') conta++;
        });
        if (conta === 9) return; else return resetGame();
    }
});