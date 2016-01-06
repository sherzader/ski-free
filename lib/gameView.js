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
      // this.game.step();
      this.game.draw(this.ctx);
    }, 20);
  };

  GameView.prototype.drawMessageSign = function (ctx, canvas) {
    ctx.strokeStyle = 'blue';
    ctx.font = '36px VT323'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(canvas.width - 300, 0, 200, 50);
    ctx.fillStyle = 'white';
    ctx.fillText('SkiFree', canvas.width - 200, 50 + (0.1*50));
    ctx.stroke();
    ctx.fill();
  };

  window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37: // Left
        this.game.skier.moveLeft();
      break;

      case 39: // Right
        this.game.skier.moveRight();
      break;

      case 40: // Down
        this.game.skier.moveStraight();
      break;
    }
  }.bind(this), false);

})();
