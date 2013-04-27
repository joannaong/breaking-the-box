AudioController ={
    sounds:{
      "ambient":{
        id:"ambient",
        src:"assets/audio/ambient.mp3|assets/audio/ambient.ogg",
        autoplay:true,
        loop:true,
        instance:null,
        loaded:false
      }
    },
    loadSounds: function(){
      createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.loadHandler, this));
      createjs.Sound.registerSound(this.sounds["ambient"].src, this.sounds["ambient"].id); 
    },
    loadHandler: function(e) {
      console.log("loaded",e.id," autoplay?",this.sounds[e.id].autoplay)
      if (this.sounds[e.id].autoplay){
        console.log("play",e.id)
        this.sounds[e.id].loaded = true;
        this.playSound(e.id, this.sounds[e.id].loop);
      }
    },
    playSound: function(id, loop){
      if (this.sounds[id] && this.sounds[id].loaded){
        //play(src,  [interrupt="none"], [delay=0], [offset=0], [loop=0], [volume=1], [pan=0])
        this.sounds[id].instance = createjs.Sound.play(this.sounds[id].id,"none", 0, 0.25, loop?-1:0, 1)
      }
    },
    pauseSound:function(id){
      if (this.sounds[id] && this.sounds[id].instance){
        this.sounds[id].instance.pause();
      }
    },
    resumeSound:function(id){
      if (this.sounds[id] && this.sounds[id].instance){
        this.sounds[id].instance.resume();
      }
    },
    getSoundInstance:function(id){
      if (this.sounds[id] && this.sounds[id].instance){
        return this.sounds[id].instance;
      }
    }


};

this.AudioController.loadSounds();
