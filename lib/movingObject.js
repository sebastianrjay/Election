;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.MovingObject = function (img) {
    this.img = img;
    this.width = 70;
    this.height = 70;
    this.x = Math.floor(Math.random() * (Election.DIM_X - this.width));
    this.y = 0;
    this.xVel = this.calcXVelocity();
    this.xVelDivisor = 40;
    this.yVel = 8;
    this.yAccel = 2;
  };

  Election.MovingObject.calcXVelocity = function() {
    var range = [this.x, (Election.DIM_X - this.x)].sort()[0];
    return Math.floor((((2 * Math.random()) - 1) * range) / this.xVelDivisor);
  }

  Election.MovingObject.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
    this.yVel += this.yAccel;
  }

  Election.MovingObject.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
})();
