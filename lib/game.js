(function() {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }
  const NUM_OBJECTS = 4; // skier, tree, mogul, yeti
  var Game = (SkiFree.Game = function(DIM_X, DIM_Y) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.initMedia();
    this.setup();
    this.imagesLoaded = 0;
  });

  Game.prototype.setup = function() {
    this.trees = [];
    this.moguls = [];
    this.wipeout = false;
    this.points = 0;
    this.skier = new SkiFree.Skier({ x: this.DIM_X / 2, y: this.DIM_Y / 5 });
  };

  Game.prototype.drawInitialBackdrop = function() {
    var randomTreeCount = Math.round(Math.random());
    var randomMogulCount = Math.round(Math.random());

    for (var i = 0; i < randomTreeCount; i++) {
      this.trees.push(new SkiFree.Tree(this.randomPosition()));
    }

    for (var i = 0; i < randomMogulCount; i++) {
      this.moguls.push(new SkiFree.Mogul(this.randomPosition()));
    }
  };

  Game.prototype.initMedia = function() {
    this.skierImage = new Image();
    this.treeImage = new Image();
    this.mogulImage = new Image();
    this.yetiImage = new Image();

    this.skierImage.src = "./assets/spritesheet.png";
    this.yetiImage.src = "./assets/spritesheet.png";
    this.treeImage.src = "./assets/tree.png";
    this.mogulImage.src = "./assets/moguls.png";

    this.skierImage.onload = () => {
      this.imagesLoaded += 1;
    };
    this.treeImage.onload = () => {
      this.imagesLoaded += 1;
    };
    this.mogulImage.onload = () => {
      this.imagesLoaded += 1;
    };
    this.yetiImage.onload = () => {
      this.imagesLoaded += 1;
    };
  };

  Game.prototype.hasLoaded = function() {
    return this.imagesLoaded === NUM_OBJECTS;
  };

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function(direction) {
    // clear everything before redraw, prevents white box overlaps
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.direction = direction;
    this.moguls.forEach(
      function(mogul) {
        ctx.drawImage(this.mogulImage, mogul.moveX(direction), mogul.moveY());
      }.bind(this)
    );

    this.trees.forEach(
      function(tree) {
        ctx.drawImage(this.treeImage, tree.moveX(direction), tree.moveY());
      }.bind(this)
    );

    this.drawSkier(direction);
  };

  Game.prototype.drawSkier = function() {
    if (this.wipeout) {
      return ctx.drawImage(
        this.skierImage,
        243,
        0,
        32,
        32,
        this.skier.x,
        this.skier.y,
        32,
        32
      );
    }
    switch (this.direction) {
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
    this.skier.updateDimensions(width, height);
    ctx.drawImage(
      this.skierImage,
      xPos,
      yPos,
      width,
      height,
      this.skier.x,
      this.skier.y,
      width,
      height
    );
  };

  Game.prototype.updateScore = function() {
    var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, 150, 50);
    ctx.font = "24px VT323";
    var text = "Score: " + this.points;
    var width = ctx.measureText(text).width;
    ctx.fillStyle = "white";
    ctx.fillText(text, 25, 25);
  };

  Game.prototype.checkCollisions = function() {
    this.trees.forEach(tree => {
      if (this.skier.collidedWith(tree)) {
        this.wipeout = true;
      }
    });
  };

  Game.prototype.getRandomPositionForDir = function(dir) {
    const [x, y] = this.randomPosition();
    switch (dir) {
      case DIRECTIONS.right:
        return [[this.DIM_X, y], [x, this.DIM_Y]];
      case DIRECTIONS.left:
        return [[x, this.DIM_Y], [0, y]];
      default:
        return [[x, this.DIM_Y], null];
    }
  };

  Game.prototype.step = function(dir) {
    //add trees and moguls to canvas as skier moves
    var randomTreeCount = Math.round(Math.random());
    var randomMogulCount = Math.round(Math.random());

    for (var i = 0; i < randomTreeCount; i++) {
      const [treePos1, treePos2] = this.getRandomPositionForDir(dir);
      this.trees.push(new SkiFree.Tree(treePos1));
      if (treePos2) {
        this.trees.push(new SkiFree.Tree(treePos2));
      }
    }

    for (var i = 0; i < randomMogulCount; i++) {
      const mogulPos = this.getRandomPositionForDir(dir);
      this.moguls.push(new SkiFree.Mogul(mogulPos));
    }
  };
})();
