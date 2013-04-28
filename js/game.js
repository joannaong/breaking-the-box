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
    
    // Show inital state of app, and wait for call to show the first cell scene.
    var owner = this;

  $("#beginPage .blueBtn").click( function(){
    $("#beginPage").fadeOut();
    $("#enterPage").fadeIn();
     console.log("ckucjed");
  })

    $("#enterPage .blueBtn").click(function(){
      $("#intro").fadeOut();
      owner.game.showCellScene();


    });



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

    hideIframeContent:function( f )
    {
      var iframeContainer = document.querySelector('#iframe-container');
      $(iframeContainer).fadeOut(function(){
         f();
       });
    },

    playEndVideo:function(){
      console.log("playing end video");
    },

    showModal:function(id){
      console.log("showModal: " + id);
      if(id=="intro_pipe"){
        $("#sceneLabel1").fadeIn();
        $("#sceneLabel1 .circleBtnExit").click(function(){
          $("#sceneLabel1").fadeOut();
          $("#caughtScreen1").fadeIn();
          $("#caughtScreen1 .circleBtnOK").click(function(){
            $("#caughtScreen1").fadeOut();
          });

        });
      }
     
      if(id=="intro_drugs"){
        $("#sceneLabel2").fadeIn();
        $("#sceneLabel2 .circleBtnExit").click(function(){
          $("#sceneLabel2").fadeOut();
          $("#caughtScreen2 .circleBtnOK").click(function(){
            $("#caughtScreen2").fadeOut();
          });
        });
      }

      if(id == "minigame_pipe"){
        $("#sceneLabel2").fadeIn();
        $("#sceneLabel2 .circleBtnExit").click(function(){
          $("#sceneLabel2").fadeOut();
        });
      }

      if(id == "minigame_drugs"){
        $("#sceneLabel2").fadeIn();
        $("#sceneLabel2 .circleBtnExit").click(function(){
          $("#sceneLabel2").fadeOut();
        });
      }


    },

    onMiniGameOver:function()
    {
      if(bInitalState ){
        $("#sceneLabel1").hide();
        $("#sceneLabel2").hide();
        this.showLowerScene();
      }else{
        this.hideIframeContent();
  
          //this.hideIframeContent(this.playEndVideo);
      }
    }
  };
}());
