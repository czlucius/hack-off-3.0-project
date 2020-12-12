

let uploadBtn = document.getElementById("upload");
let documentTextField = document.getElementById("documentText");
uploadBtn.onclick = () => {
    // Get document
    console.log(documentTextField.value);


    fetch('https://apikey:[INSERT API KEY HERE]@api.kr-seo.tone-analyzer.watson.cloud.ibm.com/instances/8a64ea0b-ebb0-412d-aecd-438426034a0a/v3/tone?version=2017-09-21', {
        method: 'GET',
        body: documentTextField.value,
        headers: { 'Content-Type': 'text/plain' },
    }).then(res => res.json())
        .then(json => console.log(json));

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.kr-seo.tone-analyzer.watson.cloud.ibm.com/instances/8a64ea0b-ebb0-412d-aecd-438426034a0a/v3/tone?version=2017-09-21', true);
    request.setRequestHeader('Content-Type', 'text/plain');
    request.setRequestHeader
    request.send("username=John&password=Smith&grant_type=password");

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            alert(request.responseText);
        }
    };

}


function streamToString(stream) {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
}



// https://vocaroo.com/e1ccb9b1-177d-4e05-ac23-938d366f4baa




