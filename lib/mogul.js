(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Mogul = SkiFree.Mogul = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
  };

  Mogul.prototype.setXPosition = function () {
    this.x = this.x - 5;
    return this.x;
  };

  Mogul.prototype.setYPosition = function () {
    this.y = this.y - 5;
    return this.y;
  };

})();
