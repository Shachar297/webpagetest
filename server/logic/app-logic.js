
const appDao = require('../dao/app-dao');

async function pageTest() {
    const example = await appDao.pageTest();
    return example
}


async function testByLocation(location) {
    const request = await appDao.testByLocation(location);
    return request
}
module.exports = {
    pageTest,
    testByLocation
}

