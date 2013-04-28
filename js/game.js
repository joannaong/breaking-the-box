(function(){
  
  var util = {
    createIframe: function (url) {
      var iframe = document.createElement('iframe');
      iframe.src = url;
      return iframe;
    }
  };

  var bInitalState  = true;
  var bFinalState = false;
  window.onload = function (e) {
    
    // Show inital state of app, and wait for call to show the first cell scene.
    var owner = this;

  $("#beginPage .blueBtn").click( function(){
    $("#beginPage").fadeOut();
    $("#enterPage").fadeIn();
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

    hideIframeContent:function()
    {
      var iframeContainer = document.querySelector('#iframe-container');
      $(iframeContainer).fadeOut(function(){
       });
    },

    playEndVideo:function(){
      console.log("playing end video");
    },

    showModal:function(id){
      console.log("showModal: " + id);
      if(id=="intro_pipe"){
        $("#sceneLabel1").fadeIn();

          $("#sceneLabel1 .txt1").click(function(){

              _V_('video').ready(function(){


            $("#videoModal").fadeIn();
            var myPlayer = this;
            myPlayer.src([
              { type: "video/mp4", src: "assets/video/01_VIDEO_LEGAL.mp4" },
              { type: "video/ogg", src: "assets/video/01_VIDEO_LEGAL.ogv" }
            ]);


            var endf = function()
            {
             $("#caughtScreen1").fadeIn();
              $("#sceneLabel1").fadeOut();
              $("#videoModal").fadeOut();
              $("#caughtScreen1 .circleBtnOK").click(function(){
                $("#caughtScreen1").fadeOut();
              });

              myPlayer.removeEvent("ended", endf);

            }
            myPlayer.addEvent("ended", endf);
            // EXAMPLE: Start playing the video.
            myPlayer.play();

              })

          });

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
        $("#sceneLabel2 .txt1").click(function(){

        console.log("click");

            $("#videoModal").fadeIn();
            var myPlayer = _V_('video');
            myPlayer.src([
              { type: "video/mp4", src: "assets/video/02_VIDEO_TECHNICAL.mp4" },
              { type: "video/ogg", src: "assets/video/02_VIDEO_TECHNICAL.ogv" }
            ]);

            var endf = function(){
              $("#caughtScreen2").fadeIn();
              $("#sceneLabel2").fadeOut();
              $("#videoModal").fadeOut();
              $("#caughtScreen2 .circleBtnOK").click(function(){
                $("#caughtScreen2").fadeOut();
              });

              myPlayer.removeEvent('ended', endf);
              myPlayer = null;
            }

            myPlayer.addEvent("ended", endf);
            // EXAMPLE: Start playing the video.
            myPlayer.play();


          });
        $("#sceneLabel2 .circleBtnExit").click(function(){
          $("#sceneLabel2").fadeOut();
          $("#caughtScreen2").fadeIn();



          $("#caughtScreen2 .circleBtnOK").click(function(){
            $("#caughtScreen2").fadeOut();
          });
        });
      }














      if(id == "minigame_pipe"){
        //createjs.Sound.play("radio","none", 0, 0.25, 0, 0.5);
        $("#itemScreen1").fadeIn();
        $("#itemScreen1 .circleBtnClose").click(function(){
          $("#itemScreen1").fadeOut();
        });
      }

      if(id == "minigame_drugs"){
        $("#itemScreen2").fadeIn();
        $("#itemScreen2 .circleBtnClose").click(function(){
          $("#itemScreen2").fadeOut();
        });
      }


    },

    playFinalVideo:function(){
      var owner = this;
           $("#videoModal").fadeIn();
            var myPlayer = _V_('video');
            myPlayer.src([
              { type: "video/mp4", src: "assets/video/03_VIDEO_MENTAL.mp4" },
              { type: "video/ogg", src: "assets/video/03_VIDEO_MENTAL.ogv" }
            ]);

            var endf = function(){
                $("#videoModal").fadeOut();
               owner.showFinalShit();

               myPlayer.removeEvent('ended', endf);

            }

            myPlayer.addEvent("ended", endf);

          // EXAMPLE: Start playing the video.
          myPlayer.play();

    },
    playOutroVideo:function(){

      var owner = this;
      owner.bFinalState  = true;
       $("#videoModal").fadeIn();
        var myPlayer = _V_('video');
        myPlayer.src([
          { type: "video/mp4", src: "assets/video/Outro.mp4" },
          { type: "video/ogg", src: "assets/video/Outro.ogv" }
        ]);

        // EXAMPLE: Start playing the video.
        myPlayer.play();

    },

    showFinalShit:function(){
      var owner = this;

      if(owner.bFinalState)
        return;

      owner.bFinalState = true;

      $("#caughtScreen3").fadeIn();
      $("#caughtScreen3 .circleBtnOK").click(function(){
        $("#caughtScreen3").fadeOut();
          
          owner.playOutroVideo()
        });

    },


    onMiniGameOver:function()
    {
      if(bInitalState ){

        createjs.Sound.play("mental","none", 0, 0.25, 0, 1);
        this.showLowerScene();
      }else{

        console.log("kjshfksd");


      var owner = this;
        $("#itemScreen3").fadeIn();
        $("#itemScreen3 .circleBtnClose").click(function(){
          $("#itemScreen3").fadeOut();
            owner.playFinalVideo();
            owner.hideIframeContent();
        });
      
      }
    }
  };
}());
