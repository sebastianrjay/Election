;(function (global) {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.Game = function (ctx, handImg, billImg) {
    global.ctx = ctx;
    this.lastTime = Date.now();
    this.bills = [];
    this.papers = [];
    this.hand = new Election.Hand(handImg);
    this.allObjects = [this.hand].concat(this.bills).concat(this.papers);
    this.gameView = new Election.GameView(this);
  };

  Election.DIM_X = 566;
  Election.DIM_Y = 371;
  Election.FPS = 60;
  Election.NUM_BILLS = 50;
  Election.NUM_PAPERS = 70;
  Election.MOVES = {
    'left': [-1, 0],
    'right': [1, 0]
  }

  Election.Game.prototype.render = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);
    this.gameView.render();
  }

  Election.Game.prototype.run = function() {

    var game = this;
    this.timerId = setInterval(
      function() {
        // game.update();
        game.render();
      }, (1000 / Election.FPS));
  }

  Election.Game.prototype.stop = function() {
    clearInterval(this.timerId);
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

var instantiateHandController = function(game) {
  document.addEventListener('keydown', function(e) {
      var allowedKeys = {
          37: 'left',
          39: 'right',
      };

      game.hand.handleInput(allowedKeys[e.keyCode]);
  });
}

handImg.addEventListener("load", function(){
  billImg.addEventListener("load", function(){
    var game = new Election.Game(ctx, handImg, billImg);
    instantiateHandController(game);
    game.run();
  });
});
