(() => {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }
  let setIntID = null;
  let setIntIDGame = null;
  let setIntIDYeti = null;

  var GameView = (SkiFree.GameView = function(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.direction = DIRECTIONS.straight;
    this.lastDirection = this.direction;
    this.gameStarted = false;
  });

  GameView.prototype.changeDirection = function(newDir) {
    this.lastDirection = this.direction;
    this.direction = newDir;
  };

  GameView.prototype.stop = function(time) {
    clearInterval(setIntID);
    clearInterval(setIntIDGame);
    clearInterval(setIntIDYeti);

    setTimeout(() => {
      clearInterval(this.game.yeti.setIntIDCaught);
      this.drawGameOver();
    }, time);
  };

  GameView.prototype.step = function() {
    setIntID = setInterval(() => {
      this.game.checkCollisions(this.direction);
      this.game.draw(this.direction);

      if (this.game.skier.caught) {
        this.game.drawCaughtScene();
        this.stop(1200);
      }
      if (this.game.skier.wipeout) {
        this.stop(1000);
      }
    }, 20);
    setIntIDGame = setInterval(() => {
      if (time < 2400) {
        this.game.showYeti = true;
      } else {
        this.game.showYeti = false;
        this.game.chaseSkier = true;
      }
      this.game.step(this.direction);
      time += 300;
    }, 300);
  };

  window.addEventListener(
    "keydown",
    function(e) {
      switch (e.keyCode) {
        case 32:
          if (!this.gameStarted) {
            this.gameView.step();
            this.gameStarted = true;
          }
          if (this.gameView.direction !== DIRECTIONS.jump) {
            this.gameView.changeDirection(DIRECTIONS.jump);
          }
          break;
        case 37:
          this.gameView.changeDirection(DIRECTIONS.left);
          break;

        case 39:
          this.gameView.changeDirection(DIRECTIONS.right);
          break;

        case 40:
          this.gameView.changeDirection(DIRECTIONS.straight);
          break;
      }
    },
    false
  );

  window.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 32:
        this.gameView.changeDirection(this.gameView.lastDirection);
        break;
      default:
        break;
    }
  });

  GameView.prototype.drawGameOver = function() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
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
  };
})();
