;(function (global) {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var gameSpace = this;

  var Game = Election.Game = function (ctx, handImg, billImg) {
    global.ctx = ctx;
    this.bills = [];
    this.papers = [];
    this.hand = new Election.Hand(handImg);
    this.allObjects = [this.hand].concat(this.bills).concat(this.papers);
    this.gameView = new Election.GameView(this);
  };

  Election.DIM_X = 566;
  Election.DIM_Y = 371;
  Election.FPS = 32;
  Election.NUM_BILLS = 50;
  Election.NUM_PAPERS = 70;
  Election.MOVES = {
    'left': [-1, 0],
    'right': [1, 0]
  }

  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          39: 'right',
      };

      gameSpace.hand.handleInput(allowedKeys[e.keyCode]);
  });

  Game.prototype.run = function() {
    this.gameView.render();
  }

  Game.prototype.initializeGameView = function(gameView) {
    this.gameView = gameView;
  }

})(this);

var canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = Election.DIM_X;
canvasEl.height = Election.DIM_Y;
var ctx = canvasEl.getContext("2d"),
    handImg = new Image(),
    billImg = new Image();
handImg.src = 'images/outstretched-hand.jpg';
billImg.src = 'images/million_dollar_bill.jpg';

handImg.addEventListener("load", function(){
  billImg.addEventListener("load", function(){
    var game = new Election.Game(ctx, handImg, billImg);
    game.run();
  });
});
