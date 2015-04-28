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
    this.runGameplay();
  };

  StartView.prototype.handleInput = function() {
    this.renderCallbacks.shift();
  };

  StartView.prototype.render = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);
    this.renderCallbacks[0].call();
  };

  StartView.prototype.renderControls = function() {
    var text1 = "Use the <- and -> arrow keys to control\n",
        text2 = "the hand at the bottom of the screen.\n",
        text3 = "Watch out for the press!",
        text4 = "Press any key to begin.";
    Election.Util.createBlankScreen();
    Election.Util.renderText([text1, text2, text3, text4], (Election.DIM_Y / 2) - 100);
  };

  StartView.prototype.renderDirections = function() {
    var text1 = "You're running for US President in 2016!\n",
        text2 = "Raise at least $30 million in campaign\n",
        text3 = "contributions in order to win.\n",
        text4 = "Press any key to see the controls.";
    Election.Util.createBlankScreen();
    Election.Util.renderText([text1, text2, text3, text4], (Election.DIM_Y / 2) - 100);
  };
})();
