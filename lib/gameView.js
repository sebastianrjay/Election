;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var GameView = Election.GameView = function (game) {
    this.game = game;
  };

  GameView.prototype.render = function() {

    this.game.allObjects.forEach(function(object){
      object.render();
    });
  };
})();
