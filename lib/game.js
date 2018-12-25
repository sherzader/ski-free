(function() {
    if (typeof SkiFree === "undefined") {
        window.SkiFree = {};
    }
    const NUM_OBJECTS = 4; // skier, tree, mogul, yeti
    var Game = (SkiFree.Game = function(DIM_X, DIM_Y) {
        this.DIM_X = DIM_X;
        this.DIM_Y = DIM_Y;
        this.imagesLoaded = 0;
        this.totalObjects = 2; // skier, yeti, trees and moguls determined randomly later
        this.showYeti = false;
        this.chaseSkier = false;
        this.setup();
        this.positionTreesMoguls();
    });
    Game.prototype.onload = () => {
        game.imagesLoaded += 1;
    };
    Game.prototype.setup = function() {
        this.trees = [];
        this.moguls = [];
        this.points = 0;
        this.skier = new SkiFree.Skier(
            {
                x: this.DIM_X / 2,
                y: this.DIM_Y / 2 - 32,
            },
            this.onload.bind(this)
        );
        this.yeti = new SkiFree.Yeti(
            {
                x: 0,
                y: 0,
            },
            this.onload.bind(this)
        );
    };

    Game.prototype.positionTreesMoguls = function() {
        var randomTreeCount = Math.round(Math.random() * 4);
        var randomMogulCount = Math.round(Math.random() * 4);
        this.totalObjects += randomMogulCount + randomTreeCount;

        for (var i = 0; i < randomTreeCount; i++) {
            this.trees.push(
                new SkiFree.Tree(this.randomPosition(), this.onload.bind(this))
            );
        }

        for (var i = 0; i < randomMogulCount; i++) {
            this.moguls.push(
                new SkiFree.Mogul(this.randomPosition(), this.onload.bind(this))
            );
        }
    };

    Game.prototype.hasLoaded = function() {
        return this.imagesLoaded > 2 && this.imagesLoaded === this.totalObjects;
    };

    Game.prototype.randomPosition = function() {
        var x = Math.round(Math.random() * this.DIM_X);
        var y = Math.round(Math.random() * this.DIM_Y);
        return [x, y];
    };

    Game.prototype.draw = function(direction) {
        // clear everything before redraw, prevents white box overlaps
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.direction = direction;
        this.moguls.forEach(
            function(mogul) {
                mogul.draw(direction);
            }.bind(this)
        );

        this.trees.forEach(
            function(tree) {
                tree.draw(direction);
            }.bind(this)
        );

        if (this.showYeti) {
            this.yeti.drawAppearance(this.direction);
        } else if (this.chaseSkier) {
            this.yeti.drawChaseScene(this.direction);
        }

        this.skier.draw(direction);
    };

    Game.prototype.updateScore = function() {
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(0, "black");
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
        ctx.fillRect(0, 0, 150, 50);
        ctx.font = "24px VT323";
        var text = "Score: " + this.points;
        var width = ctx.measureText(text).width;
        ctx.fillStyle = "white";
        ctx.fillText(text, 25, 25);
    };

    Game.prototype.checkCollisions = function() {
        if (this.skier.collidedWith(this.yeti)) {
            this.skier.caught = true;
            return;
        }
        this.trees.forEach(tree => {
            if (this.skier.collidedWith(tree)) {
                this.skier.wipeout = true;
                return;
            }
        });
    };

    Game.prototype.getRandomPositionForDir = function(dir) {
        const [x, y] = this.randomPosition();
        switch (dir) {
            case DIRECTIONS.right:
                return [[this.DIM_X, y], [x, this.DIM_Y]];
            case DIRECTIONS.left:
                return [[x, this.DIM_Y], [0, y]];
            default:
                return [[x, this.DIM_Y], null];
        }
    };

    Game.prototype.drawCaughtScene = function() {
        ctx.clearRect(
            this.skier.x,
            this.skier.y,
            this.skier.width,
            this.skier.height
        );
        this.yeti.drawCaughtScene();
    };

    Game.prototype.step = function(dir) {
        // yeti
        this.yeti.moveTowardsSkier(this.skier);
        //add trees and moguls to canvas as skier moves
        var randomTreeCount = Math.round(Math.random());
        var randomMogulCount = Math.round(Math.random());

        for (var i = 0; i < randomTreeCount; i++) {
            const [treePos1, treePos2] = this.getRandomPositionForDir(dir);
            this.trees.push(new SkiFree.Tree(treePos1, this.onload.bind(this)));
            if (treePos2) {
                this.trees.push(
                    new SkiFree.Tree(treePos2, this.onload.bind(this))
                );
            }
        }

        for (var i = 0; i < randomMogulCount; i++) {
            const mogulPos = this.getRandomPositionForDir(dir);
            this.moguls.push(
                new SkiFree.Mogul(mogulPos, this.onload.bind(this))
            );
        }
    };
})();
