require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const apiKey = process.env.API_KEY;

// Importar Middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");


// Logger
//Habilito carpeta public para archivos estaticos
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//configuracion de vistass EJS - Motor plantillas
app.set('view engine', 'ejs')
app.use(morgan(':method :host :url :status :param[id] - :response-time ms :body'));




app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        console.log(weather)
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.use(error404); //Middleware gestiona el 404

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})