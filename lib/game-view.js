;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var GameView = Election.GameView = function (game) {
    this.game = game;
  };

  GameView.prototype.render = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);
    this.renderScore();
    this.renderReputation();
    this.game.allObjects().forEach(function(object){
      object.render();
    });
  };

  GameView.prototype.renderHowardDean = function() {
    ctxTop.drawImage(this.game.options.deanImg, 320, 20);
    setTimeout(function() {
      ctxTop.clearRect(320, 20, 120, 120);
    }, 2000);
  };

  GameView.prototype.renderScore = function() {
    var text1 = "Campaign Fund";
    if (this.game.score === 0) {
      var text2 = "Total: $" + this.game.score;
    } else {
      var text2 = "Total: $" + this.game.score + ",000,000";
    }

    ctx.font = "20px arial";
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000099';
    ctx.fillText(text1, (Election.DIM_X - 20), 50);
    ctx.fillText(text2, (Election.DIM_X - 20), 100);
  };

  GameView.prototype.renderReputation = function() {
    var view = this,
        text1 = "REPUTATION",
        progress = 0;
    ctx.fillStyle = '#000000';
    ctx.fillRect(130, 45, 106, 30);

    if (this.game.pressPoints > 2) {
      ctx.fillStyle = '#009900';
      progress = this.game.pressPoints * 10;
    } else {
      ctx.fillStyle = '#A00000';
      if (view.game.pressPoints > 0) {
        progress = view.game.pressPoints * 10;
      }
    }

    ctx.fillRect(133, 48, progress, 24);
    ctx.font = "14px arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text1, 183, 65);
  }
})();
