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
  };

  Election.DIM_X = 622;
  Election.DIM_Y = 481;
  Election.WINNING_SCORE = 30;
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
    if(e.keyCode) {
      this.startView.handleInput();
    }
  };

  Game.prototype.instantiateHandController = function() {
    document.addEventListener('keydown', handControls.bind(this));
  };

  Game.prototype.instantiateNavController = function() {
    document.addEventListener('keydown', navControls.bind(this));
  };

  Game.prototype.isMoneyLoss = function() {
    return this.score < Election.WINNING_SCORE;
  };

  Game.prototype.isOver = function() {
    return this.billsCreated === Election.NUM_BILLS
      && this.papersCreated === Election.NUM_PAPERS;
  };

  Game.prototype.isPressLoss = function() {
    return this.pressPoints < 1;
  };

  Game.prototype.isWon = function() {
    return this.score >= Election.WINNING_SCORE && this.pressPoints > 0;
  };

  Game.prototype.remove = function(object) {
    if(object instanceof Election.Bill) {
      this.bills.shift();
    } else if (object instanceof Election.Newspaper) {
      this.papers.shift();
    }
  };

  Game.prototype.removeHandController = function() {
    document.removeEventListener('keydown', handControls.bind(this));
  };

  Game.prototype.removeNavController = function() {
    document.removeEventListener('keydown', navControls.bind(this));
  };

  Game.prototype.run = function() {
    this.instantiateNavController();
    this.runDirections();
  };

  Game.prototype.runDirections = function() {
    var game = this;
    this.timer4 = setInterval(
      function() {
        game.startView.render();
      }, (1000 / Election.FPS)
    );
  };

  Game.prototype.runGameplay = function() {
    var game = this;
    this.runHand();
    setTimeout(game.runFallingObjects.bind(game), 1500);
  };

  Game.prototype.runHand = function() {
    var game = this;
    this.instantiateHandController();

    this.timer1 = setInterval(
      function() {
        game.update();
        game.gameView.render();
        if(game.isOver()){
          if(game.isWon()) {
            game.finishView.renderWin();
          } if(game.isMoneyLoss()) {
            game.finishView.renderMoneyLoss();
            if(game.isPressLoss()) {
              game.finishView.renderPressLoss();
            }
          } if(game.isPressLoss()) {
            game.finishView.renderPressLoss();
            if(game.isMoneyLoss()) {
              game.finishView.renderMoneyLoss();
            }
          }
          game.stopGameplay();
        }
        // debugger
      }, (1000 / Election.FPS)
    );
  };

  Game.prototype.runFallingObjects = function() {
    var game = this;
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
  };

  Game.prototype.stopDirections = function() {
    clearInterval(this.timer4);
  };

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
          game.collideWithHand(object);
        } else {
          object.update();
        }
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
    paperImg = new Image(),
    imgsLoaded = 0;
handImg.src = 'images/outstretched-hand.png';
billImg.src = 'images/million_dollar_bill.jpg';
paperImg.src = 'images/newspaper.png';

var imgLoadCallback = function(){
  imgsLoaded += 1;
  if(imgsLoaded === 3) {
    var game = new Election.Game(ctx, handImg, billImg, paperImg);
    game.run();
  }
};

billImg.addEventListener("load", imgLoadCallback);
handImg.addEventListener("load", imgLoadCallback);
paperImg.addEventListener("load", imgLoadCallback);
