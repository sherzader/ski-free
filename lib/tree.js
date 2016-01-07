(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Tree = SkiFree.Tree = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
  };

  Tree.prototype.setXPosition = function () {
    this.x = this.x - 5;
    return this.x;
  };

  Tree.prototype.setYPosition = function () {
    this.y = this.y - 5;
    return this.y;
  };

})();
