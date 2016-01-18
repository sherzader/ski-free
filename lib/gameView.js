(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var GameView = SkiFree.GameView = function (game, ctx, canvas){
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
    this.goLeft = false;
    this.goRight = false;
    this.goStraight = false;
  };

  GameView.prototype.moveLeft = function () {
    this.goLeft = true;
    this.goRight = false;
    this.goStraight = false;
  };

  GameView.prototype.moveRight = function () {
    this.goLeft = false;
    this.goRight = true;
    this.goStraight = false;
  };

  GameView.prototype.moveStraight = function () {
    this.goLeft = false;
    this.goRight = false;
    this.goStraight = true;
  };

  GameView.prototype.stop = function() {
    clearInterval(setIntID);
    clearInterval(setNextIntID);

    setTimeout(function(){
      this.restartGame();
    }.bind(this), 1000);
  };

  GameView.prototype.restartGame = function() {
    this.drawGameOver();
  };

  GameView.prototype.start = function() {
    setTimeout(function(){
      this.game.drawInitialBackdrop(this.ctx);
      this.step();
    }.bind(this), 500);
  };

  GameView.prototype.step = function() {
    setIntID = setInterval(function() {
      this.game.checkCollisions();
      if (this.goLeft){
        this.game.drawLeft(this.ctx);
      } else if (this.goRight) {
        this.game.drawRight(this.ctx);
      } else if (this.goStraight) {
        this.game.drawStraight(this.ctx);
      }

      if (this.game.wipeout){
        this.stop();
      }
    }.bind(this), 20);

    setNextIntID = setInterval(function () {
      this.game.step();
    }.bind(this), 300);

  };

  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 38:
        this.gameView.start();
      break;

      case 37:
        this.gameView.moveLeft();
      break;

      case 39:
        this.gameView.moveRight();
      break;

      case 40:
        this.gameView.moveStraight();
      break;
    }
  }.bind(this), false);

  GameView.prototype.drawGameOver = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, this.game.DIM_X, this.game.DIM_Y);
    ctx.font = "84px VT323";
    ctx.fillStyle = "yellow";
    ctx.shadowColor = "#f90";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;
    var text = "GAME OVER";
    var width = ctx.measureText(text).width;
    ctx.fillText(text, this.game.DIM_X / 2 - width / 2, this.game.DIM_Y / 3);

    setTimeout(function(){
      document.location.reload();
    }, 3000 );
  };

})();
