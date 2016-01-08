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

  Game.prototype.moveBackdropLeft = function () {

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

    this.skierImage.src = "./assets/skier.png";
    this.skierLeftImage.src = "./assets/skierLeft.png";
    this.skierRightImage.src = "./assets/skierRight.png";
    this.treeImage.src = "./assets/tree.png";
    this.mogulImage.src = "./assets/moguls.png";
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(this.skier.oldCoords[0], this.skier.oldCoords[1], 18, 34);

    //clear skier's trail
    this.moguls.forEach(function (mogul) {
      ctx.clearRect(mogul.x, mogul.y, 92, 42);
      ctx.drawImage(this.mogulImage, mogul.x, mogul.setYPosition());
    }.bind(this));

    this.trees.forEach(function (tree) {
      ctx.clearRect(tree.x, tree.y, 52, 79);
      ctx.drawImage(this.treeImage, tree.x, tree.setYPosition());
    }.bind(this));


    if (this.skierStraight){
      ctx.drawImage(this.skierImage, this.skier.x, this.skier.y);
    } else if (this.skierLeft) {
      ctx.drawImage(this.skierLeftImage, this.skier.x, this.skier.y);
    } else {
      ctx.drawImage(this.skierRightImage, this.skier.x, this.skier.y);
    }

  };

  Game.prototype.step = function () {
    var randomTreeCount = Math.random(4);
    var randomMogulCount = Math.random(4);

    //create bottom row of trees and moguls
    for (var i = 0; i < randomTreeCount; i++){
      var tree = new SkiFree.Tree([this.randomXPos(), canvas.height]);
      this.trees.push(tree);
    }

    for (var i = 0; i < randomMogulCount; i++){
      this.moguls.push(new SkiFree.Mogul([ this.randomXPos(), canvas.height ]));
    }
  };

})();
