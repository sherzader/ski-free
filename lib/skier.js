(function() {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }

  var Skier = (SkiFree.Skier = function(obj, onloadCB) {
    this.x = obj.x;
    this.y = obj.y;
    this.width = 29; // a lil smaller so skier can duck under trees
    this.height = 29;
    this.wipeout = false;
    this.image = new Image();
    this.image.src = "./assets/spritesheet.png";
    this.image.onload = () => {
      onloadCB();
    };
  });
  Skier.prototype.updateDimensions = function(width, height) {
    this.width = width;
    this.height = height;
  };

  Skier.prototype.collidedWith = function(object) {
    let offset = 0;
    if (object instanceof SkiFree.Tree) {
      // the tree is not a rectangle but canvas will draw it as one.
      // offset is the extra width around the tree.
      offset = 10;
    }
    return (
      this.x < object.x + (object.width - offset) &&
      this.y < object.y + (object.height - offset) &&
      this.x + this.width > object.x &&
      this.y + this.height > object.y
    );
  };

  Skier.prototype.draw = function(direction) {
    if (this.wipeout) {
      return ctx.drawImage(this.image, 243, 0, 32, 32, this.x, this.y, 32, 32);
    }
    switch (direction) {
      case DIRECTIONS.right:
        xPos = 50;
        yPos = 0;
        width = 15;
        height = 34;
        break;
      case DIRECTIONS.left:
        xPos = 481;
        yPos = 0;
        width = 15;
        height = 34;
        break;
      case DIRECTIONS.jump:
        xPos = 86;
        yPos = 0;
        width = 33;
        height = 34;
        break;
      default:
        // straight
        xPos = 67;
        yPos = 0;
        width = 19;
        height = 34;
        break;
    }
    this.updateDimensions(width, height);
    ctx.drawImage(
      this.image,
      xPos,
      yPos,
      width,
      height,
      this.x,
      this.y,
      width,
      height
    );
  };
})();
