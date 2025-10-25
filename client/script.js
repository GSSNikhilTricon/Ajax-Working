let msgElement = document.getElementById('msg');


function vote(option) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            msgElement.innerHTML = xhr.responseText;
            loadResults();
        } 
    };
    xhr.open('POST', 'http://localhost:3000/vote', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ vote: option }))
}

//Decrement count
function deleteVote(option) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            msgElement.innerHTML = xhr.responseText;
            loadResults();
        }
    };
    xhr.open('DELETE', 'http://localhost:3000/vote', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ vote: option }))
}

// To load the no. of votes for the options
function loadResults() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var results = JSON.parse(xhr.responseText)
            document.getElementById('result').innerHTML = `
                Option1: ${results.option1} votes<br>
                Option2: ${results.option2} votes
            ` ;
        }
    }
    xhr.open('GET', 'http://localhost:3000/results', true);
    xhr.send();
}

window.onload = function() {
    loadResults();
};