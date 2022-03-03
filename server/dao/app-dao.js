
require('dotenv').config();

const
    shellHandler = require('../assets/shellHandler'),
    webPageTest = require('webpagetest'),
    wpt = new webPageTest("www.webpagetest.org", process.env.API_KEY),
    fs = require('fs'),
    XLSX = require('xlsx');

let
    workbook = XLSX.utils.book_new(),
    response = {},
    locations = [];




async function testByLocation(location) {
    console.log("\u001b[1;35m Starting Testing at " + location);
    let options = {
        'firstViewOnly': true,
        'runs': 1,
        'location': `${location}:Chrome`,
        'connectivity': '4g',
        'pollResults': 5,
        'timeout': 10000
    },
        response;

    response = await pageTesting(options);
    shellHandler.removeFiles();

    return generateResponse(response)

}

const pageTesting = (options) => {
    return new Promise((resolve, reject) => {
        wpt.runTest("https://www.webpagetest.org", options, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

async function pageTest(url) {
    let response


    try {
        response = await shellHandler.ping(url);
        return response
    } catch (error) {
        throw new Error(error)
    }

}

const generateResponse = (response) => {
    const responseObject = {
        status: response.statusCode,
        location: response.data.location,
        latency: response.data.latency
    }
    console.log(`\u001b[1;36m`, responseObject)
    return responseObject
}

module.exports = {
    pageTest,
    testByLocation
}

