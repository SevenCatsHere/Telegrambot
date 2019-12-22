const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser =  require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

var client = redis.createClient();


client.on('connect', function() {
    console.log("Connected to Redis");
});

client.on('error',function() {
 console.log("Error in Redis");
})

const port = 4000;
const app = express();

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(methodOverride('_method'));


app.get('/', function(req, res, next) {
    res.render('searchusers');
});


//BACK END API STUFF ////

function handleKarma(name, data, method) {
    let newKarma = 0;
    switch(method) {
        case "add":
            newKarma = parseInt(data) + 1;
            client.set(name, newKarma);
            break;
        case "take":
            newKarma = parseInt(data) - 1;
            client.set(name, newKarma);
            break;
        case "get":
            newKarma = parseInt(data);
            break;
    }
    return newKarma;
}

// Cache middleware
function cache(req, res, next) {
    const name  = req.query.name;
    const method  = req.query.method;

    client.get(name, (err, data) => {
        if(err) throw err;

        if(data !== null && data !== undefined && data !== "") {
            let newKarma = handleKarma(name, data, method);
            res.json(JSON.parse('{"karma": '+newKarma+'}'));
        } else {
            next();
        }
    });
}

//next middleware
async function initUserKarma(req, res) {
    try {
        const name  = req.query.name;
        const method  = req.query.method;

        let karma;

        if(method === "add") {
            karma = 1;
            client.set(name, karma);
        }
        else if(method === "take") {
            karma = -1;
            client.set(name, karma);
        }
        else if(method === "get") {
            karma = 0;
        }

        res.json(JSON.parse('{"karma": '+karma+'}'));

    } catch (error) {
        console.error(error);
        res.status(500);
        res.end();
    }
}


app.get('/api/bot/addKarma', cache, initUserKarma);

app.listen(port, function(){
    console.log(`Server stared on port `+port+"!")
});
