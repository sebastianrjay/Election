;(function () {
  if (typeof Election === "undefined") {
    window.Election = {};
  }

  var Newspaper = Election.Newspaper = function(options) {
    options.height = 60;
    options.width = 60;

    Election.FallingObject.call(this, options);
  };

  Election.Util.inherits(Newspaper, Election.FallingObject);
})();
