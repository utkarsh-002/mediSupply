import React from "react";
import { Link ,Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Footer from "../layout/Footer"



const Landing = ({user}) => {
  if (user) {
    return <Redirect to="/dashboard" />
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large highlight">MedScan</h1>
          <p className="lead highlight1">Blockchain Based Solution to Medical Supply chain Management</p>
          <div className="buttons">
            <Link to="/login" className="btn btn-light">
              Login <i className="fa fa-arrow-right"/>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  )
}

Landing.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Landing);