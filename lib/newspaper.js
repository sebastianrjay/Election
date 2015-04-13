;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Newspaper = Election.Newspaper = function(options) {
    options.height = 80;
    options.width = 80;

    Election.FallingObject.call(this, options);
  };

  Election.Util.inherits(Newspaper, Election.FallingObject);
})();
