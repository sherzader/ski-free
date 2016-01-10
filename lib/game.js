(function (){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Game = SkiFree.Game = function (DIM_X, DIM_Y) {
    this.initMedia();
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.trees = [];
    this.moguls = [];
    this.drawBackdrop();
    this.skierLeft = false;
    this.skierStraight = true;
    this.skierRight = false;
    this.collision = false;

    this.skier = new SkiFree.Skier(
      { x: this.DIM_X / 2, y: this.DIM_Y / 5 }
    );
  };

  Game.prototype.drawBackdrop = function () {
    //canvas is 600x600, this will be 1800x1800
    var randomTreeCount = Math.random(4);
    var randomMogulCount = Math.random(4);

    for (var i = 0; i < randomTreeCount; i++){
      var tree = new SkiFree.Tree(this.randomPosition());
      this.trees.push(tree);
    };

    for (var i = 0; i < randomMogulCount; i++){
      this.moguls.push(new SkiFree.Mogul(this.randomPosition()));
    };
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.randomXPos = function () {
    return Math.random() * this.DIM_X;
  };

  Game.prototype.initMedia = function () {
    this.skierImage = new Image();
    this.skierLeftImage = new Image();
    this.skierRightImage = new Image();
    this.treeImage = new Image();
    this.mogulImage = new Image();
    this.wipeoutSkier = new Image();

    this.skierImage.src = "./assets/skier.png";
    this.skierLeftImage.src = "./assets/skierLeft.png";
    this.skierRightImage.src = "./assets/skierRight.png";
    this.treeImage.src = "./assets/tree.png";
    this.mogulImage.src = "./assets/moguls.png";
    this.wipeoutSkier.src = "./assets/wipeout.png";
  };

  Game.prototype.drawStraight = function (ctx) {
    ctx.clearRect(this.skier.x, this.skier.y, 18, 34);

    //clear skier's trail
    this.moguls.forEach(function (mogul) {
      ctx.clearRect(mogul.x, mogul.y, 92, 42);
      ctx.drawImage(this.mogulImage, mogul.x, mogul.moveY());
    }.bind(this));

    this.trees.forEach(function (tree) {
      ctx.clearRect(tree.x, tree.y, 52, 79);
      ctx.drawImage(this.treeImage, tree.x, tree.moveY());
    }.bind(this));

    ctx.drawImage(this.skierImage, this.skier.x, this.skier.y);
  };

  Game.prototype.drawLeft = function (ctx) {
    ctx.clearRect(this.skier.x, this.skier.y, 18, 34);

    //clear skier's trail
    this.moguls.forEach(function (mogul) {
      ctx.clearRect(mogul.x, mogul.y, 92, 42);
      ctx.drawImage(this.mogulImage, mogul.moveXLeft(), mogul.moveY());
    }.bind(this));

    this.trees.forEach(function (tree) {
      ctx.clearRect(tree.x, tree.y, 52, 79);
      ctx.drawImage(this.treeImage, tree.moveXLeft(), tree.moveY());
    }.bind(this));

    ctx.drawImage(this.skierLeftImage, this.skier.x, this.skier.y);
  };

  Game.prototype.drawRight = function (ctx) {
    ctx.clearRect(this.skier.x, this.skier.y, 18, 34);

    //clear skier's trail
    this.moguls.forEach(function (mogul) {
      ctx.clearRect(mogul.x, mogul.y, 92, 42);
      ctx.drawImage(this.mogulImage, mogul.moveXRight(), mogul.moveY());
    }.bind(this));

    this.trees.forEach(function (tree) {
      ctx.clearRect(tree.x, tree.y, 52, 79);
      ctx.drawImage(this.treeImage, tree.moveXRight(), tree.moveY());
    }.bind(this));

    ctx.drawImage(this.skierRightImage, this.skier.x, this.skier.y);
  };


  Game.prototype.checkCollisions = function () {
    this.trees.forEach(function (tree) {
      if (tree.x === this.skier.x && tree.y === this.skier.y){
        this.collision = true;
      }
    }.bind(this));
  };


  Game.prototype.step = function () {
    //add trees and moguls to canvas as skier moves

    var randomTreeCount = Math.random(4);
    var randomMogulCount = Math.random(4);

    for (var i = 0; i < randomTreeCount; i++){
      var tree = new SkiFree.Tree([this.randomXPos(), canvas.height]);
      this.trees.push(tree);
    }

    for (var i = 0; i < randomMogulCount; i++){
      this.moguls.push(new SkiFree.Mogul([ this.randomXPos(), canvas.height ]));
    }
  };

})();
