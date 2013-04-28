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

  var bInitalState  = true;

  window.onload = function (e) {
    this.game.showLowerScene();
  };

  window.game = {
    showCellScene: function(){
      bInitalState  = true;
      var iframeContainer = document.querySelector('#iframe-container');
      var cellFrame = util.createIframe('scenes/cell.html');
      $(iframeContainer).fadeOut(function(){
        $(iframeContainer).empty();  
        iframeContainer.appendChild(cellFrame);
        $(iframeContainer).fadeIn();
      });
    },
    showLowerScene: function(){
      bInitalState  = false;
      var iframeContainer = document.querySelector('#iframe-container');
      var cellFrame = util.createIframe('scenes/lower.html');
      $(iframeContainer).fadeOut(function(){
        $(iframeContainer).empty();  
        iframeContainer.appendChild(cellFrame);
        $(iframeContainer).fadeIn();
      });
    },

    onMiniGameOver:function()
    {
      if(bInitalState ){
        this.showLowerScene();
      }else{

      }
    }
  };
}());
