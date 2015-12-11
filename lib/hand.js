// Election.HandController overrides default key repeat behavior
// Inspired by: http://stackoverflow.com/a/3691661

;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  Election.HandController = {
    run: function(keyCallbacks, repeat) {
      var timers = {};

      document.onkeydown = function(event) {
          var key= (event || window.event).keyCode;
          if (!(key in keyCallbacks))
              return true;
          if (!(key in timers)) {
              timers[key] = null;
              keyCallbacks[key]();
              if (repeat !== 0)
                  timers[key] = setInterval(keyCallbacks[key], repeat);
          }
          return false;
      };

      document.onkeyup = function(event) {
          var key= (event || window.event).keyCode;
          if (key in timers) {
              if (timers[key] !== null)
                  clearInterval(timers[key]);
              delete timers[key];
          }
      };

      window.onblur = function() {
          for (key in timers)
              if (timers[key] !== null)
                  clearInterval(timers[key]);
          timers = {};
      };
    }
  };

  var Hand = Election.Hand = function (img) {
    this.img = img;
    this.width = 70, this.height = 70;
    this.x = Math.floor((Election.DIM_X - this.width) / 2);
    this.y = Election.DIM_Y - this.height;
    this.center = [(this.x + (this.width / 2)), (this.y + (this.height / 2))];
  };

  Hand.prototype.handleInput = function(dir) {
    if (dir === "left" && this.x >= 0) {
      this.x -= 6;
    } else if (dir === "right" && this.x <= (Election.DIM_X - this.width)) {
      this.x += 6;
    }
    this.center = [(this.x + (this.width / 2)), (this.y + (this.height / 2))];
  };

  Hand.prototype.isCollidedWith = function(obj) {
    return Election.Util.distanceMagnitude(this.center, obj.center)
      < ((this.width + obj.width) / 2);
  };

  Hand.prototype.render = function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
})();
