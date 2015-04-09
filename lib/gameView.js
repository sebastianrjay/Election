;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var GameView = Election.GameView = function (game) {
    this.game = game;
  };

  GameView.prototype.render = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);

    Election.Util.renderTitle();
    this.game.allObjects().forEach(function(object){
      object.render();
    });
  };
})();
