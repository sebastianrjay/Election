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
    this.renderCallbacks[0].call();
  };

  StartView.prototype.renderDirections = function() {
    var text = "You're running for US President in 2016!\n"
      + " Raise at least $30 million in campaign contributions\n in order to win."
      + " Press SPACEBAR to see the controls";
    ctx.font = "20px serif";
    ctx.textAlign = 'left';
    ctx.fillStyle = '#C0C0C0';
    ctx.fillText(text, 100, 300);
  };

  StartView.prototype.renderControls = function() {
    var text = "Use the <- and -> arrow keys to control\n the hand at the bottom "
      + "of the screen.\n Watch out for the press!";
    ctx.font = "20px serif";
    ctx.textAlign = 'left';
    ctx.fillStyle = '#C0C0C0';
    ctx.fillText(text, 100, 300);
  };
})();
