const express = require("express");
var cors = require('cors')
var app = express()

var offers = require("./offers.json")
var services = require("./services.json")
const Fuse = require('fuse.js');

app.use(cors())

const fuseOptions = {
	// isCaseSensitive: false,
	includeScore: true,
	shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.95,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		"name",
        "desc"
	]
};


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

app.get("/user/search/default", (req, res)=>{ 
    
    res.status(200).send({
        services
    });
});

app.get("/user/search", (req, res)=>{
    const query = req.query.q;
    const fuse = new Fuse(services, fuseOptions);
    const result = fuse.search(query)
    console.log(result)
    res.status(200).send({services: result.filter((item)=>item.score<=0.3).map((item)=>item.item)});
});

app.listen(8085, (err) => {
    if (err) console.log("error", err);
    else console.log("listening on 8085");
});

