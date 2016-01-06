(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var Skier = SkiFree.Skier = function (obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.vel = [5, 5];
  };

  Skier.prototype.moveLeft = function () {
    this.x -= this.vel[0];
    this.y += this.vel[1];
  };


  Skier.prototype.moveRight = function () {
    this.x += this.vel[0];
    this.y += this.vel[1];
  };


  Skier.prototype.moveStraight = function () {
    this.y += this.vel[1];
  };


})();
