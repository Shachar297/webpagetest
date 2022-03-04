
    const express = require('express'),
    appLogic = require('../logic/app-logic'),
    appDao = require('../dao/app-dao'),
    router = express.Router()

    router.get('/url/:url' , async (req, res, next) => {
        const url = req.params.url;
        try {
            res.json(await appLogic.pageTest(url));
        }catch(e) {
            return next(e);
        }
    });


    router.get("/:location" , async (req, res, next) => {
        const location = req.params.location;
        try {
            res.json(await appLogic.testByLocation(location));
        } catch (error) {
            return next(error);
        }
    })


    router.post("/download/logs/" , async (req, res, next) => {
        const body = req.body;

        try {
            res.writeHead(400, await appLogic.downloadLogs(body));
        } catch (error) {
            return next(error);
        }
    });
    
    module.exports = router;


