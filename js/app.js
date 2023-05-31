"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*-------------------------------- Variables --------------------------------*/
let turn, winner, tie;
let board;
/*------------------------ Cached Element References ------------------------*/
// const squareEls = document.querySelectorAll('.sqr') as NodeList
const squareEls = document.querySelectorAll('.sqr');
const boardEl = document.querySelector('.board');
console.dir(boardEl);
// const squareEls = document.querySelectorAll<NodeList>('.sqr') error???
const messageEl = document.querySelector('#message');
//have to add ! to avoid null error at function updateMessage - why??
const resetBtnEl = document.querySelector('button');
/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
init();
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function placePiece(idx) {
    board[idx] = turn;
}
function handleClick(evt) {
    if (!(evt.target instanceof HTMLElement))
        return;
    console.log(evt.target.id);
    const sqIdx = parseInt(evt.target.id.replace('sq', ''));
    if (isNaN(sqIdx) || board[sqIdx] || winner)
        return;
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function checkForTie() {
    if (board.includes(0))
        return;
    tie = true;
}
function checkForWinner() {
    winningCombos.forEach(combo => {
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (winner)
        return;
    turn *= -1;
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((boardVal, idx) => {
        if (boardVal === 1) {
            squareEls[idx].textContent = 'X';
        }
        else if (boardVal === -1) {
            squareEls[idx].textContent = 'O';
        }
        else {
            squareEls[idx].textContent = '';
        }
    });
}
function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn!`;
    }
    else if (!winner && tie) {
        messageEl.textContent = "Cat's game! Meow!!!";
    }
    else {
        messageEl.textContent = `Congratulations! ${turn === 1 ? 'X' : 'O'} wins! `;
    }
}
