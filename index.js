const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./apiRoutes/routes');
const bodyParser = require('body-parser');

app.use(express.json());
app.use("/api",router);



app.use(express.urlencoded({extended: 'true'}));
app.use(bodyParser.json());
// app.use(cors({
//     origin: 'http://localhost:3200', 
//     optionsSuccessStatus: 200 
//   }));
  app.use(cors());
  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,      Accept");
    next();
  };
  app.use(allowCrossDomain);
app.listen(process.env.PORT, ()=>{
    console.log("Server is listening on port 3200")
})