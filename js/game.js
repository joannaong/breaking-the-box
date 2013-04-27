(function(){
  
  var util = {
    createIframe: function (url) {
      var iframe = document.createElement('iframe');
      iframe.src = url;
      return iframe;
    }
  };

  window.onload = function (e) {
    var iframeContainer = document.querySelector('#iframe-container');
    iframeContainer.appendChild(util.createIframe('scenes/cell.html'));
  };

  window.game = {
  };
}());