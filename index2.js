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
    }).then(res => res.json())
        .then(json => console.log(json));


}
