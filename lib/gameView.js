(function(){
  if (typeof SkiFree === 'undefined'){
    window.SkiFree = {};
  }

  var GameView = SkiFree.GameView = function (game, ctx, canvas){
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
  };

  GameView.prototype.stop = function() { clearInterval(setIntID) };

  GameView.prototype.start = function (){
      var that = this;
      this.game.drawInitialBackdrop(this.ctx);

      setIntID = setInterval(function() {
        that.game.checkCollisions();
        // 
        // if (that.game.wipeout){
        //   that.stop();
        // }
      }, 30);

      setInterval(function () {
        that.game.step();
      }, 1000)
    };

  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        this.game.drawLeft(this.ctx);
      break;

      case 39:
        this.game.drawRight(this.ctx);
      break;

      case 40:
        this.game.drawStraight(this.ctx);
      break;
    }
  }.bind(this), false);

  window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 37:
        this.drawLeft = false;
      break;

      case 39:
        this.drawRight = false;
      break;

      case 40:
        this.drawStraight = false;
      break;
    }
  }.bind(this), false);

})();
