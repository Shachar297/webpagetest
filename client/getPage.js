const
    getPageURLinput = document.getElementById("getPage-input"),
    getPageButton = document.getElementById("getPage-button"),
    getPageCleanButton = document.getElementById("getPage-clean");

let serverResponses = []

const initGetPage = () => {

    getPageButton.addEventListener("click", (event) => getPage(event));
    getPageCleanButton.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("getPage-status-code-response-message").innerHTML = ""
    });
}


const getPage = (event) => {
    event.preventDefault();

    for (let i = 0; i < 10; i++) {
        fetchResponse()
    }

}

const fetchResponse = () => {
    fetch(serverUrl + "url/" + getPageURLinput.value, {
        method: "GET"
    }).then(response => {
        response.json()
            .then(json => {
                console.log(json)
                handleResponse(json)

            })
    }).catch(error => {
        console.log(error);
    })
}

const setPageTimer = (isTimeStops) => {
    if (isTimeStops) {
        return document.getElementById("getPage-timer").innerHTML = "Time Took to Response : " + secondsTook;
    }

    if (!isTimeStops) {
        intervalSeconds = setInterval(() => {
            secondsTook++;
            document.getElementById("getPage-timer").innerHTML = secondsTook
        }, 1000)
    }
}

const handleResponse = (response) => {
    serverResponses.push(response)
    // if (serverResponses.length > 6) {
    //     serverResponses = [];
    // }
    document.getElementById("getPage-status-code-response-message").innerHTML = ""

    for (let res = 0; res < serverResponses.length; res++) {
        serverResponses[res] = serverResponses[res].replace("PING", res + " : ")
        document.getElementById("getPage-status-code-response-message").innerHTML += serverResponses[res]
    }

}

initGetPage();