;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Hand = Election.Hand = function (img) {
    this.img = img;
    this.width = 70;
    this.height = 70;
    this.x = Math.floor((Election.DIM_X - this.width) / 2);
    this.y = Election.DIM_Y - this.height;
  };

  Hand.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  Hand.prototype.handleInput = function(dir) {
    if (dir === "left" && this.x >= 0) {
      this.x -= 16;
    } else if ((dir === "left" && this.x <= 0)
      || (dir === "right" && this.x >= (Election.DIM_X - this.width))) {
      this.wrap(dir);
    } else if (dir === "right" && this.x <= (Election.DIM_X - this.width)) {
      this.x += 16;
    }
  }

  Hand.prototype.wrap = function(dir) {
    if (dir === "left") {
      this.x = Election.DIM_X - this.width;
    } else if (dir === "right"){
      this.x = 0;
    }
  }
})();
