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
    this.startView = new Election.StartView(this);
    this.finishView = new Election.FinishView(this);
    this.pressPoints = 10;
    this.score = 0;
    this.billsCreated = 0;
    this.papersCreated = 0;
    this.addBill();
    this.addNewspaper();
  };

  Election.DIM_X = 622;
  Election.DIM_Y = 481;
  Election.FPS = 60;
  Election.NUM_BILLS = 50;
  Election.NUM_PAPERS = 80;
  Election.MOVES = {
    'left': [-1, 0],
    'right': [1, 0]
  };

  Game.prototype.addBill = function() {
    if(this.billsCreated < Election.NUM_BILLS) {
      this.bills.push(new Election.Bill({ img: this.billImg }));
      this.billsCreated += 1;
    }
  };

  Game.prototype.addNewspaper = function() {
    if(this.papersCreated < Election.NUM_PAPERS) {
      this.papers.push(new Election.Newspaper({ img: this.newspaperImg }));
      this.papersCreated += 1;
    }
  };

  Game.prototype.allObjects = function() {
    return [this.hand].concat(this.bills).concat(this.papers);
  };

  Game.prototype.collideWithHand = function(object) {
    if(object instanceof Election.Bill) {
      this.score += 1;
      console.log('score: ' + this.score);
    } else if(object instanceof Election.Newspaper) {
      this.pressPoints -= 1;
      console.log('press points: ' + this.pressPoints);
    }
    this.remove(object);
  };

  Game.prototype.fallingObjects = function() {
    return this.bills.concat(this.papers);
  };

  var handControls = function(e) {

    var handKeys = {
        37: 'left',
        39: 'right',
    };

    this.hand.handleInput(handKeys[e.keyCode]);
  };

  var navControls = function(e) {

    var navKeys = {
      8: 'enter',
      13: 'enter',
      27: 'escape',
      32: 'spacebar'
    };

    // call function on nav keys here
  };

  Game.prototype.instantiateHandController = function() {
    var game = this;
    document.addEventListener('keydown', handControls.bind(game));
  };

  Game.prototype.instantiateNavController = function() {
    var game = this;
    document.addEventListener('keydown', navControls.bind(game));
  };

  Game.prototype.isWon = function() {
    return (this.billsCreated === Election.NUM_BILLS
      && this.papersCreated === Election.NUM_PAPERS) && (this.score >= 20
        && this.pressPoints >= 0);
  };

  Game.prototype.remove = function(object) {
    if(object instanceof Election.Bill) {
      this.bills.shift();
    } else if (object instanceof Election.Newspaper) {
      this.papers.shift();
    }
  };

  Game.prototype.removeHandController = function() {
    var game = this;
    document.removeEventListener('keydown', handControls.bind(game));
  };

  Game.prototype.removeNavController = function() {
    var game = this;
    document.removeEventListener('keydown', navControls.bind(game));
  };

  Game.prototype.renderGameplay = function() {
    ctx.clearRect(0, 0, Election.DIM_X, Election.DIM_Y);
    this.gameView.render();
  };

  Game.prototype.renderInstructions = function() {

  };

  Game.prototype.run = function() {
    this.instantiateNavController();
    this.renderInstructions();
    this.runGamePlay();
  };

  Game.prototype.runGamePlay = function() {
    this.instantiateHandController();
    var game = this;
    this.timer1 = setInterval(
      function() {
        game.update();
        game.renderGameplay();
        // debugger
      }, (1000 / Election.FPS)
    );

    this.timer2 = setInterval(
      function() {
        game.addBill();
      }, 1000
    );

    this.timer3 = setInterval(
      function() {
        game.addNewspaper();
      }, (Election.NUM_BILLS / Election.NUM_PAPERS) * 1000
    );
  }

  Game.prototype.stopGameplay = function() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  };

  Game.prototype.update = function() {
    var game = this;
    this.fallingObjects().slice(0).forEach(function(object) {
      if(object.isFallen()) {
        game.remove(object);
      } else {
        if(game.hand.isCollidedWith(object)) {
          console.log('collision');
          game.collideWithHand(object);
        } else {
          object.update();
        }
      }
      if(game.isWon()) {
        // eventually call finishView here
        console.log('WIN');
      }
    });
  };
})(this);

var canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = Election.DIM_X;
canvasEl.height = Election.DIM_Y;
var ctx = canvasEl.getContext("2d"),
    handImg = new Image(),
    billImg = new Image(),
    paperImg = new Image();
handImg.src = 'images/outstretched-hand.png';
billImg.src = 'images/million_dollar_bill.jpg';
paperImg.src = 'images/newspaper.png';


handImg.addEventListener("load", function(){
  billImg.addEventListener("load", function(){
    paperImg.addEventListener("load", function(){
      var game = new Election.Game(ctx, handImg, billImg, paperImg);
      game.run();
    });
  });
});
