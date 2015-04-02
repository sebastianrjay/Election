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
})();
