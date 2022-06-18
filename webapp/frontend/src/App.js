import './App.css';
import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/Pages/Landing";
import Login from "./components/Pages/Login";
import Dashboard from './components/Pages/Dashboard';
import Register from './components/forms/Registration'; 
import Alert from './components/layout/Alert'; 
import DrugCreate from "./components/forms/DrugCreate"; 
import DrugUpdate from "./components/forms/DrugUpdation";
import ReadDrug from './components/popups/ReadDrug';
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./actions/auth";
import OrderCreate from "./components/forms/OrderCreate"; 
import ReadOrder from './components/popups/ReadOrder';
import QRscanner from "./components/qrcode-reader/QRscan";
import AllDrug from "./components/Pages/AllDrug";
import UploadImage from './components/forms/UploadImage';
import AllOrder from "./components/Pages/AllOrder";
import AllUser from "./components/Pages/AllUser";
import Graph from "./components/Pages/Graph";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  
useEffect(() => {
  store.dispatch(loadUser())
}, [])

  return (
 <>
  <Provider store={store}>
  <Router>
 <Navbar/>
 <Route exact path="/" component={Landing} />
 <Alert/>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/addDrug" component={DrugCreate} />
              <PrivateRoute exact path="/editDrug" component={DrugUpdate} />
              <PrivateRoute exact path="/readDrug" component={ReadDrug} />
              <PrivateRoute exact path="/addOrder" component={OrderCreate} />
              <PrivateRoute exact path="/readOrder" component={ReadOrder} />
              <PrivateRoute exact path="/verify" component={QRscanner} />
              <PrivateRoute exact path="/allDrug" component={AllDrug} />
              <PrivateRoute exact path="/uploadimage" component={UploadImage} />
              <PrivateRoute exact path="/allOrder" component={AllOrder} />
              <PrivateRoute exact path="/allUser" component={AllUser} />
              <PrivateRoute exact path="/graph/:id" component={Graph} />
            </Switch>
 </Router>
  </Provider>
 </>
  );
}

export default App;
