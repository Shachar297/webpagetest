const
    getPageURLinput = document.getElementById("getPage-input"),
    getPageButton = document.getElementById("getPage-button"),
    getPageCleanButton = document.getElementById("getPage-clean"),
    downloadLogsButton = document.getElementById("downloadLogs-button"),
    textArea = document.getElementById("getPage-status-code-response"),
    clipBoardCopy = document.getElementById("clipboard-copy");

let serverResponses = [],
    searches = [];

const initGetPage = () => {

    clipBoardCopy.style.cursor = "not-allowed";

    document.getElementById("clipboard-copy-message").style.display = "none";

    downloadLogsButton.style.display = "none";
    getPageButton.addEventListener("click", (event) => getPage(event));
    getPageCleanButton.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("getPage-status-code-response-message").value = ""
        document.getElementById("getPage-status-code-response-message").innerHTML == ""
        document.getElementById("getPage-status-code-response-message").innerText = ""


    });

    downloadLogsButton.addEventListener("click", (event) => onDownloadLogs(event));
    clipBoardCopy.addEventListener("click", () => copyToClipBoard());
}


const getPage = (event) => {
    event.preventDefault();
    for (let i = 0; i < 10; i++) {
        fetchResponse()
        if (i >= 9) {
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
                handleResponse(json);
                searches.push(getPageURLinput.value);
                const placeholder = getPageURLinput.value;
                getPageURLinput.value = ""
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

    clipBoardCopy.style.cursor = "pointer";
    serverResponses.push(response);
    // document.getElementById("getPage-status-code-response-message").value = ""

    for (let res = 0; res < serverResponses.length; res++) {
        serverResponses[res] = serverResponses[res].replace("PING", res + " : ")
        document.getElementById("getPage-status-code-response-message").value += serverResponses[res]
    }

    for (let search = 0; search < searches.length; search++) {
        if (searches[search] != "") {
            getPageURLinput.placeholder = `Your Last Page-Test Was : ${searches[search]}`;

        }
    }

}



const onDownloadLogs = (event) => {
    event.preventDefault();
    const pingResult = { data: document.getElementById("getPage-status-code-response-message").value }
    fetch(serverUrl + "download/logs/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pingResult)
    }).then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error);
    })

}

const copyToClipBoard = async () => {
    if (
        !document.getElementById("getPage-status-code-response-message").value ||
        document.getElementById("getPage-status-code-response-message").value == " ") {
        return
    }
    await navigator.clipboard.writeText(document.getElementById("getPage-status-code-response-message").value)
    document.getElementById("clipboard-copy-message").style.display = "block";
    setTimeout(() => {
        document.getElementById("clipboard-copy-message").style.display = "none";
    }, 1500)
}

initGetPage();