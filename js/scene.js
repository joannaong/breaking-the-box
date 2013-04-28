(function(){
  
  var _cubemap;
  var _cubemapDiv;
  var _onSceneReadyCallback;
  var _loaded = false;

  var util = {
    applyTransform: function (element, transform) {
      element.style.transform = transform;
      element.style.mozTransform = transform;
      element.style.webkitTransform = transform;
    }
  };

  var gamestate = {
    create: function(buttons_elements){

          console.log(buttons_elements);
          var buttons  = buttons_elements;
          var fsm = StateMachine.create({
          events: [
            { name: 'start',  from: 'none',         to: 'waiting'  },
            
            { name: 'music' , from: 'waiting',       to: 'lookforpipe'     },
            { name: 'pipe',   from: 'lookforpipe',    to: 'lookfordrugs'    },
            { name: 'drugs',  from: 'lookfordrugs',    to: 'exit' },
          ],

          callbacks: {
            onstart:    function(event, from, to) { disableHotSpots(); enableHotSpot('music'); },
            onmusic:    function(event, from, to) { disableHotSpots(); enableHotSpot('pipe');  },
            onpipe:     function(event, from, to) { disableHotSpots(); enableHotSpot('drugs'); },
            ondrugs:    function(event, from, to) { setEndState() },

            onlookforpipe:    function(event, from, to) { buttons['pipe'].style.visibility = "visible" },
            onlookfordrugs:    function(event, from, to) { buttons['drugs'].style.visibility = "visible" },

            onchangestate: function(event, from, to) { console.log("CHANGED STATE: " + from + " to " + to); },
            onexit: function(event, from, to) { console.log("show end screen") }
          }
        });
        
        var disableHotSpots = function(){ 
          buttons['music'].style.visibility = "hidden";
          buttons['pipe'].style.visibility = "hidden";
          buttons['drugs'].style.visibility = "hidden"; 
        }

        var enableHotSpot = function(id){
          buttons[id].style.visibility = "visible";
        }

        var setEndState = function(){
          disableHotSpots();
        }

        fsm.start();
        return fsm;
    }
  };

  window.onload = function (e) {
    _cubemapDiv = document.querySelector('#cubemap');
    _loaded = true;

    if (_onSceneReadyCallback) {
      _onSceneReadyCallback();
    }
  };

  window.scene = {
    
    state: null,
    onready: function (callback) {
      if (_loaded) {
        setTimeout(function(){
          callback();
        }, 0);
      }
      _onSceneReadyCallback = callback;
    },
    addHotRegion: function (definition, mouseOverCallback, mouseOutCallback, mouseClickCallback) {
      function buildFace (transform) {
        var element = document.createElement('div');
        util.applyTransform(element, transform);
        element.classList.add('hot-region-face');
        return element;
      }

      function addToContainer (wh, element) {
        element.style.width = wh[0] + 'px';
        element.style.height = wh[1] + 'px';
        faceContainer.appendChild(element);
      }

      var origin = definition.origin || [0,0,0];
      var size = definition.size || [0,0,0];

      origin[0] += _cubemap.box_size/2;
      origin[1] += _cubemap.box_size/2;

      var faceContainer = document.createElement('div');

      addToContainer([size[0], size[1]], buildFace('translate3d('+ (-size[0]/2) +'px, '+ (-size[1]/2) +'px, '+ (-size[2]/2) +'px)'));
      addToContainer([size[0], size[1]], buildFace('translate3d('+ (-size[0]/2) +'px, '+ (-size[1]/2) +'px, '+ (size[2]/2) +'px)'));
      addToContainer([size[0], size[2]], buildFace('translate3d('+ (-size[0]/2) +'px, '+ (-size[2]/2 - size[1]/2) +'px, '+ 0 +'px) rotateX(90deg)'));
      addToContainer([size[0], size[2]], buildFace('translate3d('+ (-size[0]/2) +'px, '+ (-size[2]/2 + size[1]/2) +'px, '+ 0 +'px) rotateX(90deg)'));
      addToContainer([size[2], size[1]], buildFace('translate3d('+ (-size[2]/2+size[0]/2) +'px, '+ (-size[1]/2) +'px, '+ 0 +'px) rotateY(90deg)'));
      addToContainer([size[2], size[1]], buildFace('translate3d('+ (-size[2]/2-size[0]/2) +'px, '+ (-size[1]/2) +'px, '+ 0 +'px) rotateY(90deg)'));
      
      util.applyTransform(faceContainer, 'translate3d('+ (origin[0]) +'px, '+ (origin[1]) +'px, '+ (origin[2]) +'px)');
      faceContainer.classList.add('hot-region');
      _cubemapDiv.querySelector('.cubemapcenter').appendChild(faceContainer);

      faceContainer.onmouseover = mouseOverCallback;
      faceContainer.onmouseout = mouseOutCallback;
      faceContainer.onclick = mouseClickCallback;
      return faceContainer;
    },
    createCubemap: function (assetPrefix) {
      _cubemap = new Cubemap(assetPrefix, ".png", "cubemap", {
        width: window.innerWidth,
        height: window.innerHeight,
        perspective: 500});
    },

    setupStateMachine: function( btns ){
      this.state = gamestate.create({music: btns[0],
                                    pipe: btns[1],
                                    drugs: btns[2]});
    },



    game: window.parent.game
  };

}());


