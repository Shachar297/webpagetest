const
    locationSelect = document.getElementById("location-select"),
    searchButton = document.getElementById("searchBtn"),
    serverUrl = "http://localhost:4554/app/",
    formResponse = document.getElementById("form-response");


let isTimeStops = false,
    intervalSeconds,
    secondsTook = 0,
    elementsOpacity;

const init = () => {

    document.getElementById("status-code-response").style.opacity = "0"
    document.getElementById("response-location").style.opacity = "0"
    document.getElementById("response-latency").style.opacity = "0"

    searchButton.addEventListener("click", (e) => startPageTest(e));
}


const startPageTest = (event) => {
    event.preventDefault();
    setTimer(isTimeStops)
    fetch(serverUrl + locationSelect.value, {
        method: "GET"
    }).then(response => {
        response.json().then(json => {

            setOpacity(document.getElementById("status-code-response"))
            setOpacity(document.getElementById("response-location"))
            setOpacity(document.getElementById("response-latency"))

            isTimeStops = true;
            setResponseMessage(json)
            setTimer(isTimeStops)
            clearInterval(intervalSeconds)
            // if(document.getElementById("status-code-response").style.opacity == 1) {
            //     clearInterval(elementsOpacity)
            // }
        })
    }).catch(err => {
        console.log(err);
    })

}


const setResponseMessage = (response) => {

    document.getElementById("status-code-response-message").innerHTML = response.status;
    document.getElementById("response-location-message").innerHTML = response.location
    document.getElementById("response-latency-message").innerHTML = response.latency + "s"

}


function setOpacity(element) {

    let opacity = parseInt(element.style.opacity);
    element.style.opacity = opacity;

    if (opacity == 1) {
        return;
    }


    setInterval(() => {
        opacity = opacity + 0.1;
        element.style.opacity = opacity;
    }, 500);
}


const setTimer = (isTimeStops) => {
    if (isTimeStops) {
        return document.getElementById("timer").innerHTML = "Time Took to Response : " + secondsTook;
    }

    if (!isTimeStops) {
        intervalSeconds = setInterval(() => {
            secondsTook++;
            document.getElementById("timer").innerHTML = secondsTook
        }, 1000)
    }
}

init();
