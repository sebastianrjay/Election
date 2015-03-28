;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Hand = Election.Hand = function () {
    this.img = Resources.get('images/outstretched_hand.jpg');
    this.x = Math.floor(Election.DIM_X / 2);
    this.y = Election.DIM_Y - 21;
  };

  Hand.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y);
  }
})();
