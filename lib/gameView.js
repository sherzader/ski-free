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
    }.bind(this), 3000);
  };

  GameView.prototype.restartGame = function() {
    setTimeout(function () {
      this.start();
    }.bind(this), 3000);

    this.drawGameOver();
  };

  GameView.prototype.drawGameOver = function () {
    ctx.fillStyle = '#000';
    ctx.fillRect(100, 100, 500, 300);
    ctx.font="64px Arial";
    ctx.fillStyle = "yellow";
    var text = "GAME OVER";
    var width = ctx.measureText(text).width;
    ctx.fillText(text, 700 / 2 - width / 2, 200);

    // ctx.font = "22px Arial";
    // var restartText = "press down key";
    // ctx.fillText(restartText, 190, 350);

    setTimeout(function(){
      document.location.reload();
    }, 5000 );
  };

  GameView.prototype.start = function() {
    this.drawSplashPage(this.ctx);
    this.game.drawInitialBackdrop(this.ctx);
    this.step();
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
    }.bind(this), 30);

    setNextIntID = setInterval(function () {
      this.game.step();
    }.bind(this), 1000);

  };

  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
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
  //
  // window.addEventListener('keydown', function (e) {
  //   switch (e.keyCode) {
  //     case 37:
  //       this.game.drawLeft(this.ctx, true);
  //     break;
  //
  //     case 39:
  //       this.game.drawRight(this.ctx, true);
  //     break;
  //
  //     case 40:
  //       this.game.drawStraight(this.ctx, true);
  //     break;
  //   }
  // }.bind(this), false);

  GameView.prototype.drawSplashPage = function(){

  };

})();
