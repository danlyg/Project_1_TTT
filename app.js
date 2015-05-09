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

    this.currentPlayer = this.player1
  }

  // Remember: prototypes are shared functions between all game instances
  Game.prototype.nextPlayer = function() {
    //'this' refers to the Game
    console.log(this.currentPlayer.team)
    if (this.currentPlayer === this.player1){
      this.currentPlayer = this.player2  //change team 'X' to team 'O'
      console.log(this.currentPlayer.team, 'this should be O now')
    } else {
      this.currentPlayer = this.player1 //change team 'O' to team 'X'
      console.log(this.currentPlayer.team, 'this should be X now')
    }
  };


  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    var that = this // allows me to keep 'this' since in event handler, this gets overwritten with the target
    

    $(this.board.$cells).click(function(event){
      $target = $(event.target)

      if(that.board.isEmpty($target)){
        that.board.makeMove(that.currentPlayer, $target)
        var winningTeam = that.board.checkWinner();
        if (winningTeam){
          alert(winningTeam + 'wins!')
        }
      }

    })

    $button = $('#reset');
    $button.on('click', function(){
      that.board.reset()
    })
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
    this.currentPlayer = this.player1

    //Store any other properties that board may have below, such as a reset option
  };

  Board.prototype.reset = function(){
    this.$cells.empty().removeClass('x').removeClass('o') //it is same with .html('')

  };

  Board.prototype.makeMove = function(player, $cell){
    $cell.addClass(player.team.toLowerCase()).html(player.team)
    game.nextPlayer()
  }

  Board.prototype.isEmpty = function($cell) {
   return ($cell.html() === '') // will return true or false
  };


  Board.prototype.checkWinner = function(){
    var winningcombs = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    var that = this;

    var winningTeam = false;
    $(winningcombs).each(function(index, value){
      var a = $(that.$cells[value[0]]).html();
      var b = $(that.$cells[value[1]]).html();
      var c = $(that.$cells[value[2]]).html();

      if ((a===b) && (b===c) && (b !== '')){
        winningTeam = a;
        return false; //this breaks out of the jQuery each
      }
    })

    if (winningTeam) {
      return winningTeam;
    } else{
      return false;
    }
  }

  





  // Start the game!
  var game = new Game();
  game.init();


})




//notes
// try using .one() jquery to only allow the space to be used once
