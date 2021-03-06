(function() {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }

  var Mogul = (SkiFree.Mogul = function(pos, onloadCB) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = 92;
    this.height = 42;
    this.speed = 3;
    this.image = new Image();
    this.image.src = "./assets/moguls.png";
    this.image.onload = () => {
      onloadCB();
    };
  });

  Mogul.prototype.moveY = function() {
    this.y = this.y - this.speed;

    return this.y;
  };
  Mogul.prototype.moveX = function(dir) {
    if (dir === "right") {
      this.x = this.x - this.speed;
    } else if (dir === "left") {
      this.x = this.x + this.speed;
    }
    return this.x;
  };
  Mogul.prototype.draw = function(dir) {
    ctx.drawImage(this.image, this.moveX(dir), this.moveY());
  };
})();
