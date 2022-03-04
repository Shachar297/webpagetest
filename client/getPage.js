const
    getPageURLinput = document.getElementById("getPage-input"),
    getPageButton = document.getElementById("getPage-button"),
    getPageCleanButton = document.getElementById("getPage-clean"),
    downloadLogsButton = document.getElementById("downloadLogs-button");

let serverResponses = []

const initGetPage = () => {
    downloadLogsButton.style.display = "none"
    getPageButton.addEventListener("click", (event) => getPage(event));
    getPageCleanButton.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("getPage-status-code-response-message").innerHTML = ""
    });

    downloadLogsButton.addEventListener("click", (event) => onDownloadLogs(event))
}


const getPage = (event) => {
    event.preventDefault();
    for (let i = 0; i < 10; i++) {
        fetchResponse()
        if(i >= 9){
            setTimeout(() => {
                downloadLogsButton.style.display = "block"
            }, 1500);
        }
    }
}

const fetchResponse = () => {
    fetch(serverUrl + "url/" + getPageURLinput.value, {
        method: "GET"
    }).then(response => {
        response.json()
            .then(json => {
                console.log(json)
                handleResponse(json);

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
    serverResponses.push(response);
    document.getElementById("getPage-status-code-response-message").innerHTML = ""

    for (let res = 0; res < serverResponses.length; res++) {
        serverResponses[res] = serverResponses[res].replace("PING", res + " : ")
        document.getElementById("getPage-status-code-response-message").innerHTML += serverResponses[res]
    }

}

const onDownloadLogs = (event) => {
    event.preventDefault();

    fetch(serverUrl + "/")

}

initGetPage();