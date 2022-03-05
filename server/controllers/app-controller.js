
const express = require('express'),
    appLogic = require('../logic/app-logic'),
    appDao = require('../dao/app-dao'),
    router = express.Router(),
    fs = require('fs');



router.get('/url/:url', async (req, res, next) => {
    const url = req.params.url;
    try {
        res.json(await appLogic.pageTest(url));
    } catch (e) {
        return next(e);
    }
});


router.get("/:location", async (req, res, next) => {
    const location = req.params.location;
    try {
        res.json(await appLogic.testByLocation(location));
    } catch (error) {
        return next(error);
    }
})


router.post("/download/logs/", async (req, res, next) => {
    const body = req.body;

    try {
        // res.download(400, await appLogic.downloadLogs(body));
        const file = await appLogic.downloadLogs(body);
        console.log(file, "Files");

        fs.readFile(file, (err, data) => {
            if (err) {
                res.send("err")
            } else {
                // res.writeHead(200, { "Content-Type": "text/plain" });
                // res.end(data);
                const response = {
                    status : 200,
                    type : '"Content-Type": "text/plain"',
                    file: data.toString("utf8"),
                    fileName: `logs.txt`
                }

                console.log(response.file.toString("utf8"))
                res.json(response);
            }
        });

        // res.download(file);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;


