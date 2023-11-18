const express = require("express");
var cors = require('cors')
var app = express()

var offers = require("./offers.json")
var services = require("./services.json")

app.use(cors())

app.get("/business/dash/data", (req, res) => {
    res.status(200).send({
        offers, services, stats: {
            views: 20,
            avgRating: 4.5,
            revenue: 3000,
            viewGraph: [1,10,7,9,5]
        }
    });
})

app.listen(8085, (err) => {
    if (err) console.log("error", err);
    else console.log("listening on 8085");
});

