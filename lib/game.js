(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Game = Election.Game = function () {
    this.bills = [];
    this.papers = [];
    this.hand = new Election.Hand();
  };


  Game.DIM_X = 566;
  Game.DIM_Y = 371;
  Game.FPS = 32;
  Game.NUM_BILLS = 50;


})();
