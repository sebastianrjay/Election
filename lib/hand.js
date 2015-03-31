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
})();
