
    const express = require('express'),
    appLogic = require('../logic/app-logic'),
    appDao = require('../dao/app-dao'),
    router = express.Router()

    router.get('/' , async (req, res, next) => {
        try {
            res.json(await appLogic.pageTest());
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


    module.exports = router;


