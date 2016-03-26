;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var FallingObject = Election.FallingObject = function (options) {
    this.img = options.img;
    this.width = options.width, this.height = options.height;
    this.x = Math.floor(Math.random() * (Election.DIM_X - this.width));
    this.y = 0;
    this.center = [(this.x + (this.width / 2)), (this.y + (this.height / 2))];
    this.XVELDIVISOR = 120;
    this.setXVelocity();
    this.yVel = 1, this.yAccel = 0.18;
  };

  FallingObject.prototype.isFallen = function() {
    return this.y >= Election.DIM_Y;
  };

  FallingObject.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  FallingObject.prototype.setXVelocity = function() {
    var range = [this.x, (Election.DIM_X - this.x)].sort()[0];
    this.xVel = (((2 * Math.random()) - 1) * range) / this.XVELDIVISOR;
  };

  FallingObject.prototype.update = function() {
    this.x += this.xVel, this.y += this.yVel;
    this.center = [(this.x + (this.width / 2)), (this.y + (this.height / 2))];
    this.yVel += this.yAccel;
  };
})();
