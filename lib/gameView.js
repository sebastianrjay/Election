;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var GameView = Election.GameView = function (game) {
    this.game = game;
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

  GameView.prototype.render = function() {
    // this.game.allObjects.forEach(function(object) {
    //   object.render();
    // });

    this.game.hand.render();
  }
})();
