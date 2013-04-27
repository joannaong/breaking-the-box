(function(){
  
  var util = {
    createIframe: function (url) {
      var iframe = document.createElement('iframe');
      iframe.src = url;
      return iframe;
    }
  };

  /*
  function Minigame() {
    this.document = null;
  }

  Minigame.prototype.init = function(iframe) {
    this.document = iframe.contentDocument;
    console.log(this.document);
    this.gameArea = this.document.getElementById("gameArea");
  }

  Minigame.prototype.jiggle = function() {
    header = this.document.createElement("h1");
    header.innerHTML = "HOWDY!";
    this.gameArea.appendChild(header);
  }
  */

  window.onload = function (e) {
    var iframeContainer = document.querySelector('#iframe-container');
    iframeContainer.appendChild(util.createIframe('scenes/cell.html'));

    /*
    var minigame = util.createIframe('scenes/minigame_test.html');
    iframeContainer.appendChild(minigame);
    var game = new Minigame();
    game.init(minigame);
    game.jiggle();
    */
  };

  window.game = {
  };
}());
