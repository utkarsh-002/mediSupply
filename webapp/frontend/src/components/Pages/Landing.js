import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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
    </section>
  )
}

export default Landing