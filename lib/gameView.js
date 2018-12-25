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

    const getDirection = x => {
        if (x < canvas.width / 2 - canvas.width * 0.1) {
            return DIRECTIONS.left;
        } else if (x > canvas.width / 2 + canvas.width * 0.1) {
            return DIRECTIONS.right;
        } else {
            return DIRECTIONS.straight;
        }
    };
    const touchHandler = e => {
        if (e.touches) {
            e.preventDefault(); // prevent canvas from dragging
            x = e.touches[0].pageX - canvas.offsetLeft;
            const direction = getDirection(x);
            gameView.changeDirection(direction);
        }
    };
    const beginGame = () => {
        if (!gameStarted) {
            gameView.step();
            gameStarted = true;
        }
        if (gameView.direction !== DIRECTIONS.jump) {
            gameView.changeDirection(DIRECTIONS.jump);
        }
    };
    window.addEventListener(
        "touchstart",
        e => {
            beginGame();
            touchHandler(e);
        },
        { passive: false } // to be able to call preventDefault
    );
    window.addEventListener("touchmove", touchHandler, { passive: false });

    window.addEventListener(
        "keydown",
        function(e) {
            switch (e.keyCode) {
                case 32:
                    beginGame();
                    break;
                case 37:
                    gameView.changeDirection(DIRECTIONS.left);
                    break;
                case 39:
                    gameView.changeDirection(DIRECTIONS.right);
                    break;

                case 40:
                    gameView.changeDirection(DIRECTIONS.straight);
                    break;
            }
        },
        false
    );

    window.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 32:
                gameView.changeDirection(gameView.lastDirection);
                break;
            default:
                break;
        }
    });

    GameView.prototype.drawGameOver = function() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, game.DIM_X, game.DIM_Y);
        ctx.font = "84px VT323";
        ctx.fillStyle = "yellow";
        ctx.shadowColor = "#f90";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 3;
        var text = "GAME OVER";
        var width = ctx.measureText(text).width;
        ctx.fillText(text, game.DIM_X / 2 - width / 2, game.DIM_Y / 3);
    };
})();
