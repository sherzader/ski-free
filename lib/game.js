(function (){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Game = SkiFree.Game = function (DIM_X, DIM_Y) {
    this.initMedia();
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.trees = [];
    this.bumps = [];
    this.skierSpriteLoaded = false;

    var randTreeCount = Math.floor(Math.random() * (40 - 30 + 1)) + 30;
    var randBumpCount = Math.floor(Math.random() * (15 - 10 + 1)) + 10;

    for (var i = 0; i < randTreeCount; i++){
      this.trees.push(this.randomPosition());
    };

    for (var i = 0; i < randBumpCount; i++){
      this.bumps.push(this.randomPosition());
    };

    this.skier = {
      x: this.DIM_X / 2,
      y: 20
    };
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.initMedia = function () {
    this.skierImage = new Image();
    this.skierLeftImage = new Image();
    this.skierRightImage = new Image();
    this.treeImage = new Image();
    this.bumpsImage = new Image();

    this.skierImage.src = "./assets/skier.jpg";
    this.skierLeftImage.src = "./assets/ski-left.jpg";
    this.skierRightImage.src = "./assets/ski-right.jpg";
    this.treeImage.src = "./assets/large-tree.jpg";
    this.bumpsImage.src = "./assets/bumps.jpg";

    var that = this;

    this.skierImage.onLoad = function () {
      that.skierSpriteLoaded = true;
    };
  };

  Game.prototype.draw = function (ctx) {
    ctx.drawImage(this.skierImage, this.skier.x, this.skier.y);

    this.trees.forEach(function (tree) {
      ctx.drawImage(this.treeImage, tree[0], tree[1]);
    }.bind(this));

    this.bumps.forEach(function (bump) {
      ctx.drawImage(this.bumpsImage, bump[0], bump[1]);
    }.bind(this));

    if (this.skierSpriteLoaded){
      ctx.drawImage(this.skierImage, this.skier.x, this.skier.y);
    }
  };


})();
