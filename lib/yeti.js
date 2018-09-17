(function() {
  if (typeof SkiFree === "undefined") {
    window.SkiFree = {};
  }

  var Yeti = (SkiFree.Yeti = function(obj, onloadCB) {
    this.x = obj.x;
    this.y = obj.y;
    this.width = 29;
    this.height = 29;
    this.vel = [0.3, 0.3];
    this.appearSceneIndex = 0;
    this.chaseSceneIndex = 0;
    this.caughtSceneIndex = 0;
    this.appearScenes = [[0, 33], [33, 33]];
    this.caughtScenePositions = [[125, 33], [158, 32], [190, 31], [244, 27]];
    this.chaseScenePositions = [[66, 27], [92, 32]];
    this.image = new Image();
    this.image.src = "./assets/spritesheet.png";
    this.image.onload = () => {
      onloadCB();
    };
    this.setIntIDCaught = null;
  });

  Yeti.prototype.updateDimensions = function(width, height) {
    this.width = width;
    this.height = height;
  };

  Yeti.prototype.moveTowardsSkier = function(skierDir, time) {
    if (time % 1200 !== 0) return;

    switch (skierDir) {
      case DIRECTIONS.left:
        this.moveLeft();
        break;
      case DIRECTIONS.right:
        this.moveRight();
        break;
      default:
        this.moveStraight();
        break;
    }
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
    // ctx.clearRect(this.x, this.y, this.width, this.height);
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
    if (time % 1200 === 0) {
      this.appearSceneIndex += 1;
    }
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
        if (time % 1200 === 0) {
          this.chaseSceneIndex += 1;
        }
        break;
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
