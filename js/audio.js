window.onload = function (e) {
  createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.loadHandler, this));
  createjs.Sound.registerSound("assets/audio/ambient.mp3|assets/audio/ambient.ogg", "ambient");
}

function loadHandler(e) {
     // This is fired for each sound that is registered.

     //play(src,  [interrupt="none"], [delay=0], [offset=0], [loop=0], [volume=1], [pan=0])
     var instance = createjs.Sound.play("ambient","none", 0, 0, -1, 1);  // play using id. Could also use source.
     instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
     //instance.setVolume(1);
 }