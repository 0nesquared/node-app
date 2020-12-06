// using AJAX

function loadComments() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // clearing out the previous contents to avoid overwriting
            document.getElementById("comments").innerHTML = "";
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";

            let result = this.responseText;
            let results = JSON.parse(result);

            results.forEach((comment) => {
                let node = document.createElement("div");
                let name = document.createElement("h5");
                let date = document.createElement("h6");
                let time = document.createElement("h6");
                let message = document.createElement("p");

                node.className = "card-body";
                name.className = "card-title";
                date.className = "card-subtitle text-muted";
                time.className = "card-subtitle text-muted mt-1";

                let textName = document.createTextNode("Name: " + comment.userName);
                let textDate = document.createTextNode("Date: " + new Date(comment.dateTime).toLocaleDateString());
                let textTime = document.createTextNode("Time: " + new Date(comment.dateTime).toLocaleTimeString());
                let textMessage = document.createTextNode(comment.comment);
                let lineBreak = document.createElement("hr");

                name.appendChild(textName);
                date.appendChild(textDate);
                time.appendChild(textTime);
                message.appendChild(textMessage);

                node.appendChild(name);
                node.appendChild(date);
                node.appendChild(time);
                node.appendChild(message);
                node.appendChild(lineBreak);

                document.getElementById("comments").appendChild(node);
            });
        }
    };

    xhttp.open("GET", "/fetchComments", true);
    xhttp.send();
}

function insertComment() {
    let xhttp = new XMLHttpRequest();

    // this time on response, we want to display the updated comments section
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let result = this.responseText;
            console.log(result);
            loadComments();
        }
    };

    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    xhttp.open("POST", "/insertComment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    // sending data as a json string
    xhttp.send(`{"name": "${name}", "message": "${message}"}`);
}
