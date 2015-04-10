;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var FinishView = Election.FinishView = function (game) {
    this.game = game;
  };

  FinishView.prototype.renderWin = function() {
    var text1 = "Congratulations! You gathered enough campaign",
        text2 = "contributions and maintained a good reputation",
        text3 = "in the press. You are now President of the",
        text4 = "United States.";
    Election.Util.renderText([text1, text2, text3, text4], (Election.DIM_Y / 2) - 100);
  };

  FinishView.prototype.renderPressLoss = function() {
    var text1 = "Oh no! You've committed a few too many gaffs and",
        text2 = "made too many controversial comments to win this",
        text3 = "election. Watch out for the press if you run again,",
        text4 = "and try to be more consistent and conventional.";
    Election.Util.renderText([text1, text2, text3, text4], 100);
  };

  FinishView.prototype.renderMoneyLoss = function() {
    var text1 = "Looks like you couldn't afford enough advertising and",
        text2 = "travel to win the election. Next time, focus more on",
        text3 = "fundraising, especially with wealthy donors.";
    Election.Util.renderText([text1, text2, text3], 300);
  };
})();
