(function() {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }

  var Tree = (SkiFree.Tree = function(pos) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = 39;
    this.height = 72;
    this.speed = 3;
  });

  Tree.prototype.moveY = function() {
    this.y = this.y - this.speed;

    return this.y;
  };

  Tree.prototype.moveX = function(dir) {
    if (dir === "right") {
      this.x = this.x - this.speed;
    } else if (dir === "left") {
      this.x = this.x + this.speed;
    }
    return this.x;
  };
})();
