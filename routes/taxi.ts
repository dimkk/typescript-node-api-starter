import express = require("express");
const router = express.Router();
const Taxi = require("../models/taxi");

router
    .route("/taxi")
    .post((req, res) => {
        var taxi = new Taxi();      // create a new instance of the Taxi model
        taxi.name = req.body.name;  // set the taxis name (comes from the request)
        console.log(taxi);

        // save the taxi and check for errors
        taxi.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Taxi created!" });
        });
    })
    .get((req, res) => {
        Taxi.find((err,taxis) => {
            if (err) {
                res.send(err);
            }
            res.json(taxis);
        });
    });

export = router;
