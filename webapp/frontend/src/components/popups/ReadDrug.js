import React ,{useState} from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link ,Redirect} from "react-router-dom";
import PropTypes from "prop-types";


const ReadDrug = () => {


  return (
    <section className="landing">
       <div className="dark-overlay">
         <div className="form-inner">
         <form className="form card-5" >
      <h3 className="large">Drug Info</h3>
      <p className="lead">
        <i className="fas fa-user-lock"></i> Enter Drug Id 
      </p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Drug Id"
            name="drugId"
            autoComplete="off"
            required
            // value={drugId}
            // onChange={(e) => onChange(e)}
          /> 
        </div>
        <input type="submit" className="btn btn-form" value="Submit" />
      </form>
         </div>
        </div>
    </section>
  )
}



export default ReadDrug