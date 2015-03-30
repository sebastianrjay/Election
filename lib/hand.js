;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Hand = Election.Hand = function () {
    this.img = new Image();
    this.img.src = 'images/outstretched-hand.jpg';
    this.x = Math.floor(Election.DIM_X / 2);
    this.y = Election.DIM_Y - 21;
  };

  Hand.prototype.render = function() {
    debugger
    ctx.drawImage(this.img, this.x, this.y);
  }
})();
