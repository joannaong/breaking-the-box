(function(){
  
  var _cubemap;
  var _cubemapDiv;

  window.onload = function (e) {
    _cubemapDiv = document.querySelector('#cubemap');
  };

  window.scene = {
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