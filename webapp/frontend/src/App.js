import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/Pages/Landing";
import Login from "./components/Pages/Login";
import Dashboard from './components/Pages/Dashboard';
import Registration from './components/forms/Registration';
import setAuthToken from "./utils/setAuthToken"
import { Provider } from "react-redux"
import store from "./store"
import PrivateRoute from "./components/routing/PrivateRoute"


function App() {
  return (
 <>
  <Provider store={store}>
  <Router>
 <Navbar/>
 <Route exact path="/" component={Landing} />
 <Route exact path="/login" component={Login} /> 
 <Route exact path="/dashboard" component={Dashboard} /> 
 <Route exact path="/register" component={Registration} /> 
 </Router>
  </Provider>
 </>
  );
}

export default App;
