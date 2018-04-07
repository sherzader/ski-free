(function() {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }

  var Skier = (SkiFree.Skier = function(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.width = 29; // a lil smaller so skier can duck under trees
    this.height = 29;
    this.vel = [5, 5];
    this.oldCoords = [];
  });
  Skier.prototype.updateDimensions = function(width, height) {
    this.width = width;
    this.height = height;
  };
  Skier.prototype.moveLeft = function() {
    this.oldCoords = [this.x, this.y];

    this.x -= this.vel[0];
    this.y += this.vel[1];
  };

  Skier.prototype.moveRight = function() {
    this.oldCoords = [this.x, this.y];

    this.x += this.vel[0];
    this.y += this.vel[1];
  };

  Skier.prototype.moveStraight = function() {
    this.oldCoords = [this.x, this.y];

    this.y += this.vel[1];
  };
  Skier.prototype.collidedWith = function(object) {
    let offset = 0;
    if (object instanceof SkiFree.Tree) {
      offset = 10;
    }
    return (
      this.x < object.x + (object.width - offset) &&
      this.y < object.y + (object.height - offset) &&
      this.x + this.width > object.x &&
      this.y + this.height > object.y
    );
  };
})();
