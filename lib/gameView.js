;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var GameView = Election.GameView = function (game) {
    this.game = game;
    debugger
  };

  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          39: 'right',
      };

      this.game.hand.handleInput(allowedKeys[e.keyCode]);
  });

  GameView.prototype.render = function() {
    // this.game.allObjects.forEach(function(object) {
    //   object.render();
    // });

    this.game.hand.render();
  }
})();
