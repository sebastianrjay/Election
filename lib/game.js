;(function (global) {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Game = Election.Game = function () {
    this.bills = [];
    this.papers = [];
    this.hand = new Election.Hand();
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

      Game.hand.handleInput(allowedKeys[e.keyCode]);
  });

  Game.prototype.run = function() {
    this.gameView.render();
  }

  global.ctx = ctx;
})(this);
