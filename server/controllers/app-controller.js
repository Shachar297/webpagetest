
    const express = require('express'),
    appLogic = require('../logic/app-logic'),
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
            const response = await appLogic.testByLocation(location)
                res.send(response);
        } catch (error) {
            return next(error);
        }
    })


    module.exports = router;


