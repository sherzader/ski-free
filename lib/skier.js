(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Skier = SkiFree.Skier = function (obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.vel = [5, 5];
    this.oldCoords = [];
  };

  Skier.prototype.moveLeft = function () {
    this.oldCoords = [this.x, this.y];

    this.x -= this.vel[0];
    this.y += this.vel[1];
  };


  Skier.prototype.moveRight = function () {
    this.oldCoords = [this.x, this.y];

    this.x += this.vel[0];
    this.y += this.vel[1];
  };


  Skier.prototype.moveStraight = function () {
    this.oldCoords = [this.x, this.y];

    // this.y += this.vel[1];
  };

  // SkiFree.Util.inherits = function(ChildClass, ParentClass) {
  //   function Surrogate () {};
  //
  //   Surrogate.prototype = ParentClass.prototype;
  //   ChildClass.prototype = new Surrogate();
  //   ChildClass.prototype.construtor = ChildClass;
  // };


})();
