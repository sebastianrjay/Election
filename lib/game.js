;(function (global) {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Game = Election.Game = function (ctx, handImg, billImg, newspaperImg) {
    global.ctx = ctx;
    this.lastTime = Date.now();
    this.bills = [];
    this.papers = [];
    this.hand = new Election.Hand(handImg);
    this.billImg = billImg;
    this.newspaperImg = newspaperImg;
    this.gameView = new Election.GameView(this);
    this.pressPoints = 100;
    this.score = 0;
    this.billsCreated = 0;
    this.papersCreated = 0;
    this.instantiateFallingObjects();
  };

  Election.DIM_X = 566;
  Election.DIM_Y = 371;
  Election.FPS = 60;
  Election.NUM_BILLS = 50;
  Election.NUM_PAPERS = 40;
  Election.MOVES = {
    'left': [-1, 0],
    'right': [1, 0]
  };

  Game.prototype.instantiateFallingObjects = function() {
    this.bills.push(new Election.Bill({ img: this.billImg }));
    this.billsCreated += 1;

    // this.papers.push(new Election.Newspaper({ img: this.newspaperImg }));
    // this.papersCreated += 1;

  };

  Game.prototype.allObjects = function() {
    return [this.hand].concat(this.bills).concat(this.papers);
  };

  Game.prototype.fallingObjects = function() {
    return this.bills.concat(this.papers);
  };

  Game.prototype.update = function() {
    var game = this;
    this.fallingObjects().slice(0).forEach(function(object) {
      if(object.isFallen()) {
        if(object instanceof Election.Bill) {
          game.bills.shift();
        }
        // else if (object instanceof Election.Newspaper) {
        //   game.papers.shift();
        // }
      } else {
        object.update();
      }
    });
  };

  Game.prototype.render = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);
    this.gameView.render();
  };

  Game.prototype.addBill = function() {
    if(this.billsCreated < Election.NUM_BILLS) {
      this.bills.push(new Election.Bill({ img: this.billImg }));
      this.billsCreated += 1;
    }
  };

  Game.prototype.run = function() {

    var game = this;
    this.timer1 = setInterval(
      function() {
        game.update();
        game.render();
      }, (1000 / Election.FPS)
    );

    this.timer2 = setInterval(
      function() {
        game.addBill();
        // game.addPaper();
      }, 1000
    );
  };

  Game.prototype.stop = function() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  };
})(this);

var canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = Election.DIM_X;
canvasEl.height = Election.DIM_Y;
var ctx = canvasEl.getContext("2d"),
    handImg = new Image(),
    billImg = new Image();
handImg.src = 'images/outstretched-hand.jpg';
billImg.src = 'images/million_dollar_bill.jpg';

var instantiateHandController = function(game) {
  document.addEventListener('keydown', function(e) {
      var allowedKeys = {
          37: 'left',
          39: 'right',
      };

      game.hand.handleInput(allowedKeys[e.keyCode]);
  });
};

handImg.addEventListener("load", function(){
  billImg.addEventListener("load", function(){
    var game = new Election.Game(ctx, handImg, billImg);
    instantiateHandController(game);
    game.run();
  });
});
