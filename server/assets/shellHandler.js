const
    {exec, spawn} = require("child_process");

    let form;

    const removeFiles = () => {
        console.log("Exec")

        const files = exec("ls assets/" , {shell : true});

        files.stdout.on("data", data => {
            console.log(data)
        })

        files.stderr.on("err", err => {
            console.log(err)

        })
    }


const ping = (url) => {

    return new Promise((resolve, reject) => {

        const response = exec(`ping ${url}`, { shell : true });
        
        response.stdout.on("data", data => {
            resolve(data);
        });
        
        response.stderr.on("error", err => {
            reject(err);
        });
        
        response.on("end", (data) => {
            console.log(data, "data")
        });
        
        return form
    })
}


module.exports = {
    removeFiles,
    ping
}