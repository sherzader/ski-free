(() => {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }

  var GameView = (SkiFree.GameView = function(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.direction = "straight";
    this.lastDirection = null;
    this.gameOver = false;
  });
  GameView.prototype.changeDirection = function(newDir) {
    this.lastDirection = this.direction;
    this.direction = newDir;
  };

  GameView.prototype.stop = function() {
    clearInterval(setIntID);
    clearInterval(setNextIntID);

    setTimeout(
      function() {
        this.restartGame();
      }.bind(this),
      1000
    );
  };

  GameView.prototype.restartGame = function() {
    this.gameOver = true;
    this.drawGameOver();
  };

  GameView.prototype.step = function() {
    setIntID = setInterval(() => {
      this.game.checkCollisions(this.direction);
      this.game.draw(this.direction);
      if (this.game.wipeout) {
        this.stop();
      }
    }, 20);
    setNextIntID = setInterval(
      function() {
        this.game.step(this.direction);
      }.bind(this),
      300
    );
  };

  GameView.prototype.start = function() {
    setTimeout(() => {
      if (this.gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.game.setup();
      }
      this.game.drawInitialBackdrop();
      this.step();
    }, 500);
  };

  window.addEventListener(
    "keydown",
    function(e) {
      switch (e.keyCode) {
        case 13:
          this.gameView.start();
          break;

        case 32:
          this.gameView.changeDirection(DIRECTIONS.jump);

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
        this.gameView.changeDirection(this.lastDirection);
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
