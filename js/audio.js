AudioController ={
    sounds:{
      "ambient":{
        id:"ambient",
        src:"assets/audio/ambient.mp3|assets/audio/ambient.ogg",
        instance:null
      }
    },
    loadSounds: function(){
      createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.loadHandler, this));
      createjs.Sound.registerSound(this.sounds["ambient"].src, this.sounds["ambient"].id);  
    },
    loadHandler: function(e) {
      //play(src,  [interrupt="none"], [delay=0], [offset=0], [loop=0], [volume=1], [pan=0])
      this.sounds[e.id] = createjs.Sound.play(this.sounds[e.id].id,"none", 0, 0.25, -1, 1);
      this.sounds[e.id].addEventListener("complete", createjs.proxy(this.handleComplete, this));
    }
};

this.AudioController.loadSounds();
