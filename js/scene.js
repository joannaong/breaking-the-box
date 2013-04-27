(function(){
  
  var _cubemap;
  var _cubemapDiv;
  var _onSceneReadyCallback;
  var _loaded = false;

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
    addHotRegion: function (definition, mouseOverCallback, mouseOutCallback) {

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
