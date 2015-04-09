;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var StartView = Election.StartView = function (game) {
    this.game = game;
    this.renderCallbacks = [this.renderDirections, this.renderControls,
      this.beginGame.bind(this.game)];
  };

  StartView.prototype.beginGame = function() {
    this.removeNavController();
    this.stopDirections();
    this.runGame();
  };

  StartView.prototype.handleInput = function() {
    this.renderCallbacks.shift();
  };

  StartView.prototype.render = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);
    Election.Util.renderTitle();
    this.renderCallbacks[0].call();
  };

  StartView.prototype.renderDirections = function() {
    var text1 = "You're running for US President in 2016!\n";
    var text2 = "Raise at least $30 million in campaign\n";
    var text3 = "contributions in order to win.\n"
    var text4 = "Press SPACEBAR to see the controls.";
    ctx.font = "20px serif";
    ctx.textAlign = 'left';
    ctx.fillStyle = '#E0E0E0';
    ctx.fillText(text1, 100, 300);
    ctx.fillText(text2, 100, 350);
    ctx.fillText(text3, 100, 400);
    ctx.fillText(text4, 100, 450);
  };

  StartView.prototype.renderControls = function() {
    var text1 = "Use the <- and -> arrow keys to control the\n"
    var text2 = "hand at the bottom of the screen.\n"
    var text3 = "Watch out for the press!";
    ctx.font = "20px serif";
    ctx.textAlign = 'left';
    ctx.fillStyle = '#E0E0E0';
    ctx.fillText(text1, 100, 300);
    ctx.fillText(text2, 100, 350);
    ctx.fillText(text3, 100, 400);
  };
})();
