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
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./actions/auth";

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
            </Switch>
 </Router>
  </Provider>
 </>
  );
}

export default App;
