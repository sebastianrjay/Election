;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var FallingObject = Election.FallingObject = function (options) {
    this.img = options.img;
    this.width = options.width;
    this.height = options.height;
    this.x = Math.floor(Math.random() * (Election.DIM_X - this.width));
    this.y = 0;
    this.xVel = this.calcXVelocity();
    this.xVelDivisor = 40;
    this.yVel = 2;
    this.yAccel = 2;
  };

  FallingObject.prototype.calcXVelocity = function() {
    var range = [this.x, (Election.DIM_X - this.x)].sort()[0];
    return Math.floor((((2 * Math.random()) - 1) * range) / this.xVelDivisor);
  };

  FallingObject.prototype.update = function() {
    this.x += this.xVel;
    this.y += this.yVel;
    this.yVel += this.yAccel;
  };

  FallingObject.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
})();
