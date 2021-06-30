import React, { Fragment } from "react"
import { Link } from "react-router-dom"


const Navbar = () => {
  
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fa fa-medkit" aria-hidden="true" /> MedScan
        </Link>
      </h1>
      <ul>
      <li>
        <Link to="/"><i className="fas fa-home" /> Home</Link>
      </li>
      <li>
        <Link to="/about">
        <i className="fas fa-info-circle" /> About
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-user-circle" /> SignIn
        </Link>
      </li>
    </ul>  
    </nav>
  )
}


export default Navbar