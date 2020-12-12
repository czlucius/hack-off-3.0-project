//request audio
if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia || navigator.msGetUserMedia;
if (navigator.getUserMedia){
    navigator.getUserMedia({audio:true}, 
      function(stream) {
          start_microphone(stream);
      },
      function(e) {
        alert('Failed to capture audio.');
      }
    );
} else { alert('This browser does not support getUserMedia.'); }
let canvas = document.getElementById("audio_visual");
let ctx = canvas.getContext("2d");
//get input as data
let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
let data = new Uint8Array(analyser.frequencyBinCount);
//drawing
requestAnimationFrame(loopingFunction);
function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
}
function draw(data){
    data = [...data];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    data.forEach((value,i)=>{
        ctx.beginPath();
        ctx.moveTo(space*i,canvas.height);
        ctx.lineTo(space*i,canvas.height-value);
        ctx.stroke();
    })
}
