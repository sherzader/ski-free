(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Mogul = SkiFree.Mogul = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
  };

  Mogul.prototype.moveY = function () {
    this.y = this.y - 5;

    return this.y;
  };

  Mogul.prototype.moveXRight = function () {
    this.x = this.x - 5;

    return this.x;
  };

  Mogul.prototype.moveXLeft = function () {
    this.x = this.x + 5;

    return this.x;
  };

})();
