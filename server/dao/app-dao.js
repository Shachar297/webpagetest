
require('dotenv').config();

const
    webPageTest = require('webpagetest'),
    wpt = new webPageTest("www.webpagetest.org", process.env.API_KEY);





async function testByLocation(location) {
    let options = {
        'firstViewOnly': true,
        'runs': 1,
        'location': `${location}:Chrome`,
        'connectivity': '4g',
        'pollResults': 5,
        'timeout': 5000
    }

    wpt.runTest("https://www.webpagetest.org", options, (err, data) => {
        if (data.data) {
            console.log(
                "Status : ", data.statusCode, "\n",
                "Location : ", data.data.location.split(":")[0], "\n",
                "Latency : ", data.data.latency
            )
            const response = {
                status: data.statusCode,
                location: location,
                latency: data.data.latency
            }
            return response
        } else {

            return err
        }
    });
}


async function pageTest() {
    locations = [
        "Dulles", "Los Angeles"
    ];

    for (let location = 0; location < locations.length; location++) {
        let options = {
            'firstViewOnly': true,
            'runs': 1,
            'location': `${locations[location]}:Chrome`,
            'connectivity': '4g',
            'pollResults': 5,
            'timeout': 5000
        }


        wpt.runTest('https://docs.webpagetest.org', options, (err, data) => {
            if (data) {
                console.log(
                    "Status : ", data.statusCode, "\n",
                    "Location : ", data.data.location.split(":")[0], "\n",
                    "Latency : ", data.data.latency

                )
            } else {
                console.error(locations[location], err)
            }
        })

    }
}

module.exports = {
    pageTest,
    testByLocation
}

