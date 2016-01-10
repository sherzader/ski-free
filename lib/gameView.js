(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var GameView = SkiFree.GameView = function (game, ctx, canvas){
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;

    this.drawStraight = false;
    this.drawLeft = false;
    this.drawRight = false;
  };

  GameView.prototype.start = function(){
    // setInterval(function(){
    //   if (this.drawLeft){
    //     this.game.drawLeft(this.ctx);
    //   }
    //   else if (this.drawRight) {
    //     this.game.drawRight(this.ctx);
    //   }
    //   else if (this.game.drawStraight){
    //     this.game.drawStraight(this.ctx);
    //   }
    //   // this.game.checkCollisions();
    //   //
    //   // if (this.game.collision){
    //   //   this.game.pause(this.ctx);
    //   // }
    // }.bind(this), 20);

    setInterval(function () {
      this.game.step();
    }.bind(this), 1000);
  };

  // Game.prototype.pause = function (ctx) {
  //   setTimeout(function () {
  //     ctx.drawImage(this.wipeoutSkier, this.skier.x, this.skier.y);
  //   }.bind(this), 5000);
  // };

  GameView.prototype.drawMessageSign = function (ctx, canvas) {
    ctx.strokeStyle = 'blue';
    ctx.font = '36px VT323';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(canvas.width - 300, 0, 200, 50);
    ctx.fillStyle = 'white';
    ctx.fillText('SkiFree', canvas.width - 200, 50 + (0.1*50));
    ctx.stroke();
    ctx.fill();
  };

  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        this.drawLeft = true;
        this.game.drawLeft(this.ctx);
      break;

      case 39:
        this.drawRight = true;
        this.game.drawRight(this.ctx);
      break;

      case 40:
        this.drawStraight = true;
        this.game.drawStraight(this.ctx);
      break;
    }
  }.bind(this), false);

  window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 37:
        this.drawLeft = false;
      break;

      case 39:
        this.drawRight = false;
      break;

      case 40:
        this.drawStraight = false;
      break;
    }
  }.bind(this), false);

})();
