const
    fs = require('fs-extra');

const createLogFile = async (txt, fileName) => {
    return new Promise((resolve, reject) => {
        
        const file = fs.writeFileSync(`${__dirname}/../files/${fileName}`, txt , err => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log(file)
            resolve(file);
        });
        
    })
    return `${__dirname}/../files/${fileName} Has Been Created successfully.`
}


module.exports = {
    createLogFile
}