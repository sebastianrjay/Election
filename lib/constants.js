;(function(){
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.DIM_X = 622;
  Election.DIM_Y = 481;
  Election.FPS = 60;
  Election.NUM_BILLS = 50;
  Election.NUM_PAPERS = 80;
  Election.MOVES = {
    'left': [-1, 0],
    'right': [1, 0]
  };
  Election.WINNING_SCORE = 30;

})();
