;(function (global) {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Game = Election.Game = function (options) {
    global.ctx = options.ctx;
    global.ctxTop = options.ctxTop;
    this.options = options;
    this.bills = [], this.papers = [];
    this.hand = new Election.Hand(options.handImg);
    this.gameView = new Election.GameView(this);
    this.startView = new Election.StartView(this);
    this.finishView = new Election.FinishView(this);
    this.pressPoints = 10, this.score = 0;
    this.billsCreated = 0, this.papersCreated = 0;
  };

  Game.prototype.addBill = function() {
    if(this.billsCreated < Election.NUM_BILLS) {
      this.bills.push(new Election.Bill({ img: this.options.billImg }));
      this.billsCreated += 1;
    }
  };

  Game.prototype.addNewspaper = function() {
    if(this.papersCreated < Election.NUM_PAPERS) {
      this.papers.push(new Election.Newspaper({ img: this.options.paperImg }));
      this.papersCreated += 1;
    }
  };

  Game.prototype.allObjects = function() {
    return [this.hand].concat(this.bills).concat(this.papers);
  };

  Game.prototype.collideWithHand = function(object) {
    if(object instanceof Election.Bill) {
      this.options.audioEl.src = "audio/cha_ching_register.mp3";
      this.score += 1;
    } else if(object instanceof Election.Newspaper) {
      this.options.audioEl.src = "audio/dean_scream.mp3";
      this.pressPoints -= 1;
      this.gameView.renderHowardDean();
    }
    this.options.audioEl.play();
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
    this.options.musicEl.src = 'audio/politician.mp3';
    this.options.musicEl.play();
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
          Election.Util.createBlankScreen();
          game.options.musicEl.pause();
          if(game.isWon()) {
            game.options.audioEl.src = "audio/stars_and_stripes.mp3";
            game.finishView.renderWin();
          } else {
            game.options.audioEl.src = "audio/sad_trombone.mp3";
            if(game.isMoneyLoss()) {
              game.finishView.renderMoneyLoss();
            } if(game.isPressLoss()) {
              game.finishView.renderPressLoss();
            }
          }
          game.stopGameplay();
        }
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
    this.options.audioEl.play();
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
