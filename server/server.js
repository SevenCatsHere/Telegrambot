const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser =  require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

var client = redis.createClient();


// client.on('connect', function() {
//     console.log("Connected to Redis");
// });

// client.on('error',function() {
//  console.log("Error in Redis");
// })

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

// Cache middleware
function cache(req, res, next) {
    const { name } = req.params;
    console.log("Name sent to server.... "+name);

    client.get(name, (err, data) => {
        if(err) throw err;

        if(data !== null && data !== undefined && data !== "") {
            console.log("data "+parseInt(data));
            let newKarma = parseInt(data) + 1;
            client.set(name, newKarma);
            res.json(JSON.parse('{"karma": '+newKarma+'}'));
        } else {
            next();
        }
    })
}
//next middleware
async function initUserKarma(req, res) {
    try {
        console.log("Fetching karma..");
        const { name } = req.params;

        console.log("name..."+name);

        let karma = 1;
        console.log(client.set(name, karma));

        res.json({name: karma});

    } catch (error) {
        console.error(error);
        res.status(500);
        res.end();
    }
}


app.get('/api/bot/getUserKarma:name', cache, initUserKarma);

app.listen(port, function(){
    console.log(`Server stared on port `+port+"!")
});
