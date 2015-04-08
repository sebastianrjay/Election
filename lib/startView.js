;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var StartView = Election.StartView = function (game) {
    this.game = game;
  };

  StartView.prototype.renderTitle = function() {
    var title = "Election";
    ctx.font = "48px serif";
    ctx.textAlign = 'center';
    ctx.fillText(title, (Election.DIM_X / 2), 30);
  };
})();
