AudioController ={
    sounds:{
      "ambient":{
        id:"ambient",
        src:"assets/audio/ambient.mp3|assets/audio/ambient.ogg",
        autoplay:true,
        loop:true,
        instance:null,
        loaded:false
      },
      "cell":{
        id:"cell",
        src:"assets/audio/cell.mp3|assets/audio/cell.ogg",
        autoplay:false,
        loop:false,
        instance:null,
        loaded:false
      },
      "legal":{
        id:"legal",
        src:"assets/audio/legal.mp3|assets/audio/legal.ogg",
        autoplay:false,
        loop:false,
        instance:null,
        loaded:false
      },
      "technical":{
        id:"technical",
        src:"assets/audio/technical.mp3|assets/audio/technical.ogg",
        autoplay:false,
        loop:false,
        instance:null,
        loaded:false
      },
      "mental":{
        id:"mental",
        src:"assets/audio/mental.mp3|assets/audio/mental.ogg",
        autoplay:false,
        loop:false,
        instance:null,
        loaded:false
      },
      "radio":{
        id:"radio",
        src:"assets/audio/radio.mp3|assets/audio/radio.ogg",
        autoplay:false,
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
      
      // hack: preload ambient first, then others
      if(e.id == "ambient"){
        console.log("ambient loaded, loading others now.");
        createjs.Sound.registerSound(this.sounds["cell"].src, this.sounds["cell"].id);
        createjs.Sound.registerSound(this.sounds["legal"].src, this.sounds["legal"].id);
        createjs.Sound.registerSound(this.sounds["technical"].src, this.sounds["technical"].id);
        createjs.Sound.registerSound(this.sounds["mental"].src, this.sounds["mental"].id);
        createjs.Sound.registerSound(this.sounds["radio"].src, this.sounds["radio"].id);
      }
    },
    playSound: function(id, loop){
      if (this.sounds[id] && this.sounds[id].loaded){
        //play(src,  [interrupt="none"], [delay=0], [offset=0], [loop=0], [volume=1], [pan=0])
        this.sounds[id].instance = createjs.Sound.play(this.sounds[id].id,"none", 0, 0.25, loop?-1:0, 0.5)
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
