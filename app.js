// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(function(){

  function Game() {
    //Create a new instance of player 1
    this.player1 = new Player('X');

    //Do the same for a player 2
    this.player2 = new Player('O');
    
    //Create the board
    this.board = new Board();
  }

  // Remember: prototypes are shared functions between all game instances
  Game.prototype.nextPlayer = function() {
    //Switch players
  };

  Game.prototype.currentPlayer = function() {


  }

  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    this.board.reset()
    this.board.makeMove(this.player2, $('.cell').first())
  };

  // A starter Player constructor.
  function Player(team) {
    //Is the player X or O?
    this.team = team
  };

  // A starter Board constructor.
  function Board() {
    //Tracks the cells of the board instance

    this.$cells = $('.cell')

    //Store any other properties that board may have below, such as a reset option
  };

  Board.prototype.reset = function(){
    this.$cells.empty().removeClass('X').removeClass('O') //it is same with .html('')

  };

  Board.prototype.makeMove = function(player, $cell){
    $cell.addClass(player.team.toLowerCase).html(player.team)


  }


  Board.prototype.checkWinner = function(){

    // this checks if there is a winner and ends the game
  }

  // Start the game!
  var game = new Game();
  game.init();


})




//notes
// try using .one() jquery to only allow the space to be used once
