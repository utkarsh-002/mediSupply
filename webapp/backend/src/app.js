
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin = config.appAdmin;

//use this identity to query
//const appAdmin = config.appAdmin;
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081/RegisterPatient"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

app.get('/api/printSomething', async (req, res) => {

    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'printSomething', '{"Name":"hello"}');
    // let parsedResponse = await JSON.parse(response);
    res.send(response);

});

app.get('/drugExists', async (req, res) => {

  let networkObj = await network.connectToNetwork(appAdmin);
  console.log('networkobj: ');
  console.log(util.inspect(networkObj));

  // let a={
  //   drugId:'d123'
  // }
  let response = await network.invoke(networkObj, true, 'drugExists', 'd123');
  // let parsedResponse = await JSON.parse(response);
  // console.log(parsedResponse);
  // res.send(parsedResponse);
  response = response.toString();
  console.log(typeof(response));
  res.send(response);

});

app.listen(process.env.PORT || 8080);
