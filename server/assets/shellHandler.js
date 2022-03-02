const
    {exec, spawn} = require("child_process");


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


module.exports = {
    removeFiles
}