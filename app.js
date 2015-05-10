$(function(){

  function Game() {
    //Create a new instance of player 1
    this.player1 = new Player('X');

    //Do the same for a player 2
    this.player2 = new Player('O');
    
    //Create the board
    this.board = new Board();

    this.currentPlayer = this.player1


    this.score = new Score();
  }


  Game.prototype.nextPlayer = function() {
    //'this' refers to the game
    if (this.currentPlayer === this.player1){
      this.currentPlayer = this.player2
      $('.turn').html(this.currentPlayer.team + "'s turn")  //change team 'X' to team 'O'
    } else {
      this.currentPlayer = this.player1
      $('.turn').html(this.currentPlayer.team + "'s turn")  //change team 'O' to team 'X'
    }
  };



  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    var that = this // allows me to keep the current 'this' since in event handler, this gets overwritten with the target


    $(this.board.$cells).click(function(event){

      var winningTeam = that.board.checkWinner();//statement that checks if there is a winner
      var tieGame;
      if(!winningTeam){
        $target = $(event.target)

        if(that.board.isEmpty($target)){
          that.board.makeMove(that.currentPlayer, $target)

          winningTeam = that.board.checkWinner(); //this only checks if there is a winner
          tieGame = that.board.isTie();
         
          
          if (winningTeam){
            that.score.updateTeamScore(winningTeam)
          } else if (tieGame){
            that.score.updateTieScore()
          }
        }
      }
    })

    $button = $('#reset');
    $button.on('click', function(){
      that.board.reset()
    })
  };



  function Score(){
    this.scoreX = 0;
    this.scoreO = 0;
    this.ties = 0;
  }

  Score.prototype.updateTeamScore = function(winningTeam){
    //update score of winning team    
    if(winningTeam === game.player1.team){
      this.scoreX++;
      $('.xScore').html(this.scoreX);
      $('body').append("<div class='overlay'><p class='overlayText'>x wins</p></div>")
    } else {
      this.scoreO++;
      $('.oScore').html(this.scoreO);
      $('body').append("<div class='overlay'><p class='overlayText'>o wins</p></div>")
    }

  }
  
  Score.prototype.updateTieScore = function(){
    this.ties++;

    $('.tieScore').html(this.ties);
    $('body').append("<div class='overlay'><p class='overlayGif'>tie game<br><img src='http://i.giphy.com/lPehtI6SzyTu0.gif' class ='catGif'></p></div>")


  }









  // A starter Player constructor.
  function Player(team) {
    this.team = team
  };





  // A starter Board constructor.
  function Board() {
    //Tracks the cells of the board instance
    this.$cells = $('.cell');
    this.currentPlayer = this.player1;
  };

  Board.prototype.reset = function(){
    this.$cells.empty().removeClass('x').removeClass('o') //it is same with .html('')
    $('.overlay').remove();
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

  
  Board.prototype.isTie = function(){
    var that = this;
    var counter = 0;
    var notEmpty = false;
    this.$cells.each(function(i, val){
      if( that.isEmpty( $(val) ) ){
        return false; //break out of loop since we found a empty
      } else {
          counter++; //counts up to 9
      }
    })
    if(counter === 9){
      return true; // there are empty spaces left, not a tie game
    } else {
        return false;
    }
  }




  // Start the game!
  var game = new Game();
  game.init();


})




//notes
// try using .one() jquery to only allow the space to be used once
