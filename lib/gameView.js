;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.GameView = function (game) {
    this.game = game;
  };

  Election.GameView.prototype.render = function() {
    // this.game.allObjects.forEach(function(object) {
    //   object.render();
    // });
    this.game.hand.render();

  }
})();
