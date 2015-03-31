;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.GameView = function (game) {
    this.game = game;
  };

  var that = this;

  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          39: 'right',
      };

      // that.game.hand.handleInput(allowedKeys[e.keyCode]);
  });

  Election.GameView.prototype.render = function() {
    // this.game.allObjects.forEach(function(object) {
    //   object.render();
    // });
    this.game.hand.render();

  }
})();

var canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = Election.DIM_X;
canvasEl.height = Election.DIM_Y;
var ctx = canvasEl.getContext("2d"),
    handImg = new Image(),
    billImg = new Image();
handImg.src = 'images/outstretched-hand.jpg';
billImg.src = 'images/million_dollar_bill.jpg';

handImg.addEventListener("load", function(){
  billImg.addEventListener("load", function(){
    var game = new Election.Game(ctx, handImg, billImg);
    game.run();
  });
});
