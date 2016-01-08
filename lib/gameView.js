(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var GameView = SkiFree.GameView = function (game, ctx, canvas){
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
  };

  GameView.prototype.start = function(){
    setInterval(function(){
      this.game.draw(this.ctx);
    }.bind(this), 20);

    setInterval(function () {
      this.game.step();
    }.bind(this), 1000);
  };

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
        this.game.skierLeft = true;
        this.game.skierRight = false;
        this.game.skierStraight = false;

        this.game.skier.moveLeft();
      break;

      case 39:
        this.game.skierRight = true;
        this.game.skierStraight = false;
        this.game.skierLeft = false;

        this.game.skier.moveRight();
      break;

      case 40:
        this.game.skierStraight = true;
        this.game.skierRight = false;
        this.game.skierLeft = false;
      break;
    }
  }.bind(this), false);

})();
