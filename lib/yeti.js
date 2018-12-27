(function() {
    if (typeof SkiFree === "undefined") {
        window.SkiFree = {};
    }

    var Yeti = (SkiFree.Yeti = function(obj, onloadCB, skierXPos, skierYPos) {
        this.x = obj.x;
        this.y = obj.y;
        this.width = 29;
        this.height = 29;
        this.vel = this.calculateVelocity(skierXPos, skierYPos);
        this.appearSceneIndex = 0;
        this.chaseSceneIndex = 0;
        this.caughtSceneIndex = 0;
        this.appearScenes = [[0, 33], [33, 33]];
        this.caughtScenePositions = [
            [125, 33],
            [158, 32],
            [190, 31],
            [244, 27],
        ];
        this.chaseScenePositions = [[66, 27], [92, 32]];
        this.image = new Image();
        this.image.src = "./assets/spritesheet.png";
        this.image.onload = () => {
            onloadCB();
        };
        this.setIntIDCaught = null;
        this.lastTime = null;
    });

    Yeti.prototype.calculateVelocity = (skierXPos, skierYPos) => {
        const timeToTake = 800;
        return [skierXPos / timeToTake, skierYPos / timeToTake];
    };

    Yeti.prototype.updateDimensions = function(width, height) {
        this.width = width;
        this.height = height;
    };

    Yeti.prototype.moveTowardsSkier = function() {
        this.moveRight();
    };

    Yeti.prototype.drawCaughtScene = function() {
        const height = 42;
        this.setIntIDCaught = setInterval(() => {
            [xPos, width] = this.caughtScenePositions[this.caughtSceneIndex];
            this.drawOnCanvas(xPos, width, height);
            this.caughtSceneIndex += 1;
        }, 300);
    };
    Yeti.prototype.drawOnCanvas = function(xPos, width, height) {
        const yPos = 71;
        this.updateDimensions(width, height);
        ctx.drawImage(
            this.image,
            xPos,
            yPos,
            width,
            height,
            this.x,
            this.y,
            width,
            height
        );
    };

    Yeti.prototype.drawAppearance = function() {
        const height = 40;
        const [xPos, width] = this.appearScenes[
            this.appearSceneIndex % this.appearScenes.length
        ];
        this.drawOnCanvas(xPos, width, height);
        this.increaseSceneIndex("appearSceneIndex");
    };
    Yeti.prototype.drawChaseScene = function(dir) {
        const height = 40;
        switch (dir) {
            default:
                const [xPos, width] = this.chaseScenePositions[
                    this.chaseSceneIndex % this.chaseScenePositions.length
                ];
                this.moveRight();
                this.drawOnCanvas(xPos, width, height);
                this.increaseSceneIndex("chaseSceneIndex");

                break;
        }
    };

    Yeti.prototype.increaseSceneIndex = function(sceneIndex) {
        const nowTime = performance.now();
        if (!this.lastTime || Math.round(this.lastTime - nowTime) % 60 === 0) {
            this.lastTime = nowTime;
            this[sceneIndex]++;
        }
    };

    Yeti.prototype.moveLeft = function() {
        this.oldCoords = [this.x, this.y];

        this.x -= this.vel[0];
        this.y += this.vel[1];
    };

    Yeti.prototype.moveRight = function() {
        this.oldCoords = [this.x, this.y];

        this.x += this.vel[0];
        this.y += this.vel[1];
    };

    Yeti.prototype.moveStraight = function() {
        this.oldCoords = [this.x, this.y];

        this.y += this.vel[1];
    };
})();
