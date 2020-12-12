//request audio

const options = {
    audioBitsPerSecond: 16000,
    mimeType: 'audio/webm;codecs=opus'
 };
var rec;
let chunks = [];
let recordBtn = document.getElementById("record");
let stopBtn = document.getElementById("stop");


// Button click listeners
recordBtn.onclick = () => {
    rec.start();
    console.log(rec.state);
    alert('Recording started');
}
stopBtn.onclick = () => {
    rec.stop();
    console.log(rec.state);
    alert('Recording stopped')
}





function process_microphone(stream) {
    rec = new MediaRecorder(stream, options);

    if (!(rec == null)) {
        // Process data
        rec.ondataavailable = (e) => {
            chunks.push(e.data);
        }


        rec.onstop = (e) => {
            const audioBlob = new Blob(audioChunks);
            audioBlob.
        }
    }
}

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
            process_microphone(stream);
        })
        .catch((e) => {
            alert('Failed to capture audio. Reason: ' + e);
        });
} else { alert('This browser does not support getUserMedia.'); }




// No need Canvas, since file is pre-recorded.

// To be added in other file. 
//IBM Watson speech to text
var recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');

