
const appDao = require('../dao/app-dao');

async function pageTest(url) {
    return await appDao.pageTest(url);
}


async function testByLocation(location) {
    const request = await appDao.testByLocation(location);
    return request
}
module.exports = {
    pageTest,
    testByLocation
}

