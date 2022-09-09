
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
// const unlinkFile = util.promisify(fs.unlink);
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const { uploadFile, getFileStream } = require('../s3')
const axios = require('axios').default
 
let network = require('./fabric/network.js');
let user = "consumer";

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const connectDB = require("../config/database")

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
connectDB()

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth")
const User = require("../models/user")
const Drug = require("../models/drug") 
const Order = require("../models/order")
const { check, validationResult } = require("express-validator");
const conf = require("config");

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
app.get("/", auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
  } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
  }
});

//to register
app.post(
  "/register",
  [
      check("userName", "Name is required").not().isEmpty(),
      // check("lastName", "Last Name is required").not().isEmpty(),
      check("email", "Please enter a valid EmailId").isEmail(),
      check("password", "Password should have min 6 characters").isLength({
          min: 6,
          max: 32,
      }),
      check("role","Role is required").not().isEmpty(),
      check("license_number","license number is required").not().isEmpty()
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const { userName, email, password, role, license_number, address,contact } = req.body;
      try {
          let user = await User.findOne({ email });
          if (user) {
              return res
                  .status(400)
                  .json({ errors: [{ msg: "user already exists" }] });
          }

          user = new User({
              userName,
              email,
              password,
              role, 
              license_number, 
              address,
              contact
          });
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          await user.save();
          const payload = {
              user: {
                  id: user.id,
              },
          };
          jwt.sign(
              payload,
              conf.get("jwtSecret"),
              { expiresIn: 3600000 },
              (err, token) => {
                  if (err) throw err;
                  else res.json({ token });
              }
          );
      } catch (err) {
          console.error(err.message);
          res.status(500).send("server Error");
      }
  }
);

// to login user
app.post("/login", [
  check("email", "Please enter a valid EmailId").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
          let user = await User.findOne({ email });
          if (!user) {
              return res
                  .status(400)
                  .json({ errors: [{ msg: "Invalid Credentials" }] });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
              return res
                  .status(400)
                  .json({ errors: [{ msg: "Invalid Credentials" }] });
          }

          const payload = {
              user: {
                  id: user.id,
              },
          };
          jwt.sign(
              payload,
              conf.get("jwtSecret"),
              { expiresIn: 3600000 },
              (err, token) => {
                  if (err) throw err;
                  else res.json({ token });
              }
          );
      } catch (err) {
          console.error(err.message)
      }
  },
]);

app.get('/api/printSomething', async (req, res) => {

    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, true, 'printSomething', '{"Name":"hello"}');
    // let parsedResponse = await JSON.parse(response);
    res.send(response);

});

app.get('/drugExists', async (req, res) => {
  try{
    let drugId = req.query.drugId;
    // console.log("drug id : ", drugId)
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
    // console.log("drug id : ", drugId)
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
    // console.log("drug id : ", drugId)

    // delete from mongo
    let d = await Drug.findOne({ drugId });
    Drug.deleteOne({drugId}, function(err){
      if(err){
        let error = "No drug of the given id is present or there has been some error in deleting the drug, try again"
        throw error
      }
    })

    // delete from blockchain
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
      batchId: req.body.batchId,
      cost :req.body.cost
    };

    // update in mongo
    const d = await Drug.findOne({
      drugId : req.body.drugId
    })
    await d.updateOne({
      man : req.body.drugManufacturer,
      name : req.body.drugName
    });

    // console.log(newDrugData);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'updateDrug',newDrugData);
    // console.log(response);
    response = response.toString();
    // console.log(typeof(response));
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
      batchId : req.body.batchId,
      cost :req.body.cost
    }
    // console.log(drugData);
    const man = req.body.drugManufacturer
    const drugId = req.body.drugId
    const name = req.body.drugName
    const d_id = new Drug({
      man,
      drugId,
      name
    });
    // console.log("drug Id saved : ",d_id)
    await d_id.save();

    let networkObj = await network.connectToNetwork(appAdmin);
    // console.log(networkObj);
    let response = await network.invoke(networkObj, false, 'createDrug', drugData);
    // console.log(response);
    response = response.toString();
    // console.log(typeof(response));
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
      currentOwner : "M", //req.body.currentOwner,
      status: "in transit" //req.body.status
    }

    //save to mongodb
    const orderId = req.body.orderId
    const drugId = req.body.drugId
    const quantity = req.body.quantity
    const currentOwner = "M"
    const status = "in transit"
    const o_id = new Order({
      orderId,
      drugId,
      quantity,
      currentOwner,
      status
    });
    // console.log("order Id saved : ",o_id)
    await o_id.save();

    // console.log("Order Data : ",orderData);

    var bytes = utf8.encode(orderData.orderId);
    var encoded = base64.encode(bytes);
    var link = `http://localhost:5000/verify?orderId=${encoded}`;


    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'createOrder', orderData);

    console.log(response);

    response = response.toString();

    // console.log(typeof(response));

    generateQR(link,encoded);
    res.send(response);

  }catch(err){
    console.error(err);
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
    
    // update in mongo
    let o = await Order.findOne({
      orderId : req.body.orderId
    })

    console.log(o);

    if(o){
      await o.updateOne({
      currentOwner : req.body.newCurrentOwner,
      status : req.body.newStatus
    });
    }

    // console.log(newOrderData);
    let networkObj = await network.connectToNetwork(appAdmin);
    let response = await network.invoke(networkObj, false, 'updateOrder',newOrderData);
    // console.log(response);
    response = response.toString();
    // console.log(typeof(response));
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

    // delete from mongo
    let o = await Order.findOne({ orderId });
    Order.deleteOne({orderId}, function(err){
      if(err){
        let error = "No order of the given id is present or there has been some error in deleting the order, try again"
        throw error
      }
    })

    // delete from blockchain
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
    let o = await Order.findOne({
      orderId : decodedOrderId
    })
    if(o){
      console.log(o)
      await o.updateOne({
        currentOwner : "D",
        status : "in transit"
      });
    }
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
    let r = await Order.findOne({
      orderId : decodedOrderId
    })
    if(r){
      console.log(r)
      await r.updateOne({
        currentOwner : "R",
        status : "in transit"
      });
    }
    let networkObj = await network.connectToNetwork(appAdmin);
    
    //dict
    
    // let orderId = req.query.orderId;
    // let networkObj = await network.connectToNetwork(appAdmin);
    // let response = await network.invoke(networkObj, true, 'readOrder', orderId);
    

    //extract drug id and qnt 
    //increment qnt of that drug if present else add to dict

    //verify as consumer me decrement that drug
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
    let c = await Order.findOne({
      orderId : decodedOrderId
    })
    if(c){
      console.log(c)
      await c.updateOne({
        currentOwner : "C",
        status : "Delivered"
      });
    }
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
        var role = req.query.role;
        // console.log(orderId,role);
        if(role == "dist"){
          res.redirect(`/verifyAsDistributor?orderId=${orderId}`);
        }else if(role == "ret"){
          res.redirect(`/verifyAsRetailer?orderId=${orderId}`);
        }else{
          res.redirect(`/verifyAsConsumer?orderId=${orderId}`);
        }
  }catch(err){
    console.error(err.response.data);
    res.status(500).send("Server Error");
  }
})

