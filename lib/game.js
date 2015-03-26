;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Game = Election.Game = function () {
    this.bills = [];
    this.papers = [];
    this.player = new Election.Hand();
  };


  Election.DIM_X = 566;
  Election.DIM_Y = 371;
  Election.FPS = 32;
  Election.NUM_BILLS = 50;
  Election.NUM_PAPERS = 70;

})();
