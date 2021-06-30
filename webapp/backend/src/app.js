
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');
var base64 = require('base-64');
var utf8 = require('utf8');
var QRCode = require('qrcode');
 
let network = require('./fabric/network.js');
let user = "consumer";

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
  try{
    let drugId = req.query.drugId;
    console.log("drug id : ", drugId)
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'drugExists', drugId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});


app.get('/readDrug', async (req, res) => {
  try{
    let drugId = req.query.drugId;
    console.log("drug id : ", drugId)
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'readDrug', drugId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});


app.delete('/deleteDrug', async (req, res) => {
  try{
    let drugId = req.query.drugId;
    console.log("drug id : ", drugId)
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'deleteDrug', drugId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});



app.post('/updateDrug',async(req,res)=>{
  try{
    let newDrugData = {
      drugId : req.body.drugId,
      drugName:  req.body.drugName, 
      drugManufacturer: req.body.drugManufacturer, 
      manDate: req.body.manDate, 
      expiryDate: req.body.expiryDate, 
      batchId: req.body.batchId
    };
    
    console.log(newDrugData);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'updateDrug',newDrugData);
    console.log(response);
    response = response.toString();
    console.log(typeof(response));
    res.send(response);

  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error");
    
  }
})




app.post('/createDrug',async(req,res)=>{
  try{
    let drugData = {
      drugId : req.body.drugId,
      drugName : req.body.drugName,
      drugManufacturer : req.body.drugManufacturer,
      manDate : req.body.manDate,
      expiryDate : req.body.expiryDate,
      batchId : req.body.batchId
    }
    console.log(drugData);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'createDrug',drugData);
    console.log(response);
    response = response.toString();
    console.log(typeof(response));
    res.send(response);

  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error");
    
  }
})


app.get('/orderExists', async (req, res) => {
  try{
    let orderId = req.query.orderId;
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'orderExists', orderId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});

app.post('/createOrder',async(req,res)=>{
  try{
    let orderData = {
      orderId : req.body.orderId,
      drugId : req.body.drugId,
      quantity : req.body.quantity,
      currentOwner : req.body.currentOwner,
      status: req.body.status
    }
    console.log("Order Data : ",orderData);


    var bytes = utf8.encode(orderData.orderId);
    var encoded = base64.encode(bytes);
    var link = `http://localhost:5000/verify?orderID=${encoded}`;


    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'createOrder', orderData);
    console.log(response);
    response = response.toString();
    console.log(typeof(response));
    res.send(response);
    generateQR(link,encoded);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error");
  }
})

app.post('/updateOrder',async(req,res)=>{
  try{
    let newOrderData = {
      orderId : req.body.orderId,
      newCurrentOwner : req.body.newCurrentOwner,
      newStatus: req.body.newStatus
    }
    
    console.log(newOrderData);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'updateOrder',newOrderData);
    console.log(response);
    response = response.toString();
    console.log(typeof(response));
    res.send(response);

  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error");
    
  }
})


app.get('/readOrder', async (req, res) => {
  try{
    let orderId = req.query.orderId;
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'readOrder', orderId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});


app.delete('/deleteOrder', async (req, res) => {
  try{
    let orderId = req.query.orderId;
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'deleteOrder', orderId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});



app.get('/verifyAsDistributor', async (req, res) => {
  try{
    let orderId = req.query.orderId;
    var bytes = base64.decode(orderId);
    var decodedOrderId = utf8.decode(bytes);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'verifyAsDistributor', decodedOrderId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});

app.get('/verifyAsRetailer', async (req, res) => {
  try{
    let orderId = req.query.orderId;
    var bytes = base64.decode(orderId);
    var decodedOrderId = utf8.decode(bytes);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'verifyAsRetailer', decodedOrderId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});

app.get('/verifyAsConsumer', async (req, res) => {
  try{
    let orderId = req.query.orderId;
    var bytes = base64.decode(orderId);
    var decodedOrderId = utf8.decode(bytes);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'verifyAsConsumer', decodedOrderId);
    response = response.toString();
    res.send(response);
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error")
  }
});

app.get("/verify", async(req,res) =>{
  try{
        var orderId = req.query.orderId;
        console.log(orderId);
        if(user === "consumer"){
          res.redirect(`/verifyAsConsumer?orderId=${orderId}`);
        }else if(user === "retailer"){
          res.redirect(`/verifyAsRetailer?orderId=${orderId}`);
        }else{
          res.redirect(`/verifyAsDistributor?orderId=${orderId}`);
        }
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error");
  }
})






app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})


const generateQR = async (link,encoded) => {
  try {
    var filename = `./${encoded}.png`
    await QRCode.toFile(filename, link);
  } catch (err) {
    console.error(err)
  }
}