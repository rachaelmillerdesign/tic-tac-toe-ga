'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// ~~~~~~~~~~~~~~~~~~~~~
// ON DOCUMENT READY
// ~~~~~~~~~~~~~~~~~~~~~
$(() => {
  const authEvents = require('./auth/events.js')
  authEvents.addHandlers()
})
// ~~~~~~~~~~~~~~~~~~~~~
// VARIABLES & CONSTANTS
// ~~~~~~~~~~~~~~~~~~~~~
let currentPlayer = 'x'
let emptyBoard = ['', '', '', '', '', '', '', '', '']
let i
let j
let currentWin
let won
let draw
const possibleWins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

// ~~~~~~~~~~~~~~~~~~~~~
// ALTERNATE TURNS
// ~~~~~~~~~~~~~~~~~~~~~
const alternateTurns = function () {
  if (currentPlayer === 'x') {
    currentPlayer = 'o'
  } else {
    currentPlayer = 'x'
  }
}
// ~~~~~~~~~~~~~~~~~~~~~
// CALL BACK
// ~~~~~~~~~~~~~~~~~~~~~
const onClickCallBack = function (e) {
  // console.log(e.target.id)
  const cellid = parseInt(e.target.id)
  emptyBoard[cellid] = currentPlayer
  win()
  console.log(emptyBoard)
  $(this).text(currentPlayer)
  $(this).addClass('unclickable')
  alternateTurns()
  // console.log(currentPlayer)
}

$('.square').on('click', onClickCallBack)

// ~~~~~~~~~~~~~~~~~~~~~
// WIN FUNCTION
// ~~~~~~~~~~~~~~~~~~~~~
let win = function () {
  for (i = 0; i < possibleWins.length; i++) {
    currentWin = possibleWins[i]
    // console.log('For' + currentPlayer + 'currentWin: ' + currentWin)
    won = true
    for (j = 0; j < currentWin.length; j++) {
      if (emptyBoard[currentWin[j]] !== currentPlayer) {
        won = false
      }
    }
    if (won === true) {
      console.log(currentPlayer + ' has won!')
      break
    }
  }
  if (won === false) {
    draw = true
    for (i = 0; i < emptyBoard.length; i++) {
      if (emptyBoard[i] === '') {
        draw = false
      }
    }
    if (draw === true) {
      console.log("It's a tie!")
    }
  }
}
// ~~~~~~~~~~~~~~~~~~~~~
// CREATE NEW GAME
// ~~~~~~~~~~~~~~~~~~~~~

const button = document.getElementById('new')
button.addEventListener('click', emptySquares)

function emptySquares () {
  const squares1 = document.getElementsByClassName('square')
  for (let m = 0; m < squares1.length; m++) {
    squares1[m].innerHTML = ''
    squares1[m].classList.remove('unclickable')
  }
  console.log('start new game!')
}
