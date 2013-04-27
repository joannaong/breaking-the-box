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
    },
    createCubemap: function (assetPrefix) {
      _cubemap = new Cubemap(assetPrefix, ".png", "cubemap", {
        width: window.innerWidth,
        height: window.innerHeight,
        perspective: 500});
    },

    setupStateMachine: function( btn1, btn2, btn3){
      this.state = new MiniGameOne({music: document.getElementById(btn1),
                                    pipe: document.getElementById(btn2),
                                    drugs: document.getElementById(btn3)});
    },
    game: window.parent.game
  };

}());


function MiniGameOne( buttons_elements ){

    var buttons  = buttons_elements;
    var fsm = StateMachine.create({
    events: [
      { name: 'start',  from: 'none',         to: 'waiting'  },
      
      { name: 'music' , from: 'waiting',       to: 'lookforpipe'     },
      { name: 'pipe',   from: 'lookforpipe',    to: 'lookfordrugs'    },
      { name: 'drugs',  from: 'lookfordrugs',    to: 'exit' },
    ],

    callbacks: {
      onstart:    function(event, from, to) { updateButtonStates(); console.log("READY");       },

      onmusic:    function(event, from, to) { updateButtonStates(event); },
      onpipe:     function(event, from, to) { updateButtonStates(event); },
      ondrugs:    function(event, from, to) { updateButtonStates(event); },

      onlookforpipe:    function(event, from, to) { buttons['pipe'].disabled = false },
      onlookfordrugs:    function(event, from, to) { buttons['drugs'].disabled = false },

      onchangestate: function(event, from, to) { console.log("CHANGED STATE: " + from + " to " + to); },
      onexit: function(event, from, to) { buttons['music'].disabled = buttons['pipe'].disabled = buttons['drugs'].disabled = true; console.log("show end screen") }
    }
  });



  // I'll remove this, this was just to test.
  var updateButtonStates = function(e)
  {
    if(e == undefined){
      buttons['music'].disabled = false;
      buttons['pipe'].disabled = true;
      buttons['drugs'].disabled = true;
    }else{
      buttons[e].disabled = true;
      console.log(e);
    }
  }

  var rawr = function()
  {
    console.log("you're in the red state,, waiting to FINISH clicking.,,");
  };

  fsm.start();
  return fsm;

};
