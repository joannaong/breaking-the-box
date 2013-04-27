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
    game: window.parent.game
  };

}());