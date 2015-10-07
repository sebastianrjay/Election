;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Bill = Election.Bill = function(options) {
    options.height = 60, options.width = 30;

    Election.FallingObject.call(this, options);
  };

  Election.Util.inherits(Bill, Election.FallingObject);
})();
