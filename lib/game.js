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

    var randTreeCount = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    var randBumpCount = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    for (var i = 0; i < randTreeCount; i++){
      this.trees.push(this.randomPosition());
    };

    for (var i = 0; i < randBumpCount; i++){
      this.bumps.push(this.randomPosition());
    };

    this.skier = new SkiFree.Skier(
      { x: this.DIM_X / 2, y: 20 }
    );
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

    this.skierImage.src = "./assets/skier.png";
    this.skierLeftImage.src = "./assets/left-skier.png";
    this.skierRightImage.src = "./assets/right-skier.png";
    this.treeImage.src = "./assets/large-tree-transp.png";
    this.bumpsImage.src = "./assets/moguls.png";
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(this.skier.oldCoords[0], this.skier.oldCoords[1], 31, 48);
    ctx.drawImage(this.skierImage, this.skier.x, this.skier.y);

    this.bumps.forEach(function (bump) {
      ctx.drawImage(this.bumpsImage, bump[0], bump[1]);
    }.bind(this));

    this.trees.forEach(function (tree) {
      ctx.drawImage(this.treeImage, tree[0], tree[1]);
    }.bind(this));
  };

  Game.prototype.whichSkier = function () {
    // left if keydown keycode is 37
    // right if keydown keycode is 39
    // straight if keydown keycode is 40

  };


})();
