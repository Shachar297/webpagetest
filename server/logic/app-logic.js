
const appDao = require('../dao/app-dao');

async function pageTest() {
    const example = await appDao.pageTest();
    return example
}


async function testByLocation(location) {
    const response = await appDao.testByLocation(location)
    if(response) {
        return response
    }
}

module.exports = {
    pageTest,
    testByLocation
}

