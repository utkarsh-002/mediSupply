import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/Pages/Landing";
import Login from "./components/Pages/Login";
import Dashboard from './components/Pages/Dashboard';


function App() {
  return (
 <>
 <Router>
 <Navbar/>
 <Route exact path="/" component={Landing} />
 <Route exact path="/login" component={Login} /> 
 <Route exact path="/dashboard" component={Dashboard} /> 
 </Router>
 </>
  );
}

export default App;
