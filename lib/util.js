;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.Util = {};

  Election.Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Election.Util.distanceMagnitude = function(pos1, pos2) {
    return Math.sqrt(Math.pow((pos2[0] - pos1[0]), 2) + Math.pow((pos2[1] - pos1[1]), 2));
  };

  Election.Util.renderTitle = function() {
    var title = "Election";
    ctx.font = "48px serif";
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FF0000';
    ctx.fillText(title, (Election.DIM_X / 2) + 4, 100);
  };
})();
