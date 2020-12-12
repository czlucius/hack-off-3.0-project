



function doa() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
       .then(stream => {
       console.error("Error");
    
    var options = {
       audioBitsPerSecond: 16000,
       mimeType: 'audio/webm;codecs=opus'
    };
    const mediaRecorder = new MediaRecorder(stream, options);
       mediaRecorder.start();
    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
       audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
       const audioBlob = new Blob(audioChunks);
    // upload to Firebase Storage
    firebase.storage().ref('Users/' + $scope.user.uid + '/Pronunciation_Test').put(audioBlob) 
          .then(function(snapshot) {
    firebase.storage().ref(snapshot.ref.location.path).getDownloadURL()   
              .then(function(url) { // get downloadURL
                firebase.firestore().collection('Users').doc($scope.user.uid).collection("Pronunciation_Test").doc('downloadURL').set({
                  downloadURL: url,
                  keywords: keywordArray,
                  model: watsonSpeechModel,
                })
                .then(function() {
                  console.log("Document successfully written!");
                })
                .catch(function(error) {
                  console.error("Error writing document: ", error);
                });
              })
              .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    // play back the audio blob
         const audioUrl = URL.createObjectURL(audioBlob);
         const audio = new Audio(audioUrl);
         audio.play();
    });
    // click to stop
         $scope.stopMicrophone = function() {
         $scope.normalizedText = "Waiting for IBM Cloud Speech-to-Text"; // displays this text
         $scope.confidence = "0.00"; // displays this confidence level
            mediaRecorder.stop();
         }; // end $scope.stopMicrophone
       })
       .catch(function(error) {
          console.log(error.name + ": " + error.message);
    });
    };

    doa();