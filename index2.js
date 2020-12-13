/** this does not work, but is a good start*/
var txt_attributes = [];
var txt_percentage = [];
var txt = [];
var page = 0;
var toggle = 0;
function transform() {
    if (toggle == 0) {
        document.getElementById("analysis").innerHTML = "General analysis";
        document.body.style.backgroundColor = "#8bc34a";
        document.getElementById("footer").style.backgroundColor = "#bef67a";
        document.getElementById("analysis").style.backgroundColor = "#bef67a";
        document.getElementById("documentText").style.backgroundColor = "#bef67a";
        document.getElementById("upload").style.backgroundColor = "#bef67a";
        document.getElementById("header").style.backgroundColor = "#5a9216";
        document.getElementById("root").style.display = "none";
        document.getElementById("report").style.display = "block";
        if (txt.length >= 1){
            displayText = "Sentence:<br>"+txt[page]+"<br>Attribute:<br>";
            var n = 0;
            while (n <= txt_attributes[page].length-1){
                displayText += txt_attributes[page][n]+": "+txt_percentage[page][n]+"% "
                n = n+1;
            }
            document.getElementById("copy").innerHTML=displayText;
        }
        toggle = 1;
    } else {
        document.getElementById("analysis").innerHTML = "Detailed analysis";
        document.body.style.backgroundColor = "#d4e157";
        document.getElementById("footer").style.backgroundColor = "#ffff89";
        document.getElementById("analysis").style.backgroundColor = "#ffff89";
        document.getElementById("documentText").style.backgroundColor = "#ffff89";
        document.getElementById("upload").style.backgroundColor = "#ffff89";
        document.getElementById("header").style.backgroundColor = "#a0af22";
        document.getElementById("root").style.display = "block";
        document.getElementById("report").style.display = "none";
        toggle = 0;
    }
}
messages = [""];
var sentences;
var current;
//anger fear joy sadness analytical confident tentative
attributes = [0, 0, 0, 0, 0, 0, 0];
sentenceAttributes = [0, 0, 0, 0, 0, 0, 0];

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
                displayText += ": ";
                displayText += percentage;
                displayText += "%\n"
                if (toneName == "Anger") {
                    attributes[0] = percentage;
                } else if (toneName == "Fear") {
                    attributes[1] = percentage;
                } else if (toneName == "Joy") {
                    attributes[2] = percentage;
                } else if (toneName == "Sadness") {
                    attributes[3] = percentage;
                } else if (toneName == "Analytical") {
                    attributes[4] = percentage;
                } else if (toneName == "Confident") {
                    attributes[5] = percentage;
                } else if (toneName == "Tentative") {
                    attributes[6] = percentage;
                }
            }
            document.getElementById("data").innerHTML = displayText;
            //generate tips
            displayText = "Tip:<br>";
            if (attributes[0] >= 60) {
                displayText += "Calm down. ";
            } else if (attributes[1] >= 60) {
                displayText += "Don't worry too much, everything will be fine. ";
            } else if (attributes[2] <= 40) {
                displayText += "Cheer up! ";
            } else if (attributes[3] >= 60) {
                displayText += "Brighten up your mood! ";
            } else if (attributes[4] >= 60) {
                displayText += "Don't overthink too much. ";
            } else if (attributes[5] <= 40) {
                displayText += "I believe in you! You can do it! ";
            } else if (attributes[6] >= 60) {
                displayText += "Have more faith in yourself! ";
            } else {
                displayText = "You are doing great!";
            }
            document.getElementById("note").innerHTML = displayText;
            txt_attributes = []
            txt_percentage = []
            txt = [];
            for (tone of json["sentences_tone"]) {
                txt.push(tone["text"]);
            }
            for (tone of json["sentences_tone"]["tones"]) {
                var i = 0;
                var tmp_percentage = [];
                var tmp_attribute = [];
                while (i <= txt){
                    tmp_percentage.push((Math.floor(Number(tone["score"]) * 100)).toString());
                    tmp_attributes.push(tone["tone_name"]);
                }
                txt_percentage.push(tmp_percentage);
                txt_attributes.push(tmp_attributes);
            }

        }


        );
}



function before() {
    if (page-1 >= 0){
        displayText = "Sentence:<br>"+txt[page]+"<br>Attribute:<br>";
        var n = 0;
        while (n <= txt_attributes[page].length-1){
            displayText += txt_attributes[page][n]+": "+txt_percentage[page][n]+"% "
            n = n+1;
        }
        document.getElementById("copy").innerHTML=displayText;
    }
    page = page-1;
}

function after() {
    if (page-1 >= 0){
        displayText = "Sentence:<br>"+txt[page]+"<br>Attribute:<br>";
        var n = 0;
        while (n <= txt_attributes[page].length-1){
            displayText += txt_attributes[page][n]+": "+txt_percentage[page][n]+"% "
            n = n+1;
        }
        document.getElementById("copy").innerHTML=displayText;
    }
    page = page-1;
}
