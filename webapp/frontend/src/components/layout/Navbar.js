import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../../actions/auth"
import PropTypes from "prop-types"

const Navbar = ({ auth: { user , loading }, logout }) => {

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link  to="/allDrug">
          <i className="fas fa-capsule"></i>{" "}
          <span className="hide-sm">Available Drugs</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
    )

    const authLinksAdmin = (
      <ul>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user"></i>{" "}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href="/">
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
      )
  

  const guestLinks = (
    <ul>
      {/* <li>
        <Link to="/about"><i className="fas fa-info-circle" /> About</Link>
      </li> */}
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus" /> Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-user-circle" /> SignIn
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={!user ? "/" : "/dashboard"}>
          <i className="fa fa-medkit" aria-hidden="true" /> MedScan
        </Link>
      </h1>
      { !loading && (
        <Fragment>{ !user ? guestLinks : user.role == "admin" ? authLinksAdmin : authLinks}</Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)

 