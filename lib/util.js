;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.Util = {};

  Election.Util.createBlankScreen = function() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, Election.DIM_X, Election.DIM_Y);
  };

  Election.Util.distanceMagnitude = function(pos1, pos2) {
    return Math.sqrt(Math.pow((pos2[0] - pos1[0]), 2) +
      Math.pow((pos2[1] - pos1[1]), 2)
    );
  };

  Election.Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Election.Util.renderText = function(lines, y) {
    ctx.font = "20px serif";
    ctx.textAlign = 'left';
    ctx.fillStyle = '#E0E0E0';
    lines.forEach(function(line) {
      ctx.fillText(line, 100, y);
      y += 50;
    });
  };
})();
