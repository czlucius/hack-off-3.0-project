toggle = 0;
function transform(){
    if (toggle == 0){
        document.getElementById("analysis").innerHTML="General analysis";
        document.body.style.backgroundColor="#8bc34a";
        document.getElementById("footer").style.backgroundColor="#bef67a";
        document.getElementById("analysis").style.backgroundColor="#bef67a";
        document.getElementById("documentText").style.backgroundColor="#bef67a";
        document.getElementById("upload").style.backgroundColor="#bef67a";
        document.getElementById("header").style.backgroundColor="#5a9216";
        document.getElementById("root").style.display="none";
        document.getElementById("report").style.display="block";
        toggle = 1;
    }else{
        document.getElementById("analysis").innerHTML="Detailed analysis";
        document.body.style.backgroundColor="#d4e157";
        document.getElementById("footer").style.backgroundColor="#ffff89";
        document.getElementById("analysis").style.backgroundColor="#ffff89";
        document.getElementById("documentText").style.backgroundColor="#ffff89";
        document.getElementById("upload").style.backgroundColor="#ffff89";
        document.getElementById("header").style.backgroundColor="#a0af22";
        document.getElementById("root").style.display="block";
        document.getElementById("report").style.display="none";
        toggle = 0;
    }
}
messages = [""];
//anger fear joy sadness analytical confident tentative
attributes = [0,0,0,0,0,0,0];
let uploadBtn = document.getElementById("upload");
let documentTextField = document.getElementById("documentText");
uploadBtn.onclick = () => {
    // Get document
    console.log(documentTextField.value);

    var headers = new Headers();
    headers.append('Content-Type', 'text/plain');
    headers.append('Authorization', 'Basic ' + btoa('apikey' + ':' + '[INSERT API KEY HERE]'));


    fetch('https://api.kr-seo.tone-analyzer.watson.cloud.ibm.com/instances/8a64ea0b-ebb0-412d-aecd-438426034a0a/v3/tone?version=2017-09-21', {
        method: 'POST',
        body: documentTextField.value,
        headers: headers,
    }).then(res => res.json()) // Commented out as API calls cut into bandwidth
    
        .then(json => {
            var displayText = "Overall attributes:<br>";


            for (tone of json["document_tone"]["tones"]) {

                var percentage = (Math.floor(Number(tone["score"]) * 100)).toString();
                var toneName = tone["tone_name"];
                displayText += toneName;
                displayText += ": " ;
                displayText += percentage;
                displayText += "%\n"
                if (toneName == "Anger"){
                    attributes[0] = percentage;
                }else if (toneName == "Fear"){
                    attributes[1] = percentage;
                }else if (toneName == "Joy"){
                    attributes[2] = percentage;
                }else if (toneName == "Sadness"){
                    attributes[3] = percentage;
                }else if (toneName == "Analytical"){
                    attributes[4] = percentage;
                }else if (toneName == "Confident"){
                    attributes[5] = percentage;
                }else if (toneName == "Tentative"){
                    attributes[6] = percentage;
                }
            }
            document.getElementById("data").innerHTML=displayText;
            //generate tips
            displayText = "Tip:<br>";
            if (attributes[0] >= 60){
                displayText += "Calm down. ";
            }else if (attributes[1] >= 60){
                displayText += "Don't worry too much, everything will be fine. ";
            }else if (attributes[2] <= 40){
                displayText += "Cheer up! ";
            }else if (attributes[3] >= 60){
                displayText += "Brighten up your mood! ";
            }else if (attributes[4] >= 60){
                displayText += "Don't overthink too much. ";
            }else if (attributes[5] <= 40){
                displayText += "I believe in you! You can do it! ";
            }else if (attributes[6] >= 60){
                displayText += "Have more faith in yourself! ";
            }
            if (displayText == "Tip:<br>"){
                displayText = "You are doing great!";
            }
            document.getElementById("note").innerHTML=displayText;
        });
}
