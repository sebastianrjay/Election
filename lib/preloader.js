;(function() {
  var canvasEl = document.getElementsByTagName("canvas")[0],
      topCanvasEl = document.getElementsByTagName("canvas")[1],
      audioEl = document.getElementsByTagName("audio")[0];
      musicEl = document.getElementsByTagName("audio")[1];

  [canvasEl, topCanvasEl].forEach(function(canvas) {
    canvas.width = Election.DIM_X, canvas.height = Election.DIM_Y;
  });

  var ctx = canvasEl.getContext("2d"),
      ctxTop = topCanvasEl.getContext("2d"),
      handImg = new Image(), billImg = new Image(),
      paperImg = new Image(), deanImg = new Image(),
      imgsLoaded = 0,
      images = [handImg, billImg, paperImg, deanImg];

  billImg.src = 'images/million_dollar_bill.jpg';
  deanImg.src = 'images/howard_dean.jpg';
  handImg.src = 'images/outstretched-hand.png';
  paperImg.src = 'images/newspaper.png';

  var maybeStartGame = function(){
    imgsLoaded += 1;
    if(imgsLoaded === 4) {
      var options = {ctx: ctx, handImg: handImg, billImg: billImg,
        paperImg: paperImg, deanImg: deanImg, audioEl: audioEl,
          ctxTop: ctxTop, musicEl: musicEl
      }
      var game = new Election.Game(options);
      game.start();
    }
  };

  images.forEach(function(img) {
    img.addEventListener("load", maybeStartGame);
  });
})();
