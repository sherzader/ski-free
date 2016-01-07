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
    this.skierStraight = false;
    this.skierRight = false;

    this.skier = new SkiFree.Skier(
      { x: this.DIM_X / 2, y: 20 }
    );
  };

  Game.prototype.drawBackdrop = function () {
    //canvas is 600x600, this will be 1800x1800
    var randTreeCount = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    var randMogulCount = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    for (var i = 0; i < randTreeCount; i++){
      this.trees.push(new SkiFree.Tree(this.randomPosition()));
    };

    for (var i = 0; i < randMogulCount; i++){
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

    this.skierImage.src = "./assets/skier.png";
    this.skierLeftImage.src = "./assets/left-skier.png";
    this.skierRightImage.src = "./assets/right-skier.png";
    this.treeImage.src = "./assets/large-tree-transp.png";
    this.mogulImage.src = "./assets/moguls.png";
  };

  Game.prototype.draw = function (ctx) {
    //clear skier's trail
    ctx.clearRect(this.skier.oldCoords[0], this.skier.oldCoords[1], 31, 48);

    if (this.skierStraight){
      ctx.drawImage(this.skierImage, this.skier.x, this.skier.y);
    } else if (this.skierLeft) {
      ctx.drawImage(this.skierLeftImage, this.skier.x, this.skier.y);
    } else {
      ctx.drawImage(this.skierRightImage, this.skier.x, this.skier.y);
    }

    this.moguls.forEach(function (mogul) {
      ctx.clearRect(mogul.x, mogul.y, 92, 42);
      ctx.drawImage(this.mogulImage, mogul.x, mogul.setYPosition());
    }.bind(this));

    this.trees.forEach(function (tree) {
      ctx.clearRect(tree.x, tree.y, 30, 53);
      ctx.drawImage(this.treeImage, tree.x, tree.setYPosition());
    }.bind(this));
  };

  Game.prototype.step = function () {
    var randomTreeCount = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    var randomMogulCount = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

      //delete top row of moguls and trees
    this.moguls.forEach(function (mogul) {
      if (mogul.x === 0){
        delete mogul;
      }
    });

    this.trees.forEach(function (tree) {
      if (tree.x === 0){
        delete tree;
      }
    });

    //create bottom row of trees and moguls
    for (var i = 0; i < randomTreeCount; i++){
      this.trees.push(new SkiFree.Tree(this.randomXPos(), canvas.height));
    };

    for (var i = 0; i < randomMogulCount; i++){
      this.moguls.push(new SkiFree.Mogul(this.randomXPos(), canvas.height));
    };
  };


})();
