//Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';

const { Gateway, X509WalletMixin,Wallets,FileSystemWallet } = require('fabric-network');
const path = require('path');
const fs = require('fs');

//connect to the config file
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
// let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;
let appAdmin = config.appAdmin;
let orgMSPID = config.orgMSPID;

// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


const util = require('util');

exports.connectToNetwork = async function (userName) {
  
    const gateway = new Gateway();
  
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);
      console.log('userName:');
      console.log(userName);
      // Set up the connection options

      // Import the identity into the wallet
      const identityLabel = 'admin';
      // const identity = X509WalletMixin.createIdentity('Org1MSP', adminIdentity.certificate, adminIdentity.key.toBytes());
      // await wallet.import(identityLabel, identity);
  
      console.log('wallet: ');
      console.log(util.inspect(wallet));
      console.log('ccp: ');
      console.log(util.inspect(ccp));
      // userName = 'V123412';
      const userExists = await wallet.exists(userName);
      if (!userExists) {
        console.log('An identity for the user ' + userName + ' does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        let response = {};
        response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
        return response;
      }
      
      console.log('before gateway.connect: ');
      //await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });
      await gateway.connect(ccp, {
        wallet,
        identity: userName,
        // discovery: { enabled: true, asLocalhost: true },
        discovery: gatewayDiscovery
      });
  
      // Connect to our local fabric
      const network = await gateway.getNetwork('mychannel');
    
      console.log('Connected to mychannel. ');
      // Get the contract we have installed on the peer
      const contract = network.getContract('contracts');
      
  
  
      let networkObj = {
        contract: contract,
        network: network,
        gateway: gateway
      };
  
      return networkObj;
  
    } catch (error) {
      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);
      let response = {};
      response.error = error;
      return response;
    } finally {
      console.log('Done connecting to network.');
      // gateway.disconnect();
    }
  };


//Client application part for calling/invoking any smart contract function(query etc)
  
exports.invoke = async function (networkObj, isQuery, func, args) {
    try {
      console.log('inside invoke');
      console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
      if (isQuery === true) {
        console.log('inside isQuery');
  
        if (args) {
          console.log('inside isQuery, args');
          let response = await networkObj.contract.evaluateTransaction(func, args);
          console.log(response);
          console.log(`Transaction ${func} with args ${args} has been evaluated`);
          await networkObj.gateway.disconnect();
          return response;
          
        } else {
  
          let response = await networkObj.contract.evaluateTransaction(func);
          console.log(response);
          console.log(`Transaction ${func} without args has been evaluated`);
    
          await networkObj.gateway.disconnect();
    
          return response;
        }
      } else {
        console.log('notQuery');
        if (args) {
          console.log('notQuery, args');
          console.log('$$$$$$$$$$$$$ args: ');
          console.log(args);
          console.log(func);
          console.log(util.inspect(args));
          args = JSON.stringify(args);
          console.log(util.inspect(args));
          console.log('before submit');
          // args = JSON.parse(args);
          // let response = await networkObj.contract.submitTransaction(func, args);
          console.log('after submit');
          console.log(response);
          console.log(`Transaction ${func} with args ${args} has been submitted`);
    
          await networkObj.gateway.disconnect();
    
          return response;
  
  
        } else {
          let response = await networkObj.contract.submitTransaction(func);
          console.log(response);
          console.log(`Transaction ${func} with args has been submitted`);
    
          await networkObj.gateway.disconnect();
    
          return response;
        }
      }
  
    } catch (error) {
      // console.error(`Failed to submit transaction: ${error}`);
      // return error;
    }
  };



//Client application part for registering a new manufacturer


exports.registerManufacturer = async function (manufacturerId, name, licenceId, establishedDate, registeredDate, address, contact) {

 

  console.log('manufacturerId');
  console.log(manufacturerId);

  console.log('name');
  console.log(name);

if (!manufacturerId || !name || !licenceId || !establishedDate || !registeredDate || !address || !contact) {
    let response = {};
    response.error = 'Error! You need to fill all fields before you can register!';
    return response;
  }

  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(manufacturerId);
    if (userExists) {
      let response = {};
      console.log(`An identity for the manufacturer with manufacturerId ${manufacturerId} already exists in the wallet`);
      response.error = `Error! An identity for the manufacturer with manufacturerId ${manufacturerId} already exists in the wallet.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin);
    if (!adminExists) {
      console.log(`An identity for the admin user ${appAdmin} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery });

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: manufacturerId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: manufacturerId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(manufacturerId, userIdentity);
    console.log(`Successfully registered manufacturer ${name} . Use manufacturerId ${manufacturerId} and password: secret99 to login above.`); //password is static and set to secret99 for manufacturers
    let response = `Successfully registered manufacturer ${name} . Use manufacturerId ${manufacturerId} and password: secret99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register manufacturer + ${name} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};



//Client application part for registering a new distributor

exports.registerDistributor = async function (distributorId, name, licenceId, registeredDate, capacity, state, city, address, contact) {

 

  console.log('distributorId');
  console.log(distributorId);

  console.log('name');
  console.log(name);

if (!distributorId || !name || !licenceId || !registeredDate || !capacity || !state || !city || !address || !contact) {
    let response = {};
    response.error = 'Error! You need to fill all fields before you can register!';
    return response;
  }

  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(distributorId);
    if (userExists) {
      let response = {};
      console.log(`An identity for the distributor with distributorId ${distributorId} already exists in the wallet`);
      response.error = `Error! An identity for the distributor with distributorId ${distributorId} already exists in the wallet.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin);
    if (!adminExists) {
      console.log(`An identity for the admin user ${appAdmin} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery });

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: distributorId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: distributorId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(distributorId, userIdentity);
    console.log(`Successfully registered distributor ${name} . Use distributorId ${distributorId} and password: secret99 to login above.`); //password is static and set to secret99 for distributor
    let response = `Successfully registered distributor ${name} . Use distributorId ${distributorId} and password: secret99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register distributor + ${name} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};


//Client application part for registering a new retailer

exports.registerRetailer = async function (retailerId, name, licenceId, registeredDate, address, contact) {

 

  console.log('retailerId');
  console.log(retailerId);

  console.log('name');
  console.log(name);

if (!retailerId || !name || !licenceId || !registeredDate || !address || !contact) {
    let response = {};
    response.error = 'Error! You need to fill all fields before you can register!';
    return response;
  }

  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(retailerId);
    if (userExists) {
      let response = {};
      console.log(`An identity for the retailer with retailerId ${retailerId} already exists in the wallet`);
      response.error = `Error! An identity for the retailer with retailerId ${retailerId} already exists in the wallet.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin);
    if (!adminExists) {
      console.log(`An identity for the admin user ${appAdmin} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin, discovery: gatewayDiscovery });

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: retailerId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: retailerId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(retailerId, userIdentity);
    console.log(`Successfully registered retailer ${name} . Use retailerId ${retailerId} and password: secret99 to login above.`); //password is static and set to secret99 for retailer
    let response = `Successfully registered retailer ${name} . Use retailerId ${retailerId} and password: secret99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register retailer + ${name} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};
