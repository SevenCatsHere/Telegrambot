const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser =  require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

let client = redis.createClient();

client.on('connect', function() {
    console.log("Connected to Redis");
});

const port = 3000;
const app = express();

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(methodOverride('_method'));


app.get('/', function(req, res, next) {
    res.render('searchusers');
    particlesJS.load('particles-js', './views/layouts/particles.json', function(){
        console.log("particles.json loaded");
    })
});

app.post('/api/bot/handleKarma', function(req, res, next){
    let id = this.body.id;
});

app.listen(port, function(){
    console.log(`Server stared on port `+port+"!")
});