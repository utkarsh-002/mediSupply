import React from "react";
// import "./Login.css"
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         <form className="form card-5" >
      <h1 className="large">Welcome</h1>
      <p className="lead">
        <i className="fas fa-user-lock"></i> Sign into Your Account
      </p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="off"
            required
          /> 
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-form" value="Login" />
      </form>
         </div>
        </div>
    </section>
  )
}

export default Login