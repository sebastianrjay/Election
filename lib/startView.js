;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var StartView = Election.StartView = function (game) {
    this.game = game;
    this.renderCallbacks = [this.renderDirections, this.renderControls,
      this.beginGame.bind(this.game)];
  };

  var renderText = function(lines, y) {
    ctx.font = "20px serif";
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, Election.DIM_X, Election.DIM_Y);
    ctx.fillStyle = '#E0E0E0';
    lines.forEach(function(line) {
      ctx.fillText(line, 100, y);
      y += 50;
    });
  };

  StartView.prototype.beginGame = function() {
    var game = this;
    this.removeNavController();
    this.stopDirections();
    setTimeout(game.runGamePlay.bind(game), 1500);
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
    renderText([text1, text2, text3, text4], (Election.DIM_Y / 2) - 100);
  };

  StartView.prototype.renderControls = function() {
    var text1 = "Use the <- and -> arrow keys to control\n"
    var text2 = "the hand at the bottom of the screen.\n"
    var text3 = "Watch out for the press!";
    var text4 = "Press SPACEBAR to begin.";
    renderText([text1, text2, text3, text4], (Election.DIM_Y / 2) - 100);
  };
})();
