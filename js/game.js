(function(){
  
  var util = {
    createIframe: function (url) {
      var iframe = document.createElement('iframe');
      iframe.src = url;
      return iframe;
    }
  };

  var bInitalState  = true;

  window.onload = function (e) {
    this.game.showCellScene();
    
    // Show inital state of app, and wait for call to show the first cell scene.

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
      var cellFrame = util.createIframe('scenes/lower.html');
      $(iframeContainer).fadeOut(function(){
        $(iframeContainer).empty();  
        iframeContainer.appendChild(cellFrame);
        $(iframeContainer).fadeIn();
      });
    },

    hideIframeContent:function( f )
    {
      console.log("rawr....");
      // $(iframeContainer).fadeOut(function(){
      //   f();
      // });
    },

    playEndVideo:function(){
      console.log("playing end video");
    },

    onMiniGameOver:function()
    {
      if(bInitalState ){
        this.showLowerScene();
      }else{
          //this.hideIframeContent(this.playEndVideo);
      }
    }
  };
}());