app.get("/allDrug",async(req,res)=>{
  try{
    const d = await Drug.find()
    res.json(d);
  }
  catch(err){
    res.status(500).send("Drugs cannot be retrived")
  }
})

app.get("/allOrder",async(req,res)=>{
  try{
    const o = await Order.find()
    res.json(o);
  }
  catch(err){
    res.status(500).send("Orders cannot be retrived")
  }
})

app.get("/allUser",async(req,res)=>{
  try{
    const u = await User.find()
    res.json(u);
  }
  catch(err){
    res.status(500).send("Users cannot be retrived")
  }
})

app.post("/getData",async(req,res)=>{
  try{
    let email = req.body.email;
    let user = await User.findOne({ email });
    let valid = user.validCount;
    let invalid = user.invalidCount;
    let json = {
      valid,
      invalid
    }
    res.status(200).send(json);
  }catch(err){
    res.status(500).send(err)
  }
})

// app.get('/images/:key', (req, res) => {
//   // console.log(req.params)
//   const key = req.params.key
//   const readStream = getFileStream(key)

//   readStream.pipe(res)
// })

// app.post('/images', upload.single('image'), async (req, res, callback) => {
//   const file = req.file
//   // console.log(file)

//   // apply filter
//   // resize 

//   const result = await uploadFile(file, callback)
//   await unlinkFile(file.path)
//   // console.log(result)
//   res.send({imagePath: `/images/${result.Key}`})
// })


// app.post('/get_data_from_aws', (req, res) => {
//   console.log(req.body.final_map);
//   console.log(req.body.table);
//   console.log(req.body.raw_text);

//   res.send("Data received at backend");
// })


app.post('/images', async (req, res) => {
  // console.log(req.body);

  let input = req.body.Image;
  input = input.substring(input.indexOf("base64")+7)
  let email = req.body.email;

  // console.log(input);
  // console.log(email);

  // console.log(input);
  // console.log(typeof(input))

  const result = await axios.post('https://i0dmspes01.execute-api.ap-south-1.amazonaws.com/default/medscan-lambda', 
  {
    Image:input
  }, 
  { headers: {'x-api-key': "O24L8ce7h7UpQDdwV2Lo6icXcmGBuWp98Hy5Bji3", 'Content-Type':'application/json'}}
  )

  let table = result.data.table;
  let query_answers = result.data.query_answers;

  let details = {}
  
  query_answers.forEach(element => {
    let k = Object.values(element)['1'];
    let v = Object.values(element)['2'];
    details[k] = v;
  });

  const doctors = await axios.post('https://www.nmc.org.in/MCIRest/open/getDataFromService?service=searchDoctor', 
  {
    registrationNo: details.DOC_REG_NO
  }, 
  { headers: {'Content-Type':'application/json'}}
  )

  // console.log(doctors.data);
  // console.log(typeof(doctors.data));

  let doctorVerified = false;

  if(!(Object.keys(doctors.data).length == 0)) {
    doctorVerified = true;
  }

  console.log(doctorVerified);

  let user = await User.findOne({ email });
  if(user){
    if(doctorVerified){
      user.validCount++;
    }else{
      user.invalidCount++;
    }
  }

  // console.log(user)

  await user.save()

  // console.log(doctorVerified)

  res.status(200).send(doctorVerified);
})


app.listen(process.env.PORT || 5000, () => {
  console.log(`MedScan backend listening at http://localhost:5000`)
})


const generateQR = async (link,encoded) => {
  try {
    var filename = `qr-codes/${encoded}.png`
    await QRCode.toFile(filename, link);
  } catch (err) {
    console.error(err)
  }
}