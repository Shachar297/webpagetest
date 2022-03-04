const
    fs = require('fs');

const createLogFile = async (txt, fileName) => {
    return new Promise((resolve, reject) => {

        const file = fs.writeFile(`${__dirname}/../files/${fileName}`, txt, err => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log(file)
            resolve(`${fileName} Created successfully`);
        });

    })
}


module.exports = {
    createLogFile
}