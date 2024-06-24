const express = require('express')
const app = express()


// Importar Middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :host :url :status :param[id] - :response-time ms :body'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})



app.use(error404); //Middleware gestiona el 404

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})